'use client';

import { useEffect, useRef } from 'react';
import Mark from '@/components/primitives/Mark';
import { cn } from '@/lib/utils';

const POOL_SIZE = 24;
const SPAWN_DISTANCE_PX = 64;
const LIFETIME_MS = 1100;
const MIN_SIZE_PX = 18;
const MAX_SIZE_PX = 38;

const CursorTrail = () => {
	const pool = useRef<(HTMLSpanElement | null)[]>([]);

	useEffect(() => {
		const canTrail =
			window.matchMedia('(pointer: fine)').matches &&
			!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!canTrail) return;

		let next = 0;
		let last: { x: number; y: number } | null = null;

		const spawn = (x: number, y: number) => {
			const node = pool.current[next];
			next = (next + 1) % POOL_SIZE;
			if (!node) return;
			const size = MIN_SIZE_PX + Math.random() * (MAX_SIZE_PX - MIN_SIZE_PX);
			const turn = (Math.random() - 0.5) * 120;
			const place = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
			node.style.width = node.style.height = `${size}px`;
			node.animate(
				[
					{ transform: `${place} rotate(${turn}deg) scale(1)`, opacity: 1 },
					{ transform: `${place} rotate(${turn + 60}deg) scale(0)`, opacity: 0.4 }
				],
				{ duration: LIFETIME_MS, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }
			);
		};

		const onPointerMove = (event: PointerEvent) => {
			if (event.pointerType !== 'mouse') return;
			const point = { x: event.clientX, y: event.clientY };
			if (last && Math.hypot(point.x - last.x, point.y - last.y) < SPAWN_DISTANCE_PX) return;
			last = point;
			spawn(point.x, point.y);
		};

		window.addEventListener('pointermove', onPointerMove, { passive: true });
		return () => window.removeEventListener('pointermove', onPointerMove);
	}, []);

	return (
		<div aria-hidden className='pointer-events-none fixed inset-0 z-60 overflow-hidden'>
			{Array.from({ length: POOL_SIZE }, (_, index) => (
				<span
					key={index}
					ref={(node) => {
						pool.current[index] = node;
					}}
					className={cn(
						'absolute left-0 top-0 flex items-center justify-center rounded-full opacity-0',
						index % 3 === 0 ? 'border border-ink bg-paper text-ink' : 'bg-ink text-paper'
					)}
				>
					<Mark className='w-1/2' />
				</span>
			))}
		</div>
	);
};

export default CursorTrail;
