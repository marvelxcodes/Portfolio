import { cn } from '@/lib/utils';

type ChapterProps = {
	index: string;
	total?: string;
	title: string;
	className?: string;
};

/** Section marker: a dot eyebrow on the left, the running count on the right. */
const Chapter = ({ index, total, title, className }: ChapterProps) => (
	<div
		className={cn(
			'flex items-center justify-between gap-6 border-b border-current/15 pb-5',
			className
		)}
	>
		<p className='eyebrow'>
			<span className='eyebrow-word'>{title}</span>
		</p>
		<p className='font-mono text-xs tabular-nums tracking-wider opacity-55'>
			{index}
			{total && <span className='opacity-60'> / {total}</span>}
		</p>
	</div>
);

export default Chapter;
