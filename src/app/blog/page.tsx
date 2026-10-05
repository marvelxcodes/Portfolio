import Link from 'next/link';
import type { Metadata } from 'next';
import { blog, person } from '@/data/portfolio';
import { getAllPosts } from '@/lib/blog';
import { blogSchema, sharedOpenGraph } from '@/lib/seo';
import { formatPostDate } from '@/lib/utils';
import ArrowIcon from '@/components/primitives/ArrowIcon';
import Label from '@/components/primitives/Label';
import RevealLines from '@/components/primitives/RevealLines';
import PostList from '@/components/blog/PostList';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
	title: blog.title,
	description: blog.description,
	alternates: {
		canonical: '/blog',
		types: { 'application/rss+xml': [{ url: '/blog/rss.xml', title: `${blog.title} — ${person.name}` }] }
	},
	openGraph: { ...sharedOpenGraph, type: 'website', url: '/blog', title: `${blog.title} — ${person.name}`, description: blog.description }
};

const BlogPage = async () => {
	const posts = await getAllPosts();
	const [featured] = posts;

	return (
		<main className='relative z-10'>
			<JsonLd data={blogSchema(posts)} />

			<div className='grid lg:grid-cols-2 lg:divide-x'>
				<div className='tile flex flex-col justify-between gap-16 border-b p-(--gutter) pt-3 lg:min-h-(--tile-h)'>
					<RevealLines as='h1' trigger='load' lines={[blog.title]} className='text-giant font-medium tracking-[-0.06em]' />
					<div className='flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between'>
						<p className='max-w-[42ch]'>{blog.body}</p>
						<a href='/blog/rss.xml' className='mono flex shrink-0 items-center gap-2 transition-opacity hover:opacity-50'>
							RSS
							<ArrowIcon direction='up-right' className='size-4' />
						</a>
					</div>
				</div>

				{featured && (
					<Link
						href={`/blog/${featured.slug}`}
						className='fill fill-y group flex flex-col justify-between gap-12 border-b bg-ink p-(--gutter) text-paper [--fill:var(--c-plate)] hover:text-ink'
					>
						<div className='mono flex justify-between gap-4'>
							<Label>Latest</Label>
							<span>
								{featured.tag} · {formatPostDate(featured.date)}
							</span>
						</div>
						<div className='flex flex-col gap-6'>
							<h2 className='max-w-[18ch] text-title tracking-[-0.045em] lg:text-[clamp(2.5rem,3.6vw,4rem)] lg:leading-[1]'>
								{featured.title}
							</h2>
							<p className='max-w-[52ch] opacity-70'>{featured.description}</p>
							<span className='mono flex items-center justify-between'>
								Read · {featured.readingMinutes} min
								<ArrowIcon className='transition-transform duration-700 ease-out-expo group-hover:translate-x-1' />
							</span>
						</div>
					</Link>
				)}
			</div>

			<div className='h-40 lg:h-56' />
			<PostList posts={posts} />
			<div className='h-40 lg:h-56' />
		</main>
	);
};

export default BlogPage;
