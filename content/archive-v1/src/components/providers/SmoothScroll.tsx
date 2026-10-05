'use client';

import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, type PropsWithChildren } from 'react';
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from '@/lib/gsap';

/**
 * Lenis drives scroll; GSAP's ticker drives Lenis. ScrollTrigger is then told
 * to read scroll from Lenis so pinned scenes stay in lockstep with the eased
 * position rather than the raw one — the same wiring tresmarescapital uses.
 */
const SmoothScroll = ({ children }: PropsWithChildren) => {
	const pathname = usePathname();
	const lenisRef = useRef<Lenis | null>(null);

	useEffect(() => {
		registerGsap();

		if (prefersReducedMotion()) {
			ScrollTrigger.refresh();
			return;
		}

		const lenis = new Lenis({
			duration: 1.1,
			easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
			syncTouch: false,
			touchMultiplier: 1.6,
			wheelMultiplier: 0.9
		});

		lenisRef.current = lenis;
		lenis.on('scroll', ScrollTrigger.update);

		const tick = (time: number) => lenis.raf(time * 1000);
		gsap.ticker.add(tick);
		gsap.ticker.lagSmoothing(0);

		// anchor links route through Lenis so the easing stays consistent
		const onClick = (event: MouseEvent) => {
			const anchor = (event.target as HTMLElement)?.closest?.('a[href^="#"]');
			if (!anchor) return;
			const id = anchor.getAttribute('href');
			if (!id || id === '#') return;
			const target = document.querySelector(id);
			if (!target) return;
			event.preventDefault();
			lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.4 });
		};

		document.addEventListener('click', onClick);
		ScrollTrigger.refresh();

		return () => {
			document.removeEventListener('click', onClick);
			gsap.ticker.remove(tick);
			lenis.destroy();
			lenisRef.current = null;
		};
	}, []);

	// a route change resets both scroll position and every trigger's cache
	useEffect(() => {
		lenisRef.current?.scrollTo(0, { immediate: true });
		window.scrollTo(0, 0);
		const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
		return () => window.clearTimeout(id);
	}, [pathname]);

	return <>{children}</>;
};

export default SmoothScroll;
