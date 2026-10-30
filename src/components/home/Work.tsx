'use client';

import { useState } from 'react';
import ArrowIcon from '@/components/primitives/ArrowIcon';
import RevealLines from '@/components/primitives/RevealLines';
import { work } from '@/data/portfolio';
import { cn } from '@/lib/utils';
import ProjectMark from './ProjectMark';
import ProjectPanel from './ProjectPanel';

const projects = work.projects;
const [selectedTitle, workTitle] = work.title;
const titleClass = 'text-giant font-medium tracking-[-0.06em]';
const titleTileClass = 'border-b px-(--gutter) pt-20 pb-6 lg:pt-36 lg:pb-8';

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
				<div className={cn('tile lg:border-r', titleTileClass)}>
					<h2 className='sr-only'>{work.title.join(' ')}</h2>
					<RevealLines as='p' lines={[selectedTitle]} className={titleClass} />
				</div>
				<div aria-hidden className={titleTileClass}>
					<RevealLines as='p' delay={0.12} lines={[workTitle]} className={titleClass} />
				</div>
			</div>

			<div className='grid lg:grid-cols-2 lg:divide-x'>
				<ProjectPanel project={active} />

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
