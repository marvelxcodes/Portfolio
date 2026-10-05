import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge only knows Tailwind's stock scales. This project defines its
 * own fluid type ramp (`text-display`, `text-h2`, …) in `@theme`, and without
 * teaching the merger about it every one of those classes is read as a *colour*
 * — so `cn('text-h4', 'text-stone-900')` silently dropped the size.
 *
 * Same story for the leading and tracking tokens.
 */
const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			'font-size': [
				{
					text: [
						'micro',
						'xs',
						'sm',
						'base',
						'lg',
						'xl',
						'h6',
						'h5',
						'h4',
						'h3',
						'h2',
						'h1',
						'display',
						'mega'
					]
				}
			],
			leading: [
				{ leading: ['crush', 'flat', 'tight', 'snug', 'normal', 'relaxed'] }
			],
			tracking: [
				{ tracking: ['tightest', 'tighter', 'tight', 'wide', 'wider'] }
			]
		}
	}
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/** Zero-padded chapter index: 3 → "03" */
export const pad = (n: number, len = 2) => String(n).padStart(len, '0');

/** Monolog spaces its indices: "03" → "0 3" */
export const spaced = (s: string) => s.split('').join(' ');

export const clamp = (v: number, min: number, max: number) =>
	Math.min(Math.max(v, min), max);

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
