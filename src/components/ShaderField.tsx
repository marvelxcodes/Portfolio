'use client';

import { useEffect, useRef, useState } from 'react';
import { ShaderMount } from '@paper-design/shaders-react';
import { fieldFragment } from '@/shaders/field';
import { cn, clamp, lerp } from '@/lib/utils';
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

type RGB = [number, number, number];

export type FieldPalette = {
	ground: RGB;
	warm: RGB;
	cool: RGB;
	/** 'dark' adds the accents, 'light' pulls the ground toward them */
	mode: 'dark' | 'light';
};

/** peach hero: cream ground pulled toward peach and cobalt */
export const HERO_FIELD: FieldPalette = {
	ground: [1.0, 0.737, 0.584], // peach-300
	warm: [0.976, 0.62, 0.463], // peach-400
	cool: [0.18, 0.33, 1.0], // cobalt-500
	mode: 'light'
};

/** the inverted panel: gsap.com's near-black lit by peach */
export const PANEL_FIELD: FieldPalette = {
	ground: [0.055, 0.063, 0.059], // ink-800
	warm: [0.937, 0.4, 0.227], // peach-500
	cool: [0.18, 0.33, 1.0], // cobalt-500
	mode: 'dark'
};

type Props = {
	palette: FieldPalette;
	className?: string;
	/** element whose scroll pass drives the uniforms; defaults to the document */
	trigger?: React.RefObject<HTMLElement | null>;
	speed?: number;
	opacity?: number;
};

/**
 * A scoped WebGL layer that fills its positioned parent.
 *
 * The first build of this site kept one `position: fixed` canvas under the whole
 * document. That only works when the page has a transparent ground — this one
 * runs an opaque cream, so a fixed plate would be permanently invisible. Two
 * scoped instances cost less and are actually seen.
 */
const ShaderField = ({
	palette,
	className,
	trigger,
	speed = 0.5,
	opacity = 1
}: Props) => {
	const [ready, setReady] = useState(false);
	const scroll = useRef(0);
	const velocity = useRef(0);
	const [uniformState, setUniformState] = useState({ scroll: 0, velocity: 0 });

	// only mount WebGL after first paint, and never on a reduced-motion request
	useEffect(() => {
		if (prefersReducedMotion()) return;
		const id = window.requestAnimationFrame(() => setReady(true));
		return () => window.cancelAnimationFrame(id);
	}, []);

	useIsomorphicLayoutEffect(() => {
		if (!ready) return;
		registerGsap();

		const ctx = gsap.context(() => {
			const st = ScrollTrigger.create({
				trigger: trigger?.current ?? undefined,
				start: trigger?.current ? 'top bottom' : 0,
				end: trigger?.current ? 'bottom top' : 'max',
				onUpdate: (self) => {
					scroll.current = self.progress;
					velocity.current = clamp(self.getVelocity() / 2600, -1, 1);
				}
			});

			// uniforms are eased on the ticker so the plate lags the page slightly
			const tick = () => {
				setUniformState((prev) => {
					const nextScroll = lerp(prev.scroll, scroll.current, 0.08);
					const nextVelocity = lerp(prev.velocity, velocity.current, 0.06);
					if (
						Math.abs(nextScroll - prev.scroll) < 0.0004 &&
						Math.abs(nextVelocity - prev.velocity) < 0.0008
					) {
						return prev;
					}
					return { scroll: nextScroll, velocity: nextVelocity };
				});
				velocity.current *= 0.92;
			};

			gsap.ticker.add(tick);
			return () => {
				st.kill();
				gsap.ticker.remove(tick);
			};
		});

		return () => ctx.revert();
	}, [ready, trigger]);

	if (!ready) return null;

	return (
		<ShaderMount
			className={cn('absolute inset-0 h-full w-full', className)}
			style={{ opacity }}
			fragmentShader={fieldFragment}
			speed={speed}
			maxPixelCount={1920 * 1080}
			minPixelRatio={1}
			uniforms={{
				u_scroll: uniformState.scroll,
				u_velocity: uniformState.velocity,
				u_intensity: 1,
				u_mode: palette.mode === 'light' ? 1 : 0,
				u_ground: palette.ground,
				u_warm: palette.warm,
				u_cool: palette.cool
			}}
		/>
	);
};

export default ShaderField;
