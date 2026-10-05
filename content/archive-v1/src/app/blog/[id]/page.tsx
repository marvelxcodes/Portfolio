import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { posts } from '@/data/site';
import CharFill from '@/components/motion/CharFill';
import SplitReveal from '@/components/motion/SplitText';

type Params = { params: Promise<{ id: string }> };

export const generateStaticParams = async () => posts.map((post) => ({ id: post.id }));

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
	const { id } = await params;
	const post = posts.find((p) => p.id === id);
	if (!post) return { title: 'Not found' };
	return { title: post.title, description: post.excerpt };
};

const Post = async ({ params }: Params) => {
	const { id } = await params;
	const post = posts.find((p) => p.id === id);
	if (!post) notFound();

	return (
		<main className='relative z-10 pb-[var(--section-lg)] pt-[calc(var(--nav-h)+var(--section-md))]'>
			<article className='shell'>
				<Link
					href='/blog'
					className='link-underline font-mono text-xs uppercase tracking-wider text-stone-500'
				>
					← Journal
				</Link>

				<div className='mt-10 flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-wider text-stone-400'>
					<span className='rounded-full border border-cream-500 px-3 py-1.5 text-peach-500'>
						{post.tag}
					</span>
					<span>
						{new Date(post.date).toLocaleDateString('en-GB', {
							day: '2-digit',
							month: 'long',
							year: 'numeric'
						})}
					</span>
					<span>{post.readingTime}</span>
				</div>

				<h1 className='display mt-8 max-w-[18ch] text-h1 text-stone-900'>
					<SplitReveal mode='lines' immediate stagger={0.09}>
						{post.title}
					</SplitReveal>
				</h1>

				<div className='mt-14 max-w-[68ch] border-t border-cream-400 pt-12'>
					<CharFill as='p' className='text-h5 leading-snug text-stone-500'>
						{post.excerpt}
					</CharFill>

					<div className='mt-10 flex flex-col gap-6 text-base leading-relaxed text-stone-500'>
						<p>
							This entry has not been written out in full yet. The portfolio ships
							with the journal wired end to end — routing, metadata, static params
							and the reading surface — so the writing can land without touching
							the build.
						</p>
						<p>
							Drop the body copy into <code className='font-mono text-sm text-peach-500'>src/data/site.ts</code>{' '}
							(or point the route at MDX) and it renders here with the same
							type scale and scroll behaviour as the rest of the site.
						</p>
					</div>
				</div>
			</article>
		</main>
	);
};

export default Post;
