import Link from 'next/link';
import type { Metadata } from 'next';
import { posts } from '@/data/site';
import Chapter from '@/components/ui/Chapter';
import Reveal from '@/components/motion/Reveal';
import SplitReveal from '@/components/motion/SplitText';

export const metadata: Metadata = {
	title: 'Journal',
	description: 'Notes on systems, motion and shipping things alone.'
};

const Blog = () => (
	<main className='relative z-10 pb-[var(--section-lg)] pt-[calc(var(--nav-h)+var(--section-md))]'>
		<div className='shell'>
			<Chapter index='—' title='Journal' />

			<h1 className='display mt-12 max-w-[14ch] text-display text-stone-900'>
				<SplitReveal mode='lines' immediate stagger={0.1}>
					<span className='block'>Notes from</span>
					<span className='block'>
						the <span className='text-peach-500'>build</span>.
					</span>
				</SplitReveal>
			</h1>

			<p className='mt-8 max-w-[52ch] text-lg leading-relaxed text-stone-500'>
				Long-form writing about the parts of the work that are hard to explain in
				a commit message — systems, motion, and what it actually costs to ship
				something alone.
			</p>

			<ul className='mt-20 border-t border-cream-400'>
				{posts.map((post, i) => (
					<Reveal key={post.id} delay={i * 0.06} as='li'>
						<Link
							href={`/blog/${post.id}`}
							className='group flex flex-col gap-4 border-b border-cream-400 py-10 transition-colors duration-500 hover:bg-cream-200 md:flex-row md:items-baseline md:gap-10'
						>
							<span className='font-mono text-xs uppercase tracking-wider text-stone-400 md:w-32'>
								{new Date(post.date).toLocaleDateString('en-GB', {
									day: '2-digit',
									month: 'short',
									year: 'numeric'
								})}
							</span>

							<div className='flex-1'>
								<h2 className='text-h5 leading-snug text-stone-700 transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:text-stone-900'>
									{post.title}
								</h2>
								<p className='mt-3 max-w-[62ch] text-sm leading-relaxed text-stone-500'>
									{post.excerpt}
								</p>
							</div>

							<span className='flex shrink-0 items-center gap-4 font-mono text-xs uppercase tracking-wider text-stone-400'>
								<span className='rounded-full border border-cream-500 px-3 py-1.5'>
									{post.tag}
								</span>
								{post.readingTime}
							</span>
						</Link>
					</Reveal>
				))}
			</ul>
		</div>
	</main>
);

export default Blog;
