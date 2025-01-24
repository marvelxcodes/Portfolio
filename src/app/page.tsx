import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button';
import Footer from '@/components/Footer';
import SlideIn from '@/components/SlideIn';
import { coolvetica, Satoshi } from '@/fonts';
import Container from '@/components/Container';
import ProjectCard from '@/components/ProjectCard';
import QuoteSection from '@/components/QuoteSection';
import SectionTitle from '@/components/SectionTitle';
import SkillProgress from '@/components/SkillProgress';
import { GITHUB_PROFILE_URL, SKILLSETS } from '@/constants';

export default function Home() {
	return (
		<main className='bg-black'>
			{/* Hero Section */}
			<Container className='min-h-screen'>
				<div className='relative'>
					<Image
						draggable={false}
						className='object-cover object-[0_-1.5rem] w-64 h-64 rounded-full'
						src={'/myself.png'}
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
					<div
						style={Satoshi.style}
						className='grid gap-y-8 py-8 text-white'
					>
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
					<Link href={'/blog'}>
						<Button>My Blog</Button>
					</Link>
				</div>
			</Container>

			{/* My Skillset */}
			<Container>
				<SectionTitle
					textLeft='Get to know'
					textRight='What I am Good at'
				/>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
					{SKILLSETS.map((skill) => (
						<SkillProgress
							key={skill.name}
							{...skill}
						/>
					))}
				</div>
			</Container>

			{/* My Projects */}
			<Container className='relative'>
				<SectionTitle
					textLeft='Check out stuff'
					textRight='That I Engineered'
				/>
				<div className='flex max-md:flex-col w-full overflow-hidden gap-x-12'>
					<div className='flex flex-1 flex-col my-8 gap-y-12'>
						<SlideIn>
							<ProjectCard
								name='Rankcraft'
								description='An Etsy SEO Analytics Tool'
								imageUrl='/projects/rankcraft1.png'
								tags={['Saas', 'Client Project']}
								color='violet-600'
							/>
						</SlideIn>
						<SlideIn>
							<ProjectCard
								name='Rankcraft'
								description='An Etsy SEO Analytics Tool'
								imageUrl='/projects/rankcraft2.png'
								tags={['Saas', 'Client Project']}
								color='violet-600'
							/>
						</SlideIn>
						<SlideIn>
							<ProjectCard
								name='Rankcraft'
								description='An Etsy SEO Analytics Tool'
								imageUrl='/projects/rankcraft1.png'
								tags={['Saas', 'Client Project']}
								color='violet-600'
							/>
						</SlideIn>
					</div>
					<div className='flex flex-1 flex-col gap-y-12 my-8 pt-20'>
						<SlideIn from='right'>
							<ProjectCard
								name='Rankcraft'
								description='An Etsy SEO Analytics Tool'
								imageUrl='/projects/rankcraft2.png'
								tags={['Saas', 'Client Project']}
								color='violet-600'
							/>
						</SlideIn>
						<SlideIn from='right'>
							<ProjectCard
								name='Rankcraft'
								description='An Etsy SEO Analytics Tool'
								imageUrl='/projects/rankcraft1.png'
								tags={['Saas', 'Client Project']}
								color='violet-600'
							/>
						</SlideIn>

						<SlideIn from='right'>
							<ProjectCard
								name='Rankcraft'
								description='An Etsy SEO Analytics Tool'
								imageUrl='/projects/rankcraft2.png'
								tags={['Saas', 'Client Project']}
								color='violet-600'
							/>
						</SlideIn>
					</div>
				</div>
				<div className='absolute flex items-end justify-center bottom-12 left-0 h-96 w-full bg-gradient-to-t from-black'>
					<a href={GITHUB_PROFILE_URL}>
						<button className='bg-white px-6 py-3 rounded-full font-medium'>
							Show More
						</button>
					</a>
				</div>
			</Container>

			<QuoteSection author='Steve Jobs'>
				We&apos;re here to put a dent in the universe. Otherwise why else even
				be here?
			</QuoteSection>

			{/* Services */}
			<Container className='space-y-8 pb-0 my-16'>
				<h1 className='text-white text-5xl xl:text-8xl font-semibold'>
					Services that I Offer
				</h1>
				<ul className=' text-white space-y-6 text-3xl xl:text-5xl font-medium select-none'>
					<SlideIn>
						<li>Blogs</li>
					</SlideIn>
					<SlideIn>
						<li>SaaS Apps</li>
					</SlideIn>
					<SlideIn>
						<li>Landing Pages</li>
					</SlideIn>
					<SlideIn>
						<li>UI / UX Designs</li>
					</SlideIn>
					<SlideIn>
						<li>Chrome Extensions</li>
					</SlideIn>
					<SlideIn>
						<li>E-Commerce Websites</li>
					</SlideIn>
				</ul>
			</Container>

			{/* Frequently asked Questions */}
			{/* <Container>
				<div className='hs-accordion-group'>
					<Accordion
						question='hi hello'
						answer='rest 12'
					/>
				</div>
			</Container> */}
			<Footer />
		</main>
	);
}
