'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { nav, person } from '@/data/site';
import { gsap, ScrollTrigger, registerGsap } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

/**
 * Sticky rail. Hides on scroll-down, returns on scroll-up, and carries a
 * hairline progress bar for the whole document.
 *
 * The chrome is themed from whatever the bar is currently sitting on rather
 * than blended into it. A `mix-blend-difference` rail is the tidier trick, but
 * against mid-tone photography it lands on mid-tone results and the labels stop
 * being readable — which is the one thing navigation cannot do.
 *
 * Two independent flags drive it:
 * · `data-solid` — whether the bar has a backdrop at all. It is off only while
 *   floating over the home page's darkened hero; every other route starts on.
 * · `data-chrome` — light or dark ink for the labels. Sections that run on the
 *   near-black register mark themselves `data-scheme="ink"`, and a trigger per
 *   section counts how many are currently under the bar. A counter rather than
 *   a boolean, because the panel and the footer touch and their triggers
 *   overlap by a frame.
 */
const Nav = () => {
	const ref = useRef<HTMLElement>(null);
	const barRef = useRef<HTMLSpanElement>(null);
	const [open, setOpen] = useState(false);
	const overDarkHero = usePathname() === '/';

	useIsomorphicLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;
		registerGsap();

		const ctx = gsap.context(() => {
			const hide = gsap.to(el, {
				yPercent: -110,
				duration: 0.5,
				ease: 'primary',
				paused: true
			});

			const progress = ScrollTrigger.create({
				start: 'top -120',
				end: 'max',
				onUpdate: (self) => {
					if (self.direction === 1 && self.scroll() > 240) hide.play();
					else hide.reverse();
					if (barRef.current) {
						barRef.current.style.transform = `scaleX(${self.progress})`;
					}
					el.dataset.solid =
						!overDarkHero || self.scroll() > 80 ? 'true' : 'false';
				}
			});

			let inkCount = 0;
			const navH = el.offsetHeight || 68;

			const schemes = gsap.utils
				.toArray<HTMLElement>('[data-scheme="ink"]')
				.map((section) =>
					ScrollTrigger.create({
						trigger: section,
						start: `top top+=${navH * 0.5}`,
						end: `bottom top+=${navH * 0.5}`,
						onToggle: (self) => {
							inkCount = Math.max(0, inkCount + (self.isActive ? 1 : -1));
							el.dataset.chrome = inkCount > 0 ? 'light' : 'dark';
						}
					})
				);

			return () => {
				progress.kill();
				schemes.forEach((s) => s.kill());
				hide.kill();
			};
		}, ref);

		return () => ctx.revert();
	}, [overDarkHero]);

	// the mobile sheet locks the page behind it
	useEffect(() => {
		document.body.style.overflow = open ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<Fragment>
			<header
				ref={ref}
				data-solid={overDarkHero ? 'false' : 'true'}
				data-chrome={overDarkHero ? 'light' : 'dark'}
				className={cn(
					'group fixed inset-x-0 top-0 z-50 transition-colors duration-500',
					'data-[solid=true]:backdrop-blur-xl',
					'data-[solid=true]:data-[chrome=dark]:bg-cream-100/85',
					'data-[solid=true]:data-[chrome=light]:bg-ink-800/75'
				)}
			>
				<div className='shell flex h-[var(--nav-h)] items-center justify-between gap-6'>
					<Link
						href='/'
						className='flex items-center gap-3 font-mono text-xs uppercase tracking-wider transition-colors duration-500 group-data-[chrome=light]:text-cream-50 group-data-[chrome=dark]:text-stone-900'
					>
						<span className='relative flex h-2 w-2'>
							<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-peach-400 opacity-70' />
							<span className='relative inline-flex h-2 w-2 rounded-full bg-peach-400' />
						</span>
						<span>{person.handle}</span>
					</Link>

					<nav className='hidden items-center gap-8 md:flex'>
						{nav.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className='link-underline font-mono text-xs uppercase tracking-wider transition-colors duration-300 group-data-[chrome=light]:text-cream-50/80 group-data-[chrome=light]:hover:text-cream-50 group-data-[chrome=dark]:text-stone-500 group-data-[chrome=dark]:hover:text-stone-900'
							>
								{item.label}
							</Link>
						))}
					</nav>

					<div className='flex items-center gap-4'>
						<Link
							href='/contact'
							className='btn hidden py-3 text-[0.65rem] transition-colors duration-500 group-data-[chrome=light]:border-cream-50/34 group-data-[chrome=light]:text-cream-50 group-data-[chrome=dark]:border-stone-900/25 group-data-[chrome=dark]:text-stone-900 sm:inline-flex'
						>
							Start a project
						</Link>
						<button
							type='button'
							onClick={() => setOpen((v) => !v)}
							aria-expanded={open}
							aria-label={open ? 'Close menu' : 'Open menu'}
							className='flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border transition-colors duration-500 group-data-[chrome=light]:border-cream-50/40 group-data-[chrome=dark]:border-stone-900/25 md:hidden'
						>
							<span
								className={cn(
									'h-px w-4 transition-[transform,background-color] duration-300 group-data-[chrome=light]:bg-cream-50 group-data-[chrome=dark]:bg-stone-900',
									open && 'translate-y-[3.5px] rotate-45'
								)}
							/>
							<span
								className={cn(
									'h-px w-4 transition-[transform,background-color] duration-300 group-data-[chrome=light]:bg-cream-50 group-data-[chrome=dark]:bg-stone-900',
									open && '-translate-y-[3.5px] -rotate-45'
								)}
							/>
						</button>
					</div>
				</div>

				<span className='block h-px w-full group-data-[chrome=light]:bg-cream-50/25 group-data-[chrome=dark]:bg-cream-400'>
					<span
						ref={barRef}
						className='block h-full origin-left scale-x-0 bg-peach-400'
					/>
				</span>
			</header>

			{/* The sheet lives outside the header: it needs its own opaque ground
			    regardless of what the bar happens to be themed as. */}
			<div
				className={cn(
					'on-ink fixed inset-0 top-[var(--nav-h)] z-40 transition-[opacity,visibility] duration-500 md:hidden',
					open ? 'visible opacity-100' : 'invisible opacity-0'
				)}
			>
				<div className='shell flex h-full flex-col justify-between py-12'>
					<nav className='flex flex-col gap-2'>
						{nav.map((item, i) => (
							<Link
								key={item.href}
								href={item.href}
								onClick={() => setOpen(false)}
								className={cn(
									'display border-b border-cream-100/20 py-4 text-h4 text-cream-100 transition-[transform,opacity] duration-500',
									open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
								)}
								style={{ transitionDelay: `${80 + i * 60}ms` }}
							>
								{item.label}
							</Link>
						))}
					</nav>
					<Link
						href='/contact'
						onClick={() => setOpen(false)}
						className='btn btn-peach justify-center'
					>
						Start a project
					</Link>
				</div>
			</div>
		</Fragment>
	);
};

export default Nav;
