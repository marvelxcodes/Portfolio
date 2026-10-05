'use client';

import { services } from '@/data/site';
import CharFill from '@/components/motion/CharFill';
import SplitReveal from '@/components/motion/SplitText';
import Reveal from '@/components/motion/Reveal';
import Parallax from '@/components/motion/Parallax';
import MorphShape from '@/components/motion/MorphShape';
import { type ShapeName } from '@/components/ui/shapes';

/** each row gets its own mark, morphing on scroll rather than on a timer */
const MARKS: ShapeName[][] = [
	['slab', 'burst', 'ring'],
	['ring', 'drop', 'pill'],
	['bolt', 'star', 'chevron'],
	['chevron', 'slab', 'star'],
	['pill', 'ring', 'burst'],
	['star', 'bolt', 'drop']
];

/**
 * juanmora.co's services scene. The reference gives every row a full 662px of
 * its own — near two-thirds of a viewport — so a row is read, not scanned. The
 * mark on each row morphs as it crosses, which is the one place on the page a
 * genuine path-to-path tween is doing the talking.
 */
const Services = () => (
	<section
		id='services'
		className='relative z-10 bg-cream-100 py-[var(--section-lg)]'
	>
		<div className='shell'>
			<div className='grid gap-y-8 lg:grid-cols-12'>
				<p className='eyebrow text-stone-500 lg:col-span-2'>
					<span className='eyebrow-word'>Design</span>
					<span className='eyebrow-word'>expert</span>
				</p>

				<CharFill
					as='h2'
					className='display text-h3 text-stone-900 lg:col-span-10'
					start='top 84%'
					end='bottom 62%'
				>
					I help teams succeed on projects like:
				</CharFill>
			</div>

			<ul className='mt-[var(--section-md)] flex flex-col'>
				{services.map((service, i) => (
					<li
						key={service.index}
						className='border-t border-cream-400 py-[clamp(2.5rem,6vw,5rem)]'
					>
						<div className='grid items-start gap-x-[var(--site-gutter)] gap-y-6 lg:grid-cols-12'>
							<div className='flex items-center gap-5 lg:col-span-2'>
								<span className='font-mono text-xs tabular-nums tracking-wider text-stone-400'>
									{service.index}
								</span>
								<Parallax distance={i % 2 ? 44 : -44}>
									<MorphShape
										sequence={MARKS[i % MARKS.length]}
										scrub
										className='h-10 w-10 text-peach-400 lg:h-14 lg:w-14'
									/>
								</Parallax>
							</div>

							<h3 className='display text-h4 text-stone-900 lg:col-span-6'>
								<SplitReveal mode='lines' stagger={0.08}>
									{service.title}
								</SplitReveal>
							</h3>

							<Reveal
								className='max-w-[42ch] text-base leading-relaxed text-stone-500 lg:col-span-4'
								delay={0.12}
							>
								{service.body}
							</Reveal>
						</div>
					</li>
				))}
			</ul>
		</div>
	</section>
);

export default Services;
