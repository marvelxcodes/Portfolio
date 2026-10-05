import type { Project } from '@/data/portfolio';
import ArrowIcon from '@/components/primitives/ArrowIcon';
import { cn } from '@/lib/utils';

const ProjectPanel = ({ project }: { project: Project }) => (
	<div
		className={cn(
			'relative flex min-h-90 flex-col justify-between overflow-hidden p-(--gutter) transition-[background-color,color] duration-[800ms] ease-out-expo lg:h-(--tile-h) lg:min-h-0',
			project.onAccent === 'light' ? 'text-white' : 'text-[#141414]'
		)}
		style={{ backgroundColor: project.accent }}
	>
		<div key={`${project.name}-meta`} className='mono flex animate-[rise_0.8s_var(--ease-out)] justify-between'>
			<span>{project.category}</span>
			<span>{project.year}</span>
		</div>

		<div key={project.name} className='flex animate-[rise_0.9s_var(--ease-out)] flex-col gap-3'>
			<p className='text-title font-semibold tracking-[-0.05em]'>{project.name}</p>
			<p className='max-w-[32ch] text-body'>{project.blurb}</p>
		</div>

		<div key={`${project.name}-foot`} className='flex animate-[rise_1s_var(--ease-out)] items-end justify-between gap-4'>
			<div>
				<p className='text-[2.5rem] font-medium leading-none tracking-[-0.05em]'>{project.metric.value}</p>
				<p className='mono mt-1 opacity-70'>{project.metric.label}</p>
			</div>
			{project.href ? (
				<a
					href={project.href}
					target='_blank'
					rel='noreferrer noopener'
					className='mono flex items-center gap-2 border-b border-current pb-0.5 transition-opacity hover:opacity-60'
				>
					Visit
					<ArrowIcon direction='up-right' className='size-4' />
				</a>
			) : (
				<span className='mono opacity-70'>Private beta</span>
			)}
		</div>
	</div>
);

export default ProjectPanel;
