'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { gsap, prefersReducedMotion, registerGsap } from '@/lib/gsap';
import { goldenSpiral } from '@/lib/fibonacci';
import { cn } from '@/lib/utils';

const ARC_STROKE_WIDTH = 0.07;

const FibonacciSpiral = ({
	turns,
	className
}: {
	turns: number;
	className?: string;
}) => {
	const { squares, path, viewBox } = goldenSpiral(turns);
	const root = useRef<SVGSVGElement>(null);

	useIsomorphicLayoutEffect(() => {
		const element = root.current;
		if (!element || prefersReducedMotion()) return;
		registerGsap();

		const context = gsap.context(() => {
			const scrollTrigger = {
				trigger: element,
				start: 'top 80%',
				end: 'bottom bottom',
				scrub: 0.6
			};
			gsap.fromTo(
				'[data-arc]',
				{ strokeDashoffset: 1 },
				{ strokeDashoffset: 0, ease: 'none', scrollTrigger }
			);
			gsap.fromTo(
				'[data-square]',
				{ opacity: 0 },
				{ opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger }
			);
		}, element);

		return () => context.revert();
	}, []);

	return (
		<svg
			ref={root}
			viewBox={viewBox}
			preserveAspectRatio='xMidYMid slice'
			fill='none'
			aria-hidden
			className={cn('pointer-events-none', className)}
		>
			<g stroke='var(--c-plate)'>
				{squares.map(({ x, y, size }) => (
					<rect
						key={`${x},${y}`}
						data-square
						x={x}
						y={y}
						width={size}
						height={size}
						vectorEffect='non-scaling-stroke'
					/>
				))}
			</g>
			<path
				data-arc
				d={path}
				pathLength={1}
				strokeDasharray={1}
				stroke='var(--c-dim)'
				strokeWidth={ARC_STROKE_WIDTH}
			/>
		</svg>
	);
};

export default FibonacciSpiral;
