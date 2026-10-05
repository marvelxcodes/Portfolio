'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

type ParallaxProps = {
	children: ReactNode;
	as?: ElementType;
	className?: string;
	/** Travel in px across the element's full scroll pass. Negative = faster. */
	distance?: number;
	/** Horizontal drift, for the sideways rails. */
	x?: number;
	scale?: number;
	rotate?: number;
	scrub?: number | boolean;
};

/**
 * The depth primitive. tresmarescapital.com composes its scenes by giving each
 * stacked layer a different translate rate against the same scroll range —
 * image 0, copy ~180px, meta ~270px — so a pinned card reads as a diorama.
 */
const Parallax = ({
	children,
	as: Tag = 'div',
	className,
	distance = -120,
	x = 0,
	scale,
	rotate,
	scrub = 0.8
}: ParallaxProps) => {
	const ref = useRef<HTMLElement>(null);

	useIsomorphicLayoutEffect(() => {
		const el = ref.current;
		if (!el || prefersReducedMotion()) return;

		registerGsap();

		const ctx = gsap.context(() => {
			gsap.fromTo(
				el,
				{ y: -distance / 2, x: -x / 2, scale: scale ? 1 : undefined, rotate: rotate ? 0 : undefined },
				{
					y: distance / 2,
					x: x / 2,
					scale,
					rotate,
					ease: 'none',
					scrollTrigger: {
						trigger: el,
						start: 'top bottom',
						end: 'bottom top',
						scrub
					}
				}
			);
		}, ref);

		return () => ctx.revert();
	}, [distance, x, scale, rotate, scrub]);

	return (
		<Tag ref={ref} className={cn('depth', className)}>
			{children}
		</Tag>
	);
};

export default Parallax;
