'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

type Props = {
	text: string;
	className?: string;
	as?: ElementType;
	/** run once when the element scrolls into view instead of on hover */
	onView?: boolean;
	chars?: string;
	duration?: number;
	children?: ReactNode;
};

/**
 * ScrambleText, the other plugin that went public in GSAP 3.13. Cheap, legible
 * and — unlike a character-by-character retype — it never changes the element's
 * measured width mid-run, so nothing around it reflows.
 */
const Scramble = ({
	text,
	className,
	as: Tag = 'span',
	onView = false,
	chars = 'upperCase',
	duration = 0.7
}: Props) => {
	const ref = useRef<HTMLElement>(null);

	useIsomorphicLayoutEffect(() => {
		const el = ref.current;
		if (!el || prefersReducedMotion()) return;
		registerGsap();

		const run = () =>
			gsap.to(el, {
				duration,
				ease: 'none',
				scrambleText: { text, chars, speed: 0.7, revealDelay: 0.12 }
			});

		const ctx = gsap.context(() => {
			if (onView) {
				gsap.to(el, {
					duration,
					ease: 'none',
					scrambleText: { text, chars, speed: 0.7, revealDelay: 0.12 },
					scrollTrigger: { trigger: el, start: 'top 88%', once: true }
				});
				return;
			}

			const host = el.closest('[data-scramble-host]') ?? el;
			host.addEventListener('mouseenter', run);
			return () => host.removeEventListener('mouseenter', run);
		}, ref);

		return () => ctx.revert();
	}, [text, chars, duration, onView]);

	return (
		<Tag ref={ref} className={cn(className)}>
			{text}
		</Tag>
	);
};

export default Scramble;
