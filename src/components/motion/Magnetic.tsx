'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

type MagneticProps = {
	children: ReactNode;
	className?: string;
	/** How far the element chases the cursor, 0–1. */
	strength?: number;
};

/**
 * Cursor-following hover, driven by `motion` springs. Kept deliberately light —
 * it reads as weight, not as a gimmick.
 */
const Magnetic = ({ children, className, strength = 0.32 }: MagneticProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const reduced = useReducedMotion();

	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const sx = useSpring(x, { stiffness: 190, damping: 18, mass: 0.5 });
	const sy = useSpring(y, { stiffness: 190, damping: 18, mass: 0.5 });

	const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
		if (reduced) return;
		const rect = ref.current?.getBoundingClientRect();
		if (!rect) return;
		x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
		y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
	};

	const reset = () => {
		x.set(0);
		y.set(0);
	};

	return (
		<motion.div
			ref={ref}
			onMouseMove={onMove}
			onMouseLeave={reset}
			style={{ x: sx, y: sy }}
			className={cn('magnetic', className)}
		>
			{children}
		</motion.div>
	);
};

export default Magnetic;
