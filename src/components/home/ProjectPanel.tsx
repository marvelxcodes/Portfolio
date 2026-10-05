import type { Project } from '@/data/portfolio';
import ArrowIcon from '@/components/primitives/ArrowIcon';
import ProjectMark from './ProjectMark';
import { cn } from '@/lib/utils';

const ProjectPanel = ({ project }: { project: Project }) => (
	<div
		className={cn(
			'relative flex min-h-90 flex-col justify-between overflow-hidden p-(--gutter) transition-[background-color,color] duration-[800ms] ease-out-expo lg:h-(--tile-h) lg:min-h-0',
			project.onAccent === 'light' ? 'text-white' : 'text-[#141414]'
		)}
		style={{ backgroundColor: project.accent }}
	>
		<div key={`${project.name}-meta`} className='mono flex animate-[rise_0.8s_var(--ease-out)] items-center justify-between'>
			<span className='flex items-center gap-2'>
				{project.logo && <ProjectMark project={project} className='size-6' />}
				{project.category}
			</span>
			<span>{project.year}</span>
		</div>

		<div key={project.name} className='flex animate-[rise_0.9s_var(--ease-out)] flex-col gap-3'>
			<p className='text-title font-semibold tracking-[-0.05em]'>{project.name}</p>
			<p className='max-w-[44ch] text-body'>{project.description}</p>
		</div>

		<div key={`${project.name}-foot`} className='flex animate-[rise_1s_var(--ease-out)] items-end justify-between gap-4'>
			<p className='mono opacity-70'>{project.stack.join(' · ')}</p>
			{project.cta && (
				<a
					href={project.cta.href}
					target='_blank'
					rel='noreferrer noopener'
					className='mono flex shrink-0 items-center gap-2 border-b border-current pb-0.5 transition-opacity hover:opacity-60'
				>
					{project.cta.label}
					<ArrowIcon className='size-4' />
				</a>
			)}
		</div>
	</div>
);

export default ProjectPanel;
