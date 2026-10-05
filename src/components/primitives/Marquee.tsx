import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type MarqueeProps = {
	children: ReactNode;
	seconds?: number;
	className?: string;
};

const Marquee = ({ children, seconds = 28, className }: MarqueeProps) => (
	<div className={cn('overflow-hidden', className)}>
		<div
			className='flex w-max animate-[marquee_linear_infinite] hover:[animation-play-state:paused]'
			style={{ animationDuration: `${seconds}s` }}
		>
			<div className='flex shrink-0 items-center'>{children}</div>
			<div aria-hidden className='flex shrink-0 items-center'>
				{children}
			</div>
		</div>
	</div>
);

export default Marquee;
