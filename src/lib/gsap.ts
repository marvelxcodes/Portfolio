'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';

let registered = false;

export const registerGsap = () => {
	if (registered || typeof window === 'undefined') return { gsap, ScrollTrigger, SplitText };

	gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

	CustomEase.create('primary', '0.83, 0, 0.17, 1');
	CustomEase.create('secondary', '0.31, 0.75, 0.22, 1');
	CustomEase.create('expoOut', '0.16, 1, 0.3, 1');
	CustomEase.create('expoInOut', '0.87, 0, 0.13, 1');
	CustomEase.create('swift', '0.51, 0, 0.08, 1');

	gsap.defaults({ ease: 'expoOut', duration: 1 });
	ScrollTrigger.config({ ignoreMobileResize: true });

	registered = true;
	return { gsap, ScrollTrigger, SplitText };
};

export const prefersReducedMotion = () =>
	typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger, SplitText };
