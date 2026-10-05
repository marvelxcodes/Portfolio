'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

let registered = false;

/**
 * Registers plugins once and installs the easing vocabulary lifted from the
 * reference sites so timelines can name them as strings.
 *
 * MorphSVG / DrawSVG / ScrambleText used to be members-only; they ship in the
 * public package as of 3.13, which is what makes the SVG morphing on this site
 * possible without a licence check.
 */
export const registerGsap = () => {
	if (registered || typeof window === 'undefined')
		return { gsap, ScrollTrigger, SplitText, MorphSVGPlugin };

	gsap.registerPlugin(
		ScrollTrigger,
		SplitText,
		CustomEase,
		MorphSVGPlugin,
		DrawSVGPlugin,
		ScrambleTextPlugin
	);

	CustomEase.create('primary', '0.83, 0, 0.17, 1');
	CustomEase.create('secondary', '0.31, 0.75, 0.22, 1');
	CustomEase.create('expoOut', '0.16, 1, 0.3, 1');
	CustomEase.create('expoInOut', '0.87, 0, 0.13, 1');
	CustomEase.create('swift', '0.51, 0, 0.08, 1');

	gsap.defaults({ ease: 'expoOut', duration: 1 });
	ScrollTrigger.config({ ignoreMobileResize: true });

	registered = true;
	return { gsap, ScrollTrigger, SplitText, MorphSVGPlugin };
};

export const prefersReducedMotion = () =>
	typeof window !== 'undefined' &&
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger, SplitText, MorphSVGPlugin };
