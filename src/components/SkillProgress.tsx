import Image from 'next/image';

export type SkillProgressType = {
	name: string;
	progress: number;
	icon: string;
};

const SkillProgress = ({ icon, name, progress }: SkillProgressType) => {
	return (
		<div className='p-3 bg-neutral-900 rounded-2xl'>
			<div className='flex py-2 items-center gap-x-2'>
				<div className='rounded-md overflow-hidden'>
					<Image
						height={32}
						width={32}
						src={icon}
						alt={name}
					/>
				</div>
				<span className='text-white text-xl font-medium'>{name}</span>
			</div>
			<div className='flex items-center gap-x-2'>
				<div className='flex h-3 w-full bg-neutral-800 rounded-full p-1'>
					<div
						style={{ width: `${progress}%` }}
						className='bg-gradient-to-tr rounded-full from-pink-700 to-amber-500'
					/>
					<div className='rounded-e-full bg-neutral-700 flex-1' />
				</div>
				<span className='text-white text-center font-medium glow-effect h-full text-sm'>
					{progress}%
				</span>
			</div>
		</div>
	);
};

export default SkillProgress;
