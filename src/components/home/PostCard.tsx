import Link from 'next/link';
import type { PostSummary } from '@/lib/blog';
import ArrowIcon from '@/components/primitives/ArrowIcon';
import { formatPostDate } from '@/lib/utils';

const PostCard = ({ post, index }: { post: PostSummary; index: number }) => (
	<Link href={`/blog/${post.slug}`} draggable={false} className='group relative isolate flex aspect-[0.8] flex-col overflow-hidden bg-haze outline outline-line'>
		<span
			aria-hidden
			className='absolute inset-0 -z-10 bg-[radial-gradient(var(--c-ink)_1px,transparent_1.3px)] bg-size-[6px_6px] opacity-40 transition-transform duration-[1200ms] ease-out-expo [mask-image:radial-gradient(circle_at_30%_35%,black,transparent_70%)] group-hover:scale-110'
		/>
		<span aria-hidden className='absolute top-1/3 left-(--gutter) -translate-y-1/2 text-[7rem] font-medium leading-none tracking-[-0.06em] text-ink/15'>
			{String(index + 1).padStart(2, '0')}
		</span>
		<span className='mono self-end border-b border-l bg-paper px-3 py-2'>{post.tag}</span>
		<span className='mono mt-auto px-(--gutter) pb-3 text-dim'>
			{formatPostDate(post.date)} · {post.readingMinutes} min
		</span>
		<span className='fill flex items-end justify-between gap-6 bg-plate px-(--gutter) pt-12 pb-5 text-lead tracking-[-0.03em] [--fill:var(--c-ink)] group-hover:text-paper group-hover:before:origin-left group-hover:before:scale-x-100'>
			<span className='line-clamp-2'>{post.title}</span>
			<ArrowIcon className='size-7' />
		</span>
	</Link>
);

export default PostCard;
