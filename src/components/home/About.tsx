import { about } from '@/data/portfolio';
import CharScrub from '@/components/primitives/CharScrub';
import FibonacciSpiral from '@/components/primitives/FibonacciSpiral';
import RevealLines from '@/components/primitives/RevealLines';
import Stats from './Stats';

const PORTRAIT_TURNS = 8;
const LANDSCAPE_TURNS = 9;

const About = () => (
	<section
		id='about'
		className='relative z-10 scroll-mt-(--header-h) border-t bg-paper'
	>
		<div className='relative'>
			<FibonacciSpiral
				turns={PORTRAIT_TURNS}
				className='absolute inset-0 size-full lg:hidden'
			/>
			<FibonacciSpiral
				turns={LANDSCAPE_TURNS}
				className='absolute inset-0 hidden size-full lg:block'
			/>
			<div className='relative grid lg:grid-cols-2 lg:divide-x'>
				<div className='p-(--gutter)'>
					<RevealLines
						lines={about.heading}
						className='text-mega font-medium uppercase tracking-[-0.06em] lg:sticky lg:top-[calc(var(--header-h)+var(--gutter))]'
					/>
				</div>
				<div className='flex flex-col gap-[1em] px-(--gutter) pt-4 pb-40 text-about lg:pt-(--gutter) lg:pb-[30svh]'>
					{about.paragraphs.map((paragraph) => (
						<CharScrub key={paragraph}>{paragraph}</CharScrub>
					))}
				</div>
			</div>
		</div>
		<Stats />
	</section>
);

export default About;
