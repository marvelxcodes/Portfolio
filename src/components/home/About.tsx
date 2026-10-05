import { about } from '@/data/portfolio';
import CharScrub from '@/components/primitives/CharScrub';
import Label from '@/components/primitives/Label';
import Stats from './Stats';

const About = () => (
	<section id='about' className='relative z-10 scroll-mt-(--header-h) border-t bg-paper'>
		<div className='grid lg:grid-cols-2 lg:divide-x'>
			<div className='p-(--gutter)'>
				<Label className='lg:sticky lg:top-[calc(var(--header-h)+var(--gutter))]'>{about.label}</Label>
			</div>
			<div className='flex flex-col gap-[1em] px-(--gutter) pt-4 pb-40 text-about lg:pt-(--gutter) lg:pb-[30svh]'>
				{about.paragraphs.map((paragraph) => (
					<CharScrub key={paragraph}>{paragraph}</CharScrub>
				))}
			</div>
		</div>
		<Stats />
	</section>
);

export default About;
