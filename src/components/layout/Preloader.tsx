'use client';

import { useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { gsap, prefersReducedMotion, registerGsap } from '@/lib/gsap';
import { markSiteReady } from '@/lib/ready';
import { MARK_PATH } from '@/components/primitives/Mark';

const FONT_WAIT_LIMIT_MS = 1200;

const Preloader = () => {
	const root = useRef<HTMLDivElement>(null);
	const [done, setDone] = useState(false);

	useIsomorphicLayoutEffect(() => {
		const element = root.current;
		if (!element) return;
		registerGsap();

		if (prefersReducedMotion()) {
			markSiteReady();
			setDone(true);
			return;
		}

		const fontsReady = Promise.race([
			document.fonts.ready,
			new Promise((resolve) => window.setTimeout(resolve, FONT_WAIT_LIMIT_MS))
		]);

		const context = gsap.context(() => {
			const timeline = gsap.timeline({ paused: true, onComplete: () => setDone(true) });
			timeline
				.fromTo('[data-mark]', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: 'expoInOut' })
				.to('[data-mark]', { scale: 0.6, opacity: 0, duration: 0.6, ease: 'expoInOut' }, '+=0.1')
				.add(markSiteReady, '-=0.2')
				.to(element, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expoInOut' }, '<');
			void fontsReady.then(() => timeline.play());
		}, element);

		return () => context.revert();
	}, []);

	if (done) return null;

	return (
		<div ref={root} aria-hidden className='fixed inset-0 z-100 flex items-center justify-center bg-ink text-paper [clip-path:inset(0_0_0_0)]'>
			<svg viewBox='0 0 120 80' fill='none' stroke='currentColor' strokeWidth={8} strokeLinecap='round' strokeLinejoin='round' className='w-16'>
				<path data-mark d={MARK_PATH} pathLength={1} strokeDasharray='1' strokeDashoffset='1' style={{ transformOrigin: 'center', transformBox: 'fill-box' }} />
			</svg>
		</div>
	);
};

export default Preloader;
