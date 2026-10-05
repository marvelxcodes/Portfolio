'use client';

import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { person } from '@/data/site';

/**
 * Counter-to-100, then a curtain that clips upward. Both bymonolog.com and
 * tresmarescapital.com gate the first paint this way; here it also buys the
 * shader plate a frame to compile before the hero animates in.
 */
const Preloader = () => {
	const root = useRef<HTMLDivElement>(null);
	const countRef = useRef<HTMLSpanElement>(null);
	const [done, setDone] = useState(false);

	useIsomorphicLayoutEffect(() => {
		const el = root.current;
		if (!el) return;
		registerGsap();

		if (prefersReducedMotion()) {
			setDone(true);
			document.documentElement.dataset.loaded = 'true';
			return;
		}

		const ctx = gsap.context(() => {
			const state = { n: 0 };
			const tl = gsap.timeline({
				onComplete: () => {
					setDone(true);
					document.documentElement.dataset.loaded = 'true';
					ScrollTrigger.refresh();
				}
			});

			tl.to(state, {
				n: 100,
				duration: 1.5,
				ease: 'power2.inOut',
				onUpdate: () => {
					if (countRef.current) {
						countRef.current.textContent = String(Math.round(state.n)).padStart(3, '0');
					}
				}
			})
				.to('[data-preload-bar]', { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0)
				.to('[data-preload-copy]', { yPercent: -110, duration: 0.7, ease: 'primary' }, '+=0.15')
				.to(
					el,
					{ clipPath: 'inset(0% 0% 100% 0%)', duration: 1.05, ease: 'expoInOut' },
					'-=0.4'
				);
		}, root);

		return () => ctx.revert();
	}, []);

	if (done) return null;

	return (
		<div
			ref={root}
			className='fixed inset-0 z-[100] flex flex-col justify-between bg-cream-100 px-[var(--site-margin)] py-10'
			style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
		>
			<div className='overflow-hidden'>
				<p
					data-preload-copy
					className='font-mono text-xs uppercase tracking-wider text-stone-400'
				>
					{person.name} — {person.role}
				</p>
			</div>

			<div className='flex items-end justify-between gap-6 overflow-hidden'>
				<span
					data-preload-copy
					className='display text-mega leading-[0.8] text-stone-900'
				>
					<span ref={countRef}>000</span>
				</span>
				<span
					data-preload-copy
					className='hidden pb-[0.35em] font-mono text-xs uppercase tracking-wider text-stone-400 sm:block'
				>
					Loading the story
				</span>
			</div>

			<div className='h-px w-full bg-cream-400'>
				<div data-preload-bar className='h-full origin-left scale-x-0 bg-peach-400' />
			</div>
		</div>
	);
};

export default Preloader;
