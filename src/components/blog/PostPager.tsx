import Link from 'next/link';
import type { PostSummary } from '@/lib/blog';
import ArrowIcon from '@/components/primitives/ArrowIcon';

type PagerTileProps = { post: PostSummary | null; label: string; direction: 'left' | 'right' };

const PagerTile = ({ post, label, direction }: PagerTileProps) =>
	post ? (
		<Link
			href={`/blog/${post.slug}`}
			rel={direction === 'left' ? 'prev' : 'next'}
			className='fill fill-y group flex min-h-60 flex-col justify-between gap-10 bg-paper p-(--gutter) [--fill:var(--c-ink)] hover:text-paper'
		>
			<span className='mono flex items-center gap-2'>
				{direction === 'left' && <ArrowIcon direction='left' className='size-4' />}
				{label}
				{direction === 'right' && <ArrowIcon className='size-4' />}
			</span>
			<span className='max-w-[22ch] text-title tracking-[-0.045em]'>{post.title}</span>
		</Link>
	) : (
		<div className='hidden min-h-60 sm:block' />
	);

const PostPager = ({ newer, older }: { newer: PostSummary | null; older: PostSummary | null }) => (
	<nav aria-label='More posts' className='relative z-10 grid border-y sm:grid-cols-2 sm:divide-x'>
		<PagerTile post={older} label='Older' direction='left' />
		<PagerTile post={newer} label='Newer' direction='right' />
	</nav>
);

export default PostPager;
