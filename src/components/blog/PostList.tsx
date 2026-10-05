'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { PostSummary } from '@/lib/blog';
import ArrowIcon from '@/components/primitives/ArrowIcon';
import Label from '@/components/primitives/Label';
import { formatPostDate, pad } from '@/lib/utils';

const ALL_TAGS = 'All';

const PostList = ({ posts }: { posts: PostSummary[] }) => {
	const [activeTag, setActiveTag] = useState(ALL_TAGS);
	const tags = [ALL_TAGS, ...new Set(posts.map((post) => post.tag))];
	const visibleCount = posts.filter((post) => activeTag === ALL_TAGS || post.tag === activeTag).length;

	return (
		<section aria-labelledby='all-posts' className='relative z-10 bg-paper'>
			<div className='flex flex-col gap-6 border-y p-(--gutter) lg:flex-row lg:items-center lg:justify-between'>
				<div className='flex items-center gap-6'>
					<Label>
						<span id='all-posts'>All posts</span>
					</Label>
					<span className='mono text-dim'>
						{pad(visibleCount)} / {pad(posts.length)}
					</span>
				</div>
				<div role='group' aria-label='Filter by topic' className='flex flex-wrap gap-px'>
					{tags.map((tag) => (
						<button
							key={tag}
							type='button'
							aria-pressed={activeTag === tag}
							data-active={activeTag === tag}
							onClick={() => setActiveTag(tag)}
							className='fill mono border px-3 py-2 [--fill:var(--c-ink)] data-[active=true]:text-paper'
						>
							{tag}
						</button>
					))}
				</div>
			</div>

			<ol className='divide-y border-b'>
				{posts.map((post) => (
					<li key={post.slug} hidden={activeTag !== ALL_TAGS && post.tag !== activeTag}>
						<Link
							href={`/blog/${post.slug}`}
							className='fill fill-y group grid gap-4 p-(--gutter) [--fill:var(--c-ink)] hover:text-paper focus-visible:text-paper md:grid-cols-[10rem_1fr_12rem] md:items-baseline md:gap-10'
						>
							<time dateTime={post.date} className='mono'>
								{formatPostDate(post.date)}
							</time>
							<span>
								<span className='block text-title tracking-[-0.045em]'>{post.title}</span>
								<span className='mt-3 block max-w-[62ch] opacity-60'>{post.description}</span>
							</span>
							<span className='mono flex items-center justify-between gap-4'>
								{post.tag} · {post.readingMinutes} min
								<ArrowIcon className='transition-transform duration-700 ease-out-expo group-hover:translate-x-1' />
							</span>
						</Link>
					</li>
				))}
			</ol>
		</section>
	);
};

export default PostList;
