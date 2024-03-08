import Image from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
	return (
		<>
			<div className='bg-white space-y-1.5 flex flex-col justify-center p-3 rounded-full h-12 w-12'>
				<div className='h-[2px] rounded-full w-full bg-black'></div>
				<div className='h-[2px] rounded-full w-full bg-black'></div>
				<div className='h-[2px] rounded-full w-full bg-black'></div>
			</div>
			<Image
				draggable={false}
				className='invert lg:hidden'
				src={'/icons/menu.svg'}
				alt='menu'
				height={32}
				width={32}
			></Image>
			<aside className='fixed flex-col flex gap-x-8 right-0 top-0 w-[20rem] bg-white h-screen'>
				<div className='bg-black flex flex-col justify-center rounded-full p-3 h-12 w-12'>
					<div className='h-[2px] rotate-45 rounded-full w-8 bg-white'></div>
					<div className='h-[2px] -rotate-45 rounded-full w-8 bg-white'></div>
				</div>
				<nav className='grid text-black'>
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
				</nav>
			</aside>
		</>
	);
};

export default Sidebar;
