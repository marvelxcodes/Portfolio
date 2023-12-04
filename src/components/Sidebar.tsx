import Image from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
	return (
		<>
			<Image
				draggable={false}
				className='invert lg:hidden'
				src={'/icons/menu.svg'}
				alt='menu'
				height={32}
				width={32}
			></Image>
			<aside className='flex gap-x-8'>
				<Link
					href={'#work'}
					className='text-lg font-semibold uppercase'
				>
					My Work
				</Link>
				<Link
					href={'/blog'}
					className='text-lg font-semibold uppercase'
				>
					Blog
				</Link>
				<Link
					href={'/contact'}
					className='text-lg font-semibold uppercase'
				>
					Contact
				</Link>
			</aside>
		</>
	);
};

export default Sidebar;
