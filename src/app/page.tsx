import Image from 'next/image';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import Accordion from '@/components/Accordion';
import { coolvetica } from '@/fonts'

export default function Home() {
	return (
		<main className='bg-black'>
			<section className='p-10 container mx-auto'>
				<div className='relative'>
					<Image
						draggable={false}
						className='object-cover w-64 h-64 rounded-full'
						src={'/myself.jpg'}
						alt='rama krishnan v'
						height={200}
						width={200}
					></Image>
					<div className='absolute right-5 top-5 cursor-pointer'>
						<Sidebar />
					</div>
				</div>
				<h1
					style={coolvetica.style}
					className='text-6xl md:text-8xl text-white'
				>
					<span>I am Rama Krishnan, </span>
					<span className='text-transparent bg-[url(/text-mask.jpg)] bg-contain bg-clip-text stroke-white stroke-1'>
						Full Stack Developer
					</span>
					<span> based in India.</span>
				</h1>
				<div className='grid gap-y-8 py-8'>
					<h3 className='font-medium text-4xl'>
						I&apos;m a dedicated developer committed to striking the perfect
						balance between
						<span className='text-slate-400'> robustness and efficiency.</span>
					</h3>
					<h3 className='font-medium text-4xl'>
						As a devotee of Steve Jobs, my main emphasis lies in{' '}
						<span className='text-slate-400'>
							crafting things to perfection
						</span>{' '}
						while diligently minimizing any flaws.
					</h3>
				</div>
			</section>
			<section className='p-10 container mx-auto'>
				<div className='hs-accordion-group'>
					<Accordion
						question='hi hello'
						answer='rest 12'
					/>
				</div>
			</section>
			<Footer />
		</main>
	);
}
