'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

type CounterProps = {
	value: number;
	suffix?: string;
	className?: string;
	duration?: number;
};

/** Odometer for the statistics rail. */
const Counter = ({ value, suffix = '', className, duration = 1.9 }: CounterProps) => {
	const ref = useRef<HTMLSpanElement>(null);

	useIsomorphicLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		registerGsap();

		if (prefersReducedMotion()) {
			el.textContent = `${value}${suffix}`;
			return;
		}

		const ctx = gsap.context(() => {
			const state = { n: 0 };
			gsap.to(state, {
				n: value,
				duration,
				ease: 'expoOut',
				onUpdate: () => {
					el.textContent = `${Math.round(state.n)}${suffix}`;
				},
				scrollTrigger: { trigger: el, start: 'top 90%', once: true }
			});
		}, ref);

		return () => ctx.revert();
	}, [value, suffix, duration]);

	return (
		<span ref={ref} className={cn('tabular-nums', className)}>
			0{suffix}
		</span>
	);
};

export default Counter;
