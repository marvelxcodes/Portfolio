'use client';

import { useState } from 'react';
import { work } from '@/data/portfolio';
import FillLink from '@/components/primitives/FillLink';
import Label from '@/components/primitives/Label';
import RevealLines from '@/components/primitives/RevealLines';
import RollingText from '@/components/primitives/RollingText';
import ArrowIcon from '@/components/primitives/ArrowIcon';
import ProjectMark from './ProjectMark';
import ProjectPanel from './ProjectPanel';
import { cn, pad } from '@/lib/utils';

const projects = work.projects;

const Work = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const active = projects[activeIndex] ?? projects[0];

	const focusProject = (index: number) => {
		setActiveIndex(index);
		setHoveredIndex(index);
	};

	return (
		<section id='work' className='relative z-10 scroll-mt-(--header-h) border-t'>
			<div className='grid lg:grid-cols-2'>
				<div className='tile border-b px-(--gutter) pt-3 pb-6 lg:border-r'>
					<RevealLines lines={[work.title]} className='text-giant font-medium tracking-[-0.06em]' />
				</div>
				<div className='h-40 border-b lg:h-auto' />
			</div>

			<div className='grid lg:grid-cols-2 lg:divide-x'>
				<div className='grid bg-paper sm:grid-cols-2 sm:divide-x'>
					<div className='flex flex-col'>
						<div className='flex min-h-60 flex-col justify-between gap-10 border-b p-(--gutter) lg:h-(--tile-h)'>
							<Label>{work.label}</Label>
							<div className='mono flex items-center justify-between'>
								<span>{active.name}</span>
								<span className='flex items-center gap-1 text-dim'>
									<RollingText value={pad(activeIndex + 1)} /> - {pad(projects.length)}
								</span>
							</div>
						</div>
						<ProjectPanel project={active} />
					</div>
					<div className='flex flex-col gap-16 border-t p-(--gutter) sm:border-t-0'>
						<p>{work.intro}</p>
						<FillLink href={work.cta.href} arrow='up-right' className='mono w-50 px-3 py-2.5'>
							{work.cta.label}
						</FillLink>
					</div>
				</div>

				<ul className='divide-y border-y bg-paper lg:border-t-0' onMouseLeave={() => setHoveredIndex(null)}>
					{projects.map((project, index) => (
						<li key={project.name}>
							<button
								type='button'
								aria-pressed={activeIndex === index}
								data-active={hoveredIndex === index}
								onMouseEnter={() => focusProject(index)}
								onFocus={() => focusProject(index)}
								onClick={() => focusProject(index)}
								className='fill fill-y grid min-h-30 w-full grid-cols-2 items-end gap-4 px-3 pb-5 text-left [--fill:var(--c-ink)] data-[active=true]:text-paper lg:h-[calc((100svh-var(--header-h))/4)]'
							>
								<span className='text-title tracking-[-0.045em]'>{project.name}</span>
								<span className='mono flex items-center justify-between gap-3 pb-1.5'>
									<span className='flex items-center gap-2'>
										<ProjectMark project={project} className='size-5' />
										{project.category}
									</span>
									<ArrowIcon
										className={cn(
											'transition-[opacity,transform] duration-700 ease-out-expo',
											hoveredIndex === index ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'
										)}
									/>
								</span>
							</button>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default Work;
