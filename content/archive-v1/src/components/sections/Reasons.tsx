'use client';

import { useRef } from 'react';
import { reasons, panelHeadline } from '@/data/site';
import CharFill from '@/components/motion/CharFill';
import Reveal from '@/components/motion/Reveal';
import MorphShape from '@/components/motion/MorphShape';
import ShaderField, { PANEL_FIELD } from '@/components/ShaderField';
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

/**
 * juanmora.co's benefits scene: one plate holds at the top of the viewport
 * while the argument for hiring scrolls over it.
 *
 * The plate is a sticky `h-svh` block and the copy that follows is pulled back
 * over it with a negative margin of exactly one viewport — that cancels the
 * plate's contribution to flow height, so the section measures the copy alone
 * and the sticky range works out to `copy height − 100svh` with no magic
 * numbers.
 *
 * This is also the page's one full inversion. gsap.com's near-black is the
 * ground here, which is what makes the peach read as heat rather than trim.
 */
const Reasons = () => {
	const root = useRef<HTMLElement>(null);

	useIsomorphicLayoutEffect(() => {
		const el = root.current;
		if (!el || prefersReducedMotion()) return;
		registerGsap();

		const ctx = gsap.context(() => {
			/* the ghost headline lines drift apart at opposing rates */
			gsap.utils.toArray<HTMLElement>('[data-panel-line]').forEach((line, i) => {
				gsap.fromTo(
					line,
					{ xPercent: i % 2 ? 7 : -7 },
					{
						xPercent: i % 2 ? -7 : 7,
						ease: 'none',
						scrollTrigger: {
							trigger: el,
							start: 'top bottom',
							end: 'bottom top',
							scrub: 1
						}
					}
				);
			});
		}, root);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={root}
			id='reasons'
			data-scheme='ink'
			className='on-ink relative isolate z-10'
		>
			{/* --- the plate that holds --- */}
			<div className='pointer-events-none sticky top-0 z-0 h-svh overflow-hidden'>
				<ShaderField palette={PANEL_FIELD} trigger={root} speed={0.35} opacity={0.9} />

				<div
					aria-hidden
					className='absolute inset-0 flex flex-col justify-center gap-[0.02em] opacity-[0.07]'
				>
					{panelHeadline.map((line, i) => (
						<span
							key={line}
							data-panel-line
							className='display block whitespace-nowrap text-center text-display leading-crush text-cream-100'
							style={{ paddingInlineStart: `${i * 5}%` }}
						>
							{line}
						</span>
					))}
				</div>

				<MorphShape
					sequence={['ring', 'burst', 'star', 'drop', 'ring']}
					spin
					className='absolute right-[7vw] top-[16vh] h-24 w-24 text-peach-400/60 lg:h-40 lg:w-40'
				/>

				{/* a warm floor, so the plate is not a flat black rectangle */}
				<div
					className='absolute inset-x-0 bottom-0 h-1/2'
					style={{
						background:
							'radial-gradient(70% 100% at 50% 100%, rgba(217, 102, 58, 0.22), transparent 70%)'
					}}
				/>
			</div>

			{/* --- the copy that scrolls over it --- */}
			<div className='relative z-10 -mt-svh'>
				<div className='shell'>
					<div className='flex min-h-svh flex-col justify-center py-[var(--section-lg)]'>
						<p className='eyebrow text-cream-300'>
							<span className='eyebrow-word'>Why</span>
							<span className='eyebrow-word'>me</span>
						</p>
						<CharFill
							as='h2'
							className='display mt-8 max-w-[15ch] text-h2 text-cream-100'
							start='top 78%'
							end='bottom 55%'
						>
							Good software takes time. Working with me saves you some of it.
						</CharFill>
					</div>

					<ul className='pb-[var(--section-lg)]'>
						{reasons.map((reason) => (
							<li
								key={reason.index}
								className='flex min-h-[68svh] items-center border-t border-cream-100/15'
							>
								<Reveal
									className='grid w-full gap-x-[var(--site-gutter)] gap-y-5 py-12 lg:grid-cols-12'
									start='top 80%'
								>
									<span className='font-mono text-xs tabular-nums tracking-wider text-peach-300 lg:col-span-2'>
										{reason.index}
									</span>
									<h3 className='display text-h4 text-cream-100 lg:col-span-5'>
										{reason.lead}
									</h3>
									<p className='max-w-[44ch] text-base leading-relaxed text-cream-300/70 lg:col-span-5'>
										{reason.body}
									</p>
								</Reveal>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default Reasons;
