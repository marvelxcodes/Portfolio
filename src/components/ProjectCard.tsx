import { Satoshi } from '@/fonts';
import Image from 'next/image';
import Link from 'next/link';

export type ProjectCardProps = {
	name: string;
	description: string;
	imageUrl: string;
	tags: string[];
	url?: string;
};

const ProjectCard = ({
	imageUrl,
	description,
	name,
	tags,
	url
}: ProjectCardProps) => {
	return (
		<div
			style={Satoshi.style}
			className='rounded-lg  overflow-hidden bg-white w-max h-max row-auto'
		>
			<div className='relative'>
				<Image
					src={imageUrl}
					alt={name}
					height={600}
					width={600}
				/>{' '}
				<div className='px-6 absolute  bottom-0 bg-gradient-to-t from-white w-full'>
					<h3 className='text-violet-600 text-3xl font-semibold'>{name}</h3>
				</div>
			</div>

			<div className='flex'>
				<div>
					<p className='text-black px-6 font-medium'>{description}</p>
					<div>
						{tags?.map((tag, index) => (
							<div key={index}>
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
