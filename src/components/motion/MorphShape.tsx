'use client';

import { useId, useRef } from 'react';
import { cn } from '@/lib/utils';
import { SHAPES, type ShapeName } from '@/components/ui/shapes';
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

type Props = {
	/** the sequence to walk through; the first entry is the resting state */
	sequence: ShapeName[];
	className?: string;
	/** scrub the morph against the page instead of looping on a timer */
	scrub?: boolean;
	/** element the scroll trigger measures; defaults to the shape itself */
	trigger?: string;
	spin?: boolean;
};

/**
 * A genuine path-to-path morph, not a crossfade.
 *
 * MorphSVG shipped as a members-only plugin for a decade and became public in
 * GSAP 3.13 — it re-maps anchor points between two `d` strings so shapes with
 * different node counts still interpolate cleanly. That is the whole reason the
 * marks in `shapes.tsx` are single filled paths on one shared 100×100 box.
 */
const MorphShape = ({
	sequence,
	className,
	scrub = false,
	trigger,
	spin = false
}: Props) => {
	const root = useRef<SVGSVGElement>(null);
	const uid = useId().replace(/:/g, '');

	useIsomorphicLayoutEffect(() => {
		const svg = root.current;
		if (!svg || sequence.length < 2 || prefersReducedMotion()) return;
		registerGsap();

		const ctx = gsap.context(() => {
			const path = svg.querySelector('path');
			if (!path) return;

			const rest = sequence.slice(1);

			if (scrub) {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: trigger ?? svg,
						start: 'top bottom',
						end: 'bottom top',
						scrub: 0.8
					}
				});

				rest.forEach((name) => {
					tl.to(path, {
						morphSVG: SHAPES[name],
						duration: 1,
						ease: 'none'
					});
				});

				if (spin) {
					tl.to(svg, { rotate: 180, duration: rest.length, ease: 'none' }, 0);
				}
				return;
			}

			const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });

			[...rest, sequence[0]].forEach((name) => {
				tl.to(path, {
					morphSVG: SHAPES[name],
					duration: 0.9,
					ease: 'primary'
				}).to({}, { duration: 1.5 });
			});

			if (spin) {
				gsap.to(svg, { rotate: 360, duration: 22, ease: 'none', repeat: -1 });
			}
		}, root);

		return () => ctx.revert();
	}, [sequence, scrub, trigger, spin]);

	return (
		<svg
			ref={root}
			viewBox='0 0 100 100'
			className={cn('overflow-visible', className)}
			aria-hidden
			focusable='false'
		>
			<path id={`morph-${uid}`} d={SHAPES[sequence[0]]} fill='currentColor' />
		</svg>
	);
};

export default MorphShape;
