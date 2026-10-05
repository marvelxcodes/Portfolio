'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

type RevealProps = {
	children: ReactNode;
	as?: ElementType;
	className?: string;
	delay?: number;
	y?: number;
	/** Stagger direct children instead of moving the block as one piece. */
	stagger?: number;
	start?: string;
};

/** The generic entrance: a short rise with an expo-out landing. */
const Reveal = ({
	children,
	as: Tag = 'div',
	className,
	delay = 0,
	y = 34,
	stagger,
	start = 'top 86%'
}: RevealProps) => {
	const ref = useRef<HTMLElement>(null);

	useIsomorphicLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		registerGsap();

		if (prefersReducedMotion()) {
			gsap.set(el, { opacity: 1, y: 0 });
			return;
		}

		const ctx = gsap.context(() => {
			const targets = stagger ? Array.from(el.children) : el;
			gsap.set(el, { opacity: 1 });
			gsap.fromTo(
				targets,
				{ opacity: 0, y },
				{
					opacity: 1,
					y: 0,
					duration: 1.05,
					ease: 'expoOut',
					delay,
					stagger: stagger ?? 0,
					scrollTrigger: { trigger: el, start, once: true }
				}
			);
		}, ref);

		return () => ctx.revert();
	}, [delay, y, stagger, start]);

	return (
		<Tag ref={ref} data-anim='rise' className={className}>
			{children}
		</Tag>
	);
};

export default Reveal;
