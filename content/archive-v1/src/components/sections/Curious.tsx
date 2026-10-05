'use client';

import Image from 'next/image';
import { stats, skillGroups, person, media } from '@/data/site';
import CharFill from '@/components/motion/CharFill';
import Counter from '@/components/motion/Counter';
import Reveal from '@/components/motion/Reveal';
import Parallax from '@/components/motion/Parallax';
import MorphShape from '@/components/motion/MorphShape';
import Lottie from '@/components/motion/Lottie';
import { cn } from '@/lib/utils';

const rows = skillGroups.flatMap((group) =>
	group.items.map((item) => ({ ...item, group: group.title }))
);

/**
 * juanmora.co's second scene: a statement that pins to the top of the viewport
 * while a much taller column scrolls past it. The reference runs a 473px sticky
 * half against an 881px scrolling half inside a 1685px section — roughly a 1:2
 * ratio, which is what keeps the pin from feeling either rushed or stuck.
 */
const Curious = () => (
	<section
		id='curious'
		className='relative z-10 bg-cream-100 pb-[var(--section-lg)] pt-[var(--section-lg)]'
	>
		<div className='shell'>
			<div className='grid gap-x-[var(--site-gutter)] gap-y-[var(--section-md)] lg:grid-cols-12'>
				{/* --- the pinned statement --- */}
				<div className='lg:col-span-6 lg:col-start-1'>
					<div className='sticky-half lg:min-h-svh lg:justify-center'>
						<p className='eyebrow text-stone-500'>
							<span className='eyebrow-word'>Who is a little</span>
							<span className='eyebrow-word'>curious?</span>
						</p>

						<CharFill
							as='h2'
							className='display mt-8 max-w-[13ch] text-h3 text-stone-900'
							start='top 82%'
							end='bottom 58%'
						>
							{person.since ? `${new Date().getFullYear() - person.since} years` : 'Five years'}{' '}
							making browsers do things they were never designed to do.
						</CharFill>

						<Reveal
							className='mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-8'
							stagger={0.08}
						>
							{stats.map((s) => (
								<div key={s.label}>
									<Counter
										value={s.value}
										suffix={s.suffix}
										className='display block text-h4 tracking-normal text-stone-900'
									/>
									<p className='mt-2 text-sm leading-snug text-stone-500'>
										{s.label}
									</p>
								</div>
							))}
						</Reveal>

						<Reveal className='mt-12 hidden items-center gap-4 lg:flex' delay={0.2}>
							<MorphShape
								sequence={['burst', 'star', 'ring', 'chevron', 'burst']}
								className='h-9 w-9 text-peach-400'
							/>
							<p className='font-mono text-xs uppercase tracking-wider text-stone-400'>
								Keep scrolling
							</p>
							<Lottie name='scroll-cue' className='h-12 w-8 opacity-55' />
						</Reveal>
					</div>
				</div>

				{/* --- the column that scrolls past it --- */}
				<div className='lg:col-span-5 lg:col-start-8'>
					<Parallax distance={-90} className='mb-[var(--section-sm)]'>
						<div className='plate aspect-[4/5] w-full'>
							<Image
								src={media.portraitAbout}
								alt={person.name}
								width={1000}
								height={1000}
								sizes='(min-width: 1024px) 40vw, 90vw'
								className='h-full w-full scale-105 object-cover'
							/>
							<div className='absolute inset-0 bg-peach-300/25 mix-blend-multiply' />
						</div>
					</Parallax>

					<p className='eyebrow mb-8 text-stone-500'>
						<span className='eyebrow-word'>The</span>
						<span className='eyebrow-word'>toolkit</span>
					</p>

					<ul className='flex flex-col'>
						{rows.map((row, i) => (
							<Reveal
								as='li'
								key={`${row.group}-${row.name}`}
								delay={(i % 6) * 0.04}
								start='top 92%'
								className='group flex items-center gap-4 border-b border-cream-400 py-4'
							>
								<span className='w-6 shrink-0 font-mono text-micro tabular-nums text-stone-400'>
									{String(i + 1).padStart(2, '0')}
								</span>

								{row.icon ? (
									<Image
										src={row.icon}
										alt=''
										width={20}
										height={20}
										className='icon-ink h-5 w-5 shrink-0 object-contain'
									/>
								) : (
									<span
										className='h-5 w-5 shrink-0 rounded-full border border-stone-400/50'
										aria-hidden
									/>
								)}

								<span className='flex-1 text-base text-stone-900'>{row.name}</span>

								<span className='hidden font-mono text-micro uppercase tracking-wider text-stone-400 sm:block'>
									{row.group}
								</span>

								<span className='relative h-[3px] w-16 shrink-0 overflow-hidden rounded-full bg-cream-400 sm:w-24'>
									<span
										className={cn(
											'absolute inset-y-0 left-0 rounded-full',
											row.level >= 92 ? 'bg-cobalt-500' : 'bg-peach-400'
										)}
										style={{ width: `${row.level}%` }}
									/>
								</span>
							</Reveal>
						))}
					</ul>
				</div>
			</div>
		</div>
	</section>
);

export default Curious;
