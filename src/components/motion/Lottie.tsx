'use client';

import dynamic from 'next/dynamic';
import { useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

/**
 * `LottieLight` carries the smallest copy of the engine — SVG renderer, no
 * expression support — which is all these three animations need. Loaded
 * client-side only so the player never reaches the server render.
 */
const Player = dynamic(
	() => import('lottie-react').then((mod) => mod.LottieLight),
	{ ssr: false, loading: () => <span aria-hidden /> }
);

type LottieProps = {
	/** File under /public/lottie, without the extension. */
	name: 'pulse' | 'scroll-cue' | 'reticle';
	className?: string;
	loop?: boolean;
	autoplay?: boolean;
	speed?: number;
};

/**
 * The player fills whatever box it is given, so sizing lives on this wrapper
 * rather than on the player itself.
 */
const Lottie = ({ name, className, loop = true, autoplay = true, speed = 1 }: LottieProps) => {
	const reduced = useReducedMotion();

	return (
		<span className={cn('pointer-events-none block', className)} aria-hidden>
			<Player
				src={`/lottie/${name}.json`}
				loop={reduced ? false : loop}
				autoplay={reduced ? false : autoplay}
				speed={speed}
				className='h-full w-full'
			/>
		</span>
	);
};

export default Lottie;
