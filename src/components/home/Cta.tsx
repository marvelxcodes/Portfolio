'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { cta } from '@/data/portfolio';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { gsap, prefersReducedMotion, registerGsap } from '@/lib/gsap';
import ArrowIcon from '@/components/primitives/ArrowIcon';
import { cn } from '@/lib/utils';

const wordClass = 'px-[0.06em] text-mega font-medium uppercase leading-[1] tracking-[-0.06em]';

const Cta = () => {
	const root = useRef<HTMLElement>(null);
	const [topRow = [], bottomRow = []] = cta.rows;

	useIsomorphicLayoutEffect(() => {
		const element = root.current;
		if (!element || prefersReducedMotion()) return;
		registerGsap();

		const context = gsap.context(() => {
			gsap.utils.toArray<HTMLElement>('[data-drift]').forEach((row) => {
				const distance = Number(row.dataset.drift);
				gsap.fromTo(
					row,
					{ xPercent: distance },
					{ xPercent: 0, ease: 'none', scrollTrigger: { trigger: element, start: 'top bottom', end: 'center center', scrub: true } }
				);
			});
		}, element);
		return () => context.revert();
	}, []);

	return (
		<section
			ref={root}
			aria-label='Get in touch'
			className='relative z-10 flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center gap-0 overflow-hidden border-t py-24'
		>
			<div data-drift='-18' className='flex justify-between gap-4 pr-[12%]'>
				{topRow.map((word) => (
					<span key={word} className={cn(wordClass, 'bg-ink text-paper')}>
						{word}
					</span>
				))}
			</div>
			<div data-drift='18' className='flex pl-[8%] lg:pl-[21%]'>
				{bottomRow.map((word) => (
					<span key={word} className={cn(wordClass, 'bg-paper text-ink')}>
						{word}
					</span>
				))}
				<Link
					href={cta.href}
					aria-label='Start a project'
					className='fill flex aspect-square items-center justify-center bg-plate text-ink [--fill:var(--c-ink)] hover:text-paper'
				>
					<ArrowIcon className='size-[0.55em] text-mega' />
				</Link>
			</div>
		</section>
	);
};

export default Cta;
