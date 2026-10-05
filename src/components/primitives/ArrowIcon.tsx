import { cn } from '@/lib/utils';

type ArrowIconProps = {
	direction?: 'right' | 'left' | 'up-right';
	className?: string;
};

const rotation = { right: '', left: 'rotate-180', 'up-right': '-rotate-45' } as const;

const ArrowIcon = ({ direction = 'right', className }: ArrowIconProps) => (
	<svg
		viewBox='0 0 20 20'
		fill='none'
		stroke='currentColor'
		strokeWidth={1.4}
		aria-hidden
		className={cn('size-5 shrink-0', rotation[direction], className)}
	>
		<path d='M2 10h15M11 4l6 6-6 6' />
	</svg>
);

export default ArrowIcon;
