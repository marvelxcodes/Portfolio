'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { person, social, media, heroFaces } from '@/data/site';
import MorphHeadline from '@/components/motion/MorphHeadline';
import SplitReveal from '@/components/motion/SplitText';
import Magnetic from '@/components/motion/Magnetic';
import { Brace } from '@/components/ui/shapes';
import ShaderField, { HERO_FIELD } from '@/components/ShaderField';
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

/**
 * Opening scene — juanmora.co's hero, mechanics and all.
 *
 * The portrait sits inside a clipped full-viewport frame and drifts *down* at
 * roughly 30% of the scroll rate while dimming to 0.6, so the page pulls away
 * from it rather than sliding it off. Those numbers are the ones the reference
 * actually runs: 0 → 270px of travel and 1 → 0.6 of opacity across exactly one
 * viewport, then clamped. Two gradient scrims keep the type legible over any
 * part of the image.
 *
 * The headline is the gsap.com mechanism: per-letter clip cells that roll up on
 * entrance, a 3D flip loop on the short row, flair marks behind three glyphs,
 * and a counter sliding through a widened cell.
 */
const Hero = () => {
	const root = useRef<HTMLElement>(null);

	useIsomorphicLayoutEffect(() => {
		const el = root.current;
		if (!el || prefersReducedMotion()) return;
		registerGsap();

		const ctx = gsap.context(() => {
			gsap
				.timeline({
					scrollTrigger: {
						trigger: el,
						start: 'top top',
						end: 'bottom top',
						scrub: true
					}
				})
				.fromTo(
					'[data-hero-media]',
					{ y: 0, opacity: 1 },
					{ y: 270, opacity: 0.6, ease: 'none' },
					0
				)
				.to('[data-hero-copy]', { yPercent: -18, opacity: 0.1, ease: 'none' }, 0)
				.to('[data-hero-cue]', { opacity: 0, duration: 0.35, ease: 'none' }, 0);
		}, root);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={root}
			id='hero'
			className='frame relative z-10 h-svh min-h-[38rem] bg-peach-300'
		>
			{/* the drifting plate: a live field, the portrait on top of it, and a
			    single-colour wash to bind the two into one surface */}
			<div data-hero-media className='frame-media'>
				<ShaderField palette={HERO_FIELD} trigger={root} speed={0.4} />
				<Image
					src={media.portraitHero}
					alt=''
					fill
					priority
					sizes='100vw'
					className='object-cover object-[center_20%] mix-blend-luminosity opacity-90'
				/>
				{/* peach wash — juanmora tints the whole hero plate a single colour */}
				<div className='absolute inset-0 bg-peach-400/45 mix-blend-color' />
				{/* juanmora's flat `black-overlay` at 0.56: the one thing that makes
				    cream display type reliable over an arbitrary photograph */}
				<div className='absolute inset-0 bg-ink-900/56' />
			</div>

			<div className='scrim-top' aria-hidden />
			<div className='scrim-bottom' aria-hidden />

			{/* the copy */}
			<div
				data-hero-copy
				className='shell relative z-10 flex h-full flex-col justify-end pb-[clamp(2rem,5vh,4rem)] pt-[calc(var(--nav-h)+2rem)]'
			>
				<MorphHeadline
					label={`${heroFaces.front} anything — ${person.name}, ${person.role}`}
					delay={0.55}
					className='text-cream-50 text-mega'
					rows={[
						{
							text: heroFaces.front,
							alt: heroFaces.back,
							flair: {
								0: {
									name: 'burst',
									className:
										'-top-[0.14em] left-[0.02em] h-[0.55em] w-[0.55em] text-cobalt-500'
								}
							}
						},
						{
							text: 'ANYTHING',
							flair: {
								3: {
									name: 'bolt',
									className:
										'bottom-[0.06em] left-[0.06em] h-[0.72em] w-[0.4em] text-cream-50/90'
								},
								5: {
									name: 'chevron',
									className:
										'-top-[0.06em] left-[0.1em] h-[0.42em] w-[0.3em] text-peach-400'
								}
							},
							counter: {
								at: 7,
								value: String(person.since),
								className:
									'font-mono text-[0.09em] uppercase tracking-[0.3em] text-cream-50/60'
							}
						}
					]}
				/>

				{/* braced subtitle — gsap.com brackets its standfirst the same way */}
				<div className='mt-[clamp(1.5rem,3.5vh,2.75rem)] flex flex-wrap items-end justify-between gap-x-10 gap-y-6'>
					{/* the braces sit outside the split: SplitText rewrites the
					    element's contents, and any child markup it finds is either
					    dismantled or swallowed by a word wrapper */}
					<div className='braced text-cream-50 text-lg leading-snug md:max-w-[38ch]'>
						<Brace />
						<SplitReveal mode='words' immediate delay={1.15} stagger={0.03}>
							{person.tagline}
						</SplitReveal>
						<Brace />
					</div>

					<SplitReveal
						mode='words'
						immediate
						delay={1.35}
						stagger={0.03}
						className='flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-wider text-cream-50/75'
					>
						<span>{person.name}</span>
						<span aria-hidden>·</span>
						<span>{person.role}</span>
						<span aria-hidden>·</span>
						<span>{person.locationLong}</span>
					</SplitReveal>
				</div>

				{/* actions + cue */}
				<div
					data-hero-cue
					className='mt-[clamp(1.75rem,4vh,3rem)] flex flex-wrap items-center justify-between gap-6 border-t border-cream-50/20 pt-6'
				>
					<div className='flex flex-wrap gap-3'>
						<Magnetic>
							<Link href='#stories' className='btn btn-peach'>
								Success stories
								<span aria-hidden>↓</span>
							</Link>
						</Magnetic>
						<Magnetic>
							<a
								href={social[0].href}
								target='_blank'
								rel='noreferrer noopener'
								className='btn btn-onmedia'
							>
								GitHub
								<span aria-hidden>↗</span>
							</a>
						</Magnetic>
					</div>

					<p className='font-mono text-xs uppercase tracking-wider text-cream-50/70'>
						{person.availability}
					</p>
				</div>
			</div>
		</section>
	);
};

export default Hero;
