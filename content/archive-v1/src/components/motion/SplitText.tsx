'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import { gsap, SplitText as GsapSplitText, registerGsap, prefersReducedMotion } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

type Mode = 'lines' | 'words' | 'chars';

type SplitProps = {
	children: ReactNode;
	as?: ElementType;
	className?: string;
	/** What SplitText should carve the copy into. */
	mode?: Mode;
	/** Seconds between each piece. */
	stagger?: number;
	/** Delay before the timeline starts. */
	delay?: number;
	/** Vertical travel as a fraction of the piece's own height. */
	distance?: number;
	/** Monolog indents successive hero lines; this is that offset in px. */
	cascade?: number;
	/** Play on mount instead of waiting for the element to enter the viewport. */
	immediate?: boolean;
	ease?: string;
	duration?: number;
};

/**
 * Mask-up reveal. Each piece rides inside an overflow-hidden wrapper and
 * translates from 110% of its own height, which is how both bymonolog.com and
 * tresmarescapital.com introduce their headlines.
 *
 * The animation is built inside `onSplit` and returned, because `autoSplit`
 * re-splits when a webfont finishes loading or the box resizes — anything built
 * outside that callback ends up pointing at DOM nodes that no longer exist.
 */
const SplitReveal = ({
	children,
	as: Tag = 'div',
	className,
	mode = 'lines',
	stagger = 0.08,
	delay = 0,
	distance = 1.1,
	cascade = 0,
	immediate = false,
	ease = 'expoOut',
	duration = 1.15
}: SplitProps) => {
	const ref = useRef<HTMLElement>(null);

	useIsomorphicLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		registerGsap();

		if (prefersReducedMotion()) {
			gsap.set(el, { opacity: 1, clearProps: 'transform' });
			return;
		}

		const ctx = gsap.context(() => {
			const split = GsapSplitText.create(el, {
				type:
					mode === 'chars' ? 'chars,words,lines' : mode === 'words' ? 'words,lines' : 'lines',
				linesClass: 'split-line',
				wordsClass: 'split-word',
				charsClass: 'char',
				mask: mode === 'chars' ? undefined : mode,
				autoSplit: true,
				onSplit: (self) => {
					const targets =
						mode === 'chars' ? self.chars : mode === 'words' ? self.words : self.lines;

					gsap.set(el, { opacity: 1 });
					if (!targets?.length) return undefined;

					// Monolog staircases its hero by indenting each successive line.
					// Recomputed per split — `autoSplit` re-runs this on resize — so a
					// narrow viewport gets no indent instead of overflowing.
					const step = window.innerWidth < 768 ? 0 : cascade;
					if (cascade) {
						targets.forEach((piece, i) => gsap.set(piece, { x: i * step }));
					}

					return gsap.fromTo(
						targets,
						{ yPercent: distance * 100, opacity: mode === 'chars' ? 0 : 1 },
						{
							yPercent: 0,
							opacity: 1,
							duration,
							ease,
							delay,
							stagger,
							scrollTrigger: immediate
								? undefined
								: { trigger: el, start: 'top 88%', once: true }
						}
					);
				}
			});

			return () => split.revert();
		}, ref);

		return () => ctx.revert();
	}, [mode, stagger, delay, distance, cascade, immediate, ease, duration]);

	return (
		<Tag ref={ref} data-anim='fade' className={className}>
			{children}
		</Tag>
	);
};

export default SplitReveal;
