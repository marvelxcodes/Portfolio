'use client';

import { useRef } from 'react';
import { processSteps } from '@/data/site';
import Chapter from '@/components/ui/Chapter';
import SplitReveal from '@/components/motion/SplitText';
import MorphShape from '@/components/motion/MorphShape';
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

/**
 * How the work actually happens. The heading pins on the left while the steps
 * scroll past it — the quiet counterpart to the pinned panel above, on the
 * light register so the two never read as the same device.
 */
const Process = () => {
	const root = useRef<HTMLElement>(null);

	useIsomorphicLayoutEffect(() => {
		const el = root.current;
		if (!el || prefersReducedMotion()) return;
		registerGsap();

		const ctx = gsap.context(() => {
			gsap.utils.toArray<HTMLElement>('[data-step]').forEach((step, i) => {
				gsap.fromTo(
					step,
					{ y: 70, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 1.1,
						ease: 'expoOut',
						delay: i * 0.04,
						scrollTrigger: { trigger: step, start: 'top 88%', once: true }
					}
				);
			});
		}, root);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={root}
			id='process'
			className='relative z-10 bg-cream-100 py-[var(--section-lg)] text-stone-900'
		>
			<div className='shell'>
				<Chapter index='05' total='07' title='Process' />

				<div className='mt-14 grid gap-14 lg:grid-cols-12 lg:gap-[var(--site-gutter)]'>
					<div className='lg:col-span-5'>
						<div className='lg:sticky lg:top-[calc(var(--nav-h)+4rem)]'>
							<h2 className='display text-h2 text-stone-900'>
								<SplitReveal mode='lines' stagger={0.1}>
									<span className='block'>Four steps,</span>
									<span className='block'>
										no <span className='text-peach-500'>theatre</span>.
									</span>
								</SplitReveal>
							</h2>
							<p className='mt-8 max-w-[38ch] text-base leading-relaxed text-stone-500'>
								Every project runs the same shape. It is not complicated — it is
								just the order that keeps a build from unravelling somewhere
								around week three.
							</p>

							<MorphShape
								sequence={['chevron', 'pill', 'slab', 'chevron']}
								className='mt-10 hidden h-12 w-12 text-cobalt-500 lg:block'
							/>
						</div>
					</div>

					<ol className='flex flex-col gap-4 lg:col-span-7'>
						{processSteps.map((step) => (
							<li
								key={step.index}
								data-step
								className='card group p-8 transition-colors duration-500 hover:bg-cream-50'
							>
								<div className='flex items-start gap-6'>
									<span className='display shrink-0 text-h4 leading-none text-cream-500 transition-colors duration-500 group-hover:text-peach-400'>
										{step.index}
									</span>
									<div>
										<h3 className='text-h6 leading-tight text-stone-900'>
											{step.title}
										</h3>
										<p className='mt-3 max-w-[54ch] text-sm leading-relaxed text-stone-500'>
											{step.body}
										</p>
									</div>
								</div>
							</li>
						))}
					</ol>
				</div>
			</div>
		</section>
	);
};

export default Process;
