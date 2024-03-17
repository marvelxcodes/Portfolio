import { Satoshi } from '@/fonts';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/utils/cn';

export type ProjectCardProps = {
	name: string;
	description: string;
	imageUrl: string;
	tags: string[];
	url?: string;
	color: string;
};

const ProjectCard = ({
	imageUrl,
	description,
	name,
	tags,
	url,
	color
}: ProjectCardProps) => {
	return (
		<div
			style={Satoshi.style}
			className='rounded-lg overflow-hidden bg-white h-max'
		>
			<div className='relative'>
				<Image
					src={imageUrl}
					alt={name}
					height={600}
					width={600}
				/>{' '}
				<div className='px-6 absolute  bottom-0 bg-gradient-to-t from-white w-full'>
					<h3 className={cn(`text-${color}`, 'text-3xl font-semibold')}>
						{name}
					</h3>
				</div>
			</div>

			<div className='flex'>
				<div>
					<p className='text-black px-6 font-medium'>{description}</p>
					<div>
						{tags?.map((tag, index) => (
							<div
								className=''
								key={index}
							>
								<span>{tag}</span>
							</div>
						))}
					</div>
				</div>
				<div>
					{url && (
						<Link
							className=''
							href={url}
						>
							Visit
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
