import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { Satoshi } from '@/fonts';
import selectRandom from '@/utils/random';

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
	const COLORS = [
		'#B948B3',
		'#072268',
		'#4178E3',
		'#E20854',
		'#CD8648',
		'#F34B18'
	];
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

			<div className='flex px-6 pb-6'>
				<div>
					<p className='text-black font-medium'>{description}</p>
					<div className='flex flex-wrap gap-3 py-3'>
						{tags?.map((tag, index) => (
							<div
								style={{ backgroundColor: selectRandom(COLORS) }}
								className='px-3 text-white rounded-full font-medium'
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
