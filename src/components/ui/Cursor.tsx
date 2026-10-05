'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { gsap, registerGsap } from '@/lib/gsap';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * A trailing ring that swells over interactive targets. `mix-blend-difference`
 * keeps one colour legible across the peach hero, the cream body and the
 * inverted panel; it is suppressed on touch and on a reduced-motion request,
 * where a lagging dot would be noise.
 */
const Cursor = () => {
	const dot = useRef<HTMLDivElement>(null);
	const ring = useRef<HTMLDivElement>(null);
	const [hot, setHot] = useState(false);
	const [seen, setSeen] = useState(false);

	const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
	const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
	const enabled = finePointer && !reduced;

	useEffect(() => {
		if (!enabled) return;
		registerGsap();

		const setDotX = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' });
		const setDotY = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' });
		const setRingX = gsap.quickTo(ring.current, 'x', { duration: 0.55, ease: 'power3' });
		const setRingY = gsap.quickTo(ring.current, 'y', { duration: 0.55, ease: 'power3' });

		const move = (event: PointerEvent) => {
			setSeen(true);
			setDotX(event.clientX);
			setDotY(event.clientY);
			setRingX(event.clientX);
			setRingY(event.clientY);

			const target = event.target as HTMLElement | null;
			setHot(Boolean(target?.closest?.('a, button, [data-cursor="hot"]')));
		};

		window.addEventListener('pointermove', move, { passive: true });
		return () => window.removeEventListener('pointermove', move);
	}, [enabled]);

	if (!enabled) return null;

	return (
		<div
			className={cn(
				'pointer-events-none fixed inset-0 z-[90] hidden mix-blend-difference transition-opacity duration-300 md:block',
				seen ? 'opacity-100' : 'opacity-0'
			)}
			aria-hidden
		>
			<div
				ref={ring}
				className={cn(
					'absolute -left-5 -top-5 h-10 w-10 rounded-full border border-cream-50/60 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
					hot && 'scale-[1.9] border-cobalt-500/80'
				)}
			/>
			<div
				ref={dot}
				className={cn(
					'absolute -left-1 -top-1 h-2 w-2 rounded-full bg-cobalt-500 transition-opacity duration-200',
					hot && 'opacity-0'
				)}
			/>
		</div>
	);
};

export default Cursor;
