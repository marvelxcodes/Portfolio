'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { person, social } from '@/data/site';
import SplitReveal from '@/components/motion/SplitText';
import Magnetic from '@/components/motion/Magnetic';
import MorphShape from '@/components/motion/MorphShape';
import Lottie from '@/components/motion/Lottie';
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

/**
 * juanmora.co's closer: a single peach plate carrying one oversized invitation,
 * the address set as large as the headline, and nothing else competing for the
 * click. The plate scales up slightly as it arrives so the colour arrives with
 * it rather than snapping in.
 */
const Contact = () => {
	const root = useRef<HTMLElement>(null);

	useIsomorphicLayoutEffect(() => {
		const el = root.current;
		if (!el || prefersReducedMotion()) return;
		registerGsap();

		const ctx = gsap.context(() => {
			gsap.fromTo(
				'[data-cta-plate]',
				{ scale: 0.93, yPercent: 4 },
				{
					scale: 1,
					yPercent: 0,
					ease: 'none',
					scrollTrigger: {
						trigger: el,
						start: 'top bottom',
						end: 'top 30%',
						scrub: 0.7
					}
				}
			);
		}, root);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={root}
			id='contact'
			className='relative z-10 bg-cream-100 px-[var(--site-margin)] pb-[var(--section-md)]'
		>
			<div
				data-cta-plate
				className='plate mx-auto flex min-h-[80svh] max-w-[var(--site-max)] flex-col justify-between bg-peach-300 p-[clamp(1.5rem,4vw,4rem)] text-stone-900'
			>
				<div className='flex items-start justify-between gap-6'>
					<p className='eyebrow'>
						<span className='eyebrow-word'>Start</span>
						<span className='eyebrow-word'>something</span>
					</p>
					<MorphShape
						sequence={['burst', 'chevron', 'star', 'burst']}
						spin
						className='h-10 w-10 text-stone-900/70 lg:h-16 lg:w-16'
					/>
				</div>

				<Lottie
					name='reticle'
					className='pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(30rem,80vw)] -translate-x-1/2 -translate-y-1/2 opacity-25'
				/>

				<h2 className='display relative my-[clamp(3rem,10vh,7rem)] max-w-[16ch] text-display leading-crush'>
					<SplitReveal mode='lines' stagger={0.1} cascade={18}>
						<span className='block'>Let&apos;s build</span>
						<span className='block'>something people</span>
						<span className='block'>remember.</span>
					</SplitReveal>
				</h2>

				<div className='flex flex-col gap-10'>
					<a
						href={`mailto:${person.email}`}
						className='link-underline display block break-all text-h3 leading-none'
					>
						{person.email}
					</a>

					<div className='flex flex-wrap items-end justify-between gap-x-10 gap-y-8 border-t border-stone-900/20 pt-8'>
						<div className='flex flex-wrap gap-3'>
							<Magnetic>
								<Link href='/contact' className='btn btn-cobalt'>
									Start a project
									<span aria-hidden>↗</span>
								</Link>
							</Magnetic>
							<Magnetic>
								<Link href='/blog' className='btn'>
									Read the journal
								</Link>
							</Magnetic>
						</div>

						<ul className='flex flex-wrap items-center gap-x-7 gap-y-3'>
							{social.map((item) => (
								<li key={item.label}>
									<a
										href={item.href}
										target='_blank'
										rel='noreferrer noopener'
										className='link-underline font-mono text-xs uppercase tracking-wider'
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
