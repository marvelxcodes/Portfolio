'use client';

import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

type MarqueeProps = {
	children: ReactNode;
	className?: string;
	/** Seconds for one full pass. */
	speed?: number;
	direction?: 1 | -1;
	/** Let scroll velocity push the belt, the way Monolog's rails behave. */
	reactive?: boolean;
};

/**
 * Infinite belt. The track is duplicated once and wrapped at -50%, so the seam
 * never lands inside the viewport regardless of content width.
 */
const Marquee = ({
	children,
	className,
	speed = 34,
	direction = -1,
	reactive = true
}: MarqueeProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useIsomorphicLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		registerGsap();
		if (prefersReducedMotion()) return;

		const ctx = gsap.context(() => {
			const track = el.querySelector<HTMLElement>('.marquee-track');
			if (!track) return;

			const tween = gsap.to(track, {
				xPercent: direction * 50,
				duration: speed,
				ease: 'none',
				repeat: -1,
				modifiers: {
					xPercent: (value) => {
						const v = parseFloat(value) % 50;
						return `${direction < 0 ? v : v - 50}`;
					}
				}
			});

			if (!reactive) return;

			// scroll velocity nudges the belt's rate, then it eases back to base
			const trigger = ScrollTrigger.create({
				trigger: el,
				start: 'top bottom',
				end: 'bottom top',
				onUpdate: (self) => {
					const boost = gsap.utils.clamp(-4, 4, self.getVelocity() / 320);
					gsap.to(tween, {
						timeScale: 1 + Math.abs(boost) * 0.6,
						duration: 0.4,
						overwrite: true,
						onComplete: () => gsap.to(tween, { timeScale: 1, duration: 1.2 })
					});
				}
			});

			return () => {
				trigger.kill();
				tween.kill();
			};
		}, ref);

		return () => ctx.revert();
	}, [speed, direction, reactive]);

	return (
		<div ref={ref} className={cn('overflow-hidden', className)}>
			<div className='marquee marquee-track'>
				<div className='flex shrink-0'>{children}</div>
				<div className='flex shrink-0' aria-hidden>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Marquee;
