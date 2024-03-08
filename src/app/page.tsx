import Image from 'next/image';
import Footer from '@/components/Footer';

import Accordion from '@/components/Accordion';
import { coolvetica } from '@/fonts';
import Button from '@/components/Button';
import Link from 'next/link';
import { FIVERR_PROFILE_URL, GITHUB_PROFILE_URL } from '@/constants';
import QuoteSection from '@/components/QuoteSection';
import Container from '@/components/Container';
import ProjectCard from '@/components/ProjectCard';

export default function Home() {
	return (
		<main className='bg-black'>
			<Container>
				<div className='relative'>
					<Image
						draggable={false}
						className='object-cover w-64 h-64 rounded-full'
						src={'/myself.jpg'}
						alt='rama krishnan v'
						height={200}
						width={200}
					/>
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
						<span className='glow-effect'> robustness and efficiency.</span>
					</h3>
					<h3 className='font-medium text-4xl'>
						As a devotee of Steve Jobs, my main emphasis lies in{' '}
						<span className='glow-effect'>crafting things to perfection</span>{' '}
						while diligently minimizing any flaws.
					</h3>
				</div>
				<div className='flex flex-wrap gap-6'>
					<Link href={GITHUB_PROFILE_URL}>
						<Button>
							Github
							<Image
								src={'/social-media/github.svg'}
								height={24}
								width={24}
								alt='github'
							/>
						</Button>
					</Link>
					<Link href={FIVERR_PROFILE_URL}>
						<Button>Hire Me</Button>
					</Link>
				</div>
			</Container>

			{/* My Projects */}
			<Container>
				<h1
					style={coolvetica.style}
					className='text-4xl md:text-6xl text-white'
				>
					My Projects
				</h1>
				<div className='grid grid-cols-2 gap-12 my-8'>
					<ProjectCard
						name='Rankcraft'
						description='An Etsy SEO Analytics Tool'
						imageUrl='/projects/rankcraft1.png'
						tags={['Saas', 'Client Project']}
					/>
					<ProjectCard
						name='Rankcraft'
						description='An Etsy SEO Analytics Tool'
						imageUrl='/projects/rankcraft2.png'
						tags={['Saas', 'Client Project']}
					/>
					<ProjectCard
						name='Rankcraft'
						description='An Etsy SEO Analytics Tool'
						imageUrl='/projects/rankcraft1.png'
						tags={['Saas', 'Client Project']}
					/>
					<ProjectCard
						name='Rankcraft'
						description='An Etsy SEO Analytics Tool'
						imageUrl='/projects/rankcraft2.png'
						tags={['Saas', 'Client Project']}
					/>
					<ProjectCard
						name='Rankcraft'
						description='An Etsy SEO Analytics Tool'
						imageUrl='/projects/rankcraft1.png'
						tags={['Saas', 'Client Project']}
					/>
					<ProjectCard
						name='Rankcraft'
						description='An Etsy SEO Analytics Tool'
						imageUrl='/projects/rankcraft2.png'
						tags={['Saas', 'Client Project']}
					/>
				</div>
			</Container>

			<QuoteSection author='Steve Jobs'>
				We&apos;re here to put a dent in the universe. Otherwise why else even
				be here?
			</QuoteSection>

			{/* Frequently asked Questions */}
			<Container>
				<div className='hs-accordion-group'>
					<Accordion
						question='hi hello'
						answer='rest 12'
					/>
				</div>
			</Container>
			<Footer />
		</main>
	);
}
