'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { projects } from '@/data/site';
import SplitReveal from '@/components/motion/SplitText';
import Reveal from '@/components/motion/Reveal';
import Scramble from '@/components/motion/Scramble';
import { pad } from '@/lib/utils';
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

/**
 * bymonolog.com's Success Stories, rebuilt.
 *
 * A two-column split — a sticky label rail beside a ten-column collection —
 * where every row is its own twelve-column grid: a 3:2 cover spanning seven and
 * the copy spanning five, separated by dotted rules. The reference parks each
 * cover image at `scale(1.15)`; that headroom is not decorative, it is what
 * gives the image room to drift against its own frame without exposing an edge.
 * The closer is monolog's three-part CTA row: count, label, arrow.
 */
const Stories = () => {
	const root = useRef<HTMLElement>(null);

	useIsomorphicLayoutEffect(() => {
		const el = root.current;
		if (!el || prefersReducedMotion()) return;
		registerGsap();

		const ctx = gsap.context(() => {
			gsap.utils.toArray<HTMLElement>('.story-cover img').forEach((img) => {
				gsap.fromTo(
					img,
					{ yPercent: -6 },
					{
						yPercent: 6,
						ease: 'none',
						scrollTrigger: {
							trigger: img.closest('.story-item'),
							start: 'top bottom',
							end: 'bottom top',
							scrub: 0.9
						}
					}
				);
			});
		}, root);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={root}
			id='stories'
			className='relative z-10 bg-cream-100 pb-[var(--section-md)]'
		>
			<div className='plate bg-cream-300 pt-[var(--section-lg)]'>
				<div className='shell'>
					<div className='flex flex-col gap-y-12 lg:flex-row lg:gap-x-[var(--site-gutter)]'>
						{/* --- the label rail --- */}
						<div className='lg:w-2/12'>
							<div className='lg:sticky lg:top-[calc(var(--nav-h)+2rem)]'>
								<h2 className='eyebrow text-stone-900'>
									<SplitReveal mode='words' stagger={0.05} className='inline-flex gap-[0.35em]'>
										Success Stories
									</SplitReveal>
								</h2>
								<p className='mt-4 hidden max-w-[18ch] text-sm leading-snug text-stone-500 lg:block'>
									Things that shipped, and what changed once they did.
								</p>
							</div>
						</div>

						{/* --- the collection --- */}
						<div className='lg:w-10/12'>
							<ul className='story-list gap-[var(--section-sm)]'>
								{projects.map((project) => (
									<li className='story-item' key={project.index}>
										<Reveal start='top 86%'>
											<a
												href={project.href}
												target='_blank'
												rel='noreferrer noopener'
												className='story-link'
												data-scramble-host
											>
												<div className='story-cover'>
													<Image
														src={project.image}
														alt={project.name}
														width={1200}
														height={800}
														sizes='(min-width: 1024px) 55vw, 92vw'
													/>
													<div className='story-overlay'>
														<span className='font-mono text-xs uppercase tracking-wider text-cream-50'>
															View project ↗
														</span>
													</div>
												</div>

												<div className='story-content'>
													<div>
														<div className='flex items-center gap-3 font-mono text-micro uppercase tracking-wider text-stone-500'>
															<Scramble text='SS' />
															<span aria-hidden>/</span>
															<span>{pad(projects.length)}</span>
															<span className='ml-auto'>{project.year}</span>
														</div>

														<h3 className='mt-5 text-h5 leading-tight text-stone-900'>
															{project.name}
														</h3>

														<p className='mt-4 text-base leading-snug text-stone-500'>
															{project.blurb}. {project.description}
														</p>

														<ul className='mt-5 flex flex-wrap gap-x-3 gap-y-1'>
															{project.stack.map((tech) => (
																<li
																	key={tech}
																	className='font-mono text-micro uppercase tracking-wider text-stone-400'
																>
																	{tech}
																</li>
															))}
														</ul>
													</div>

													{project.metric && (
														<div className='mt-8'>
															<p className='display text-h3 leading-none tracking-tightest text-stone-900'>
																{project.metric.value}
															</p>
															<p className='mt-3 max-w-[26ch] text-sm leading-snug text-stone-500'>
																{project.metric.label}
															</p>
														</div>
													)}
												</div>
											</a>
										</Reveal>
									</li>
								))}
							</ul>

							{/* --- monolog's three-part closer --- */}
							<a
								href='https://github.com/marvelxcodes?tab=repositories'
								target='_blank'
								rel='noreferrer noopener'
								className='story-cta group text-stone-900'
								data-scramble-host
							>
								<span className='display text-h5 leading-none tabular-nums'>
									{pad(projects.length)}
								</span>
								<Scramble
									text='View all repositories'
									className='display text-h5 leading-none'
								/>
								<span className='display text-h5 leading-none transition-transform duration-500 ease-[var(--ease-expo-out)] group-hover:translate-x-2'>
									(→)
								</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Stories;
