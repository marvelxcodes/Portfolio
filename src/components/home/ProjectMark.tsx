import Image from 'next/image';
import type { Project } from '@/data/portfolio';
import { cn } from '@/lib/utils';

const ProjectMark = ({ project, className }: { project: Project; className?: string }) =>
	project.logo ? (
		<Image src={project.logo} alt='' width={64} height={64} className={cn('shrink-0 rounded-[24%]', className)} />
	) : (
		<span aria-hidden className='size-2.5 shrink-0' style={{ backgroundColor: project.accent }} />
	);

export default ProjectMark;
