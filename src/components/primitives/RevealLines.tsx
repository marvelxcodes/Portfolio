'use client';

import { useRef, type ElementType } from 'react';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger } from '@/lib/gsap';
import { onSiteReady } from '@/lib/ready';
import { cn } from '@/lib/utils';

type RevealLinesProps = {
	lines: readonly string[];
	as?: ElementType;
	className?: string;
	lineClassNames?: readonly string[];
	trigger?: 'load' | 'view' | 'scrub';
	delay?: number;
};

const RevealLines = ({
	lines,
	as: Tag = 'h2',
	className,
	lineClassNames,
	trigger = 'view',
	delay = 0
}: RevealLinesProps) => {
	const root = useRef<HTMLElement>(null);

	useIsomorphicLayoutEffect(() => {
		const element = root.current;
		if (!element || prefersReducedMotion()) return;
		registerGsap();

		const context = gsap.context((self) => {
			const tween = gsap.fromTo(
				element.querySelectorAll('[data-line]'),
				{ yPercent: 110 },
				trigger === 'scrub'
					? { yPercent: 0, ease: 'none', stagger: 0.15, paused: true }
					: { yPercent: 0, duration: 1.4, stagger: 0.09, delay, ease: 'expoOut', paused: true }
			);

			return onSiteReady(() =>
				self.add(() => {
					if (trigger === 'load') {
						tween.play();
						return;
					}
					ScrollTrigger.create(
						trigger === 'scrub'
							? { trigger: element, start: 'top bottom', end: 'bottom 70%', scrub: true, animation: tween }
							: { trigger: element, start: 'top 88%', once: true, onEnter: () => tween.play() }
					);
				})
			);
		}, element);

		return () => context.revert();
	}, [trigger, delay]);

	return (
		<Tag ref={root} className={className}>
			{lines.map((line, index) => (
				<span key={line} className={cn('line-mask', lineClassNames?.[index])}>
					<span data-line className='block will-change-transform'>
						{line}
					</span>
				</span>
			))}
		</Tag>
	);
};

export default RevealLines;
