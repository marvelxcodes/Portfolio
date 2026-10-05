'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { footerColumns, builtWith, person, social } from '@/data/site';
import DottedRule from '@/components/ui/DottedRule';
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

/**
 * The close, built from two references at once.
 *
 * sui.io supplies the architecture — dashed rules and four link columns under
 * mono eyebrows. juanmora.co supplies the ending: a credits strip naming the
 * tools the site was actually built with, then the handle set as large as the
 * viewport allows, scrubbed up as the last of the page clears it.
 *
 * It runs on the inverted ground so the story finishes in the same room the
 * argument was made in.
 */
const Footer = () => {
	const root = useRef<HTMLDivElement>(null);

	useIsomorphicLayoutEffect(() => {
		const el = root.current;
		if (!el || prefersReducedMotion()) return;
		registerGsap();

		const ctx = gsap.context(() => {
			gsap.fromTo(
				'[data-footer-col]',
				{ y: 40, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.9,
					ease: 'expoOut',
					stagger: 0.07,
					scrollTrigger: { trigger: el, start: 'top 82%', once: true }
				}
			);

			gsap.fromTo(
				'[data-footer-mark]',
				{ yPercent: 22, opacity: 0.25 },
				{
					yPercent: 0,
					opacity: 1,
					ease: 'none',
					scrollTrigger: {
						trigger: el,
						start: 'top 70%',
						end: 'bottom bottom',
						scrub: 1
					}
				}
			);
		}, root);

		return () => ctx.revert();
	}, []);

	return (
		<div ref={root} className='on-ink relative z-[2]' data-footer data-scheme='ink'>
			<footer className='shell py-[var(--section-md)]'>
				<DottedRule className='text-cream-300' />

				{/* masthead */}
				<div className='flex flex-wrap items-end justify-between gap-8 py-10'>
					<div className='max-w-xl'>
						<p className='eyebrow text-cream-100'>
							<span className='eyebrow-word'>Available</span>
						</p>
						<p className='mt-5 text-h6 leading-snug text-cream-200'>
							{person.availability} — building products end to end from{' '}
							{person.locationLong}.
						</p>
					</div>
					<Link href='/contact' className='btn'>
						Start a project
						<span aria-hidden>↗</span>
					</Link>
				</div>

				<DottedRule className='text-cream-300' />

				{/* link grid */}
				<div className='grid grid-cols-2 gap-x-6 gap-y-12 py-14 md:grid-cols-4 md:gap-5'>
					{footerColumns.map((column) => (
						<div key={column.heading} data-footer-col className='flex flex-col gap-5'>
							<DottedRule className='text-cream-100/25' />
							<p className='font-mono text-sm uppercase tracking-tight text-cream-100'>
								{column.heading}/
							</p>
							<ul className='flex flex-col gap-3'>
								{column.links.map((link) => (
									<li key={link.label}>
										<Link
											href={link.href}
											className='text-base leading-5 text-cream-200/55 transition-colors duration-300 hover:text-cream-50'
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<DottedRule className='text-cream-300' />

				{/* juanmora's credits strip */}
				<div className='flex flex-wrap items-center gap-x-8 gap-y-3 py-8'>
					<p className='font-mono text-xs uppercase tracking-wider text-cream-200/45'>
						Built using
					</p>
					<ul className='flex flex-wrap items-center gap-x-6 gap-y-2'>
						{builtWith.map((tool) => (
							<li
								key={tool}
								className='font-mono text-xs uppercase tracking-wider text-cream-100/80'
							>
								{tool}
							</li>
						))}
					</ul>
				</div>

				<DottedRule className='text-cream-300' />

				{/* wordmark */}
				<div className='overflow-hidden py-10'>
					<p
						data-footer-mark
						style={{ fontSize: 'clamp(2.75rem, 13vw, 12rem)' }}
						className='display select-none text-center leading-[0.78] text-cream-100/12'
					>
						{person.handle}
					</p>
				</div>

				<DottedRule className='text-cream-300' />

				{/* colophon */}
				<div className='flex flex-wrap items-center justify-between gap-6 pt-8'>
					<p className='font-mono text-xs uppercase tracking-wider text-cream-200/45'>
						© {new Date().getFullYear()} {person.name}
					</p>

					<ul className='flex items-center gap-5'>
						{social.map((item) => (
							<li key={item.label}>
								<a
									href={item.href}
									target='_blank'
									rel='noreferrer noopener'
									aria-label={item.label}
									className='block'
								>
									<Image
										src={item.icon}
										alt=''
										width={18}
										height={18}
										className='icon-cream h-[18px] w-[18px]'
									/>
								</a>
							</li>
						))}
					</ul>

					<p className='font-mono text-xs uppercase tracking-wider text-cream-200/45'>
						{person.email}
					</p>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
