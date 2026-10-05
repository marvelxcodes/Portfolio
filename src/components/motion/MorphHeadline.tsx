'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Shape, type ShapeName } from '@/components/ui/shapes';
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

export type MorphRow = {
	/** the glyphs that make up this row */
	text: string;
	/** a second face of identical length; cells flip between the two on a loop */
	alt?: string;
	/** flair marks keyed by glyph index */
	flair?: Record<number, { name: ShapeName; className: string }>;
	/** a readout that slides horizontally through the cell at `at` */
	counter?: { at: number; value: string; className?: string };
};

type Props = {
	rows: MorphRow[];
	className?: string;
	/** accessible text, since the visible glyphs are per-letter and aria-hidden */
	label: string;
	delay?: number;
};

/**
 * The gsap.com hero, reconstructed.
 *
 * Every glyph gets its own overflow-clipped cell so it can roll out of its own
 * box. Cells with a second face carry that face pinned to the same bottom edge
 * and flip about it — perspective sits on the clip because `overflow: hidden`
 * flattens 3D, so a grandparent's perspective would never reach the faces.
 * Flair marks sit behind at `z-index: -1` and are revealed once the glyphs land.
 */
const MorphHeadline = ({ rows, className, label, delay = 0.25 }: Props) => {
	const root = useRef<HTMLDivElement>(null);

	useIsomorphicLayoutEffect(() => {
		const el = root.current;
		if (!el) return;
		registerGsap();

		if (prefersReducedMotion()) {
			gsap.set(el, { opacity: 1 });
			return;
		}

		let ctx: gsap.Context | undefined;
		let cancelled = false;

		/* Glyph widths are measured, so the display face has to have loaded first
		   — otherwise every cell is sized from the fallback and the flip re-flows
		   to numbers that were never true. */
		void document.fonts.ready.then(() => {
			if (cancelled) return;

			ctx = gsap.context(() => {
				const faces = gsap.utils.toArray<HTMLElement>('[data-face="out"]');
				const backs = gsap.utils.toArray<HTMLElement>('[data-face="in"]');
				const flair = gsap.utils.toArray<HTMLElement>('.flair');
				const counters = gsap.utils.toArray<HTMLElement>(
					'.morph-counter > span'
				);

				/* Measure both glyphs before anything is transformed: a face already
			   rotated on X projects a wider box under perspective, so widths taken
			   after the initial `set` are meaningless. */
				const pairs = gsap.utils
					.toArray<HTMLElement>('.morph-cell')
					.map((cell) => {
						const clip = cell.querySelector<HTMLElement>('.morph-clip');
						const front = cell.querySelector<HTMLElement>('[data-face="out"]');
						const back = cell.querySelector<HTMLElement>('[data-face="in"]');
						if (!clip || !front || !back) return null;
						return {
							clip,
							front: front.getBoundingClientRect().width,
							back: back.getBoundingClientRect().width
						};
					})
					.filter((pair): pair is NonNullable<typeof pair> => pair !== null);

				pairs.forEach(({ clip, front }) => gsap.set(clip, { width: front }));

				gsap.set(el, { opacity: 1 });
				gsap.set(backs, {
					rotationX: -90,
					transformOrigin: '50% 100%',
					autoAlpha: 1
				});
				gsap.set(faces, { transformOrigin: '50% 100%' });
				gsap.set(flair, { scale: 0, rotate: -40, autoAlpha: 0 });

				/* entrance: every glyph rolls up out of its clip */
				const intro = gsap.timeline({ delay });

				intro
					.from(faces, {
						yPercent: 115,
						duration: 1.1,
						ease: 'expoOut',
						stagger: { each: 0.035, from: 'start' }
					})
					.to(
						flair,
						{
							scale: 1,
							rotate: 0,
							autoAlpha: 1,
							duration: 1.2,
							ease: 'secondary',
							stagger: 0.09
						},
						'-=0.75'
					);

				/* the counter slides through its widened cell and parks */
				counters.forEach((c) => {
					intro.from(
						c,
						{ xPercent: -108, duration: 1.4, ease: 'expoOut' },
						'-=1.05'
					);
				});

				/* the flip loop — front falls forward, back rises into its place */
				if (backs.length) {
					const loop = gsap.timeline({
						repeat: -1,
						repeatDelay: 2.6,
						delay: delay + 2.8
					});

					const flippers = faces.filter((f) => f.dataset.flip === 'yes');

					loop
						.to(flippers, {
							rotationX: 90,
							duration: 0.55,
							ease: 'primary',
							stagger: 0.06
						})
						.to(
							backs,
							{ rotationX: 0, duration: 0.55, ease: 'primary', stagger: 0.06 },
							'<'
						)
						/* the row re-flows to the incoming word as it lands */
						.to(
							pairs.map((p) => p.clip),
							{
								width: (i: number) => pairs[i].back,
								duration: 0.62,
								ease: 'primary',
								stagger: 0.06
							},
							'<'
						)
						.to({}, { duration: 2.4 })
						.to(backs, {
							rotationX: -90,
							duration: 0.55,
							ease: 'primary',
							stagger: 0.06
						})
						.to(
							flippers,
							{
								rotationX: 0,
								duration: 0.55,
								ease: 'primary',
								stagger: 0.06
							},
							'<'
						)
						.to(
							pairs.map((p) => p.clip),
							{
								width: (i: number) => pairs[i].front,
								duration: 0.62,
								ease: 'primary',
								stagger: 0.06
							},
							'<'
						);
				}
			}, root);
		});

		return () => {
			cancelled = true;
			ctx?.revert();
		};
	}, [delay]);

	return (
		<div
			ref={root}
			data-anim='fade'
			className={cn('morph', className)}
		>
			<span className='sr-only'>{label}</span>

			{rows.map((row, r) => (
				<span
					className='morph-row'
					key={r}
					aria-hidden
				>
					{row.text.split('').map((glyph, i) => {
						const back = row.alt?.[i];
						const mark = row.flair?.[i];
						const counter = row.counter?.at === i ? row.counter : undefined;

						return (
							<span
								className='morph-cell'
								key={`${r}-${i}`}
							>
								{mark && (
									<span className={cn('flair', mark.className)}>
										<Shape name={mark.name} />
									</span>
								)}

								<span className='morph-clip'>
									<span
										className='morph-face'
										data-face='out'
										data-flip={back ? 'yes' : 'no'}
									>
										{glyph === ' ' ? ' ' : glyph}
									</span>

									{back && (
										<span
											className='morph-face-in'
											data-face='in'
										>
											{back === ' ' ? ' ' : back}
										</span>
									)}
								</span>

								{counter && (
									<span className='morph-counter'>
										<span className={counter.className}>{counter.value}</span>
									</span>
								)}
							</span>
						);
					})}
				</span>
			))}
		</div>
	);
};

export default MorphHeadline;
