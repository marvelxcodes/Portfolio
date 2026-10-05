import { cn } from '@/lib/utils';

type TickerProps = {
	items: readonly string[];
	index: number;
	delay?: number;
	className?: string;
};

const Ticker = ({ items, index, delay = 0, className }: TickerProps) => (
	<span aria-hidden className={cn('inline-block h-[1.1em] overflow-hidden align-top leading-[1.1em]', className)}>
		<span
			className='flex flex-col transition-transform duration-[1200ms] ease-out-expo'
			style={{ transform: `translateY(${-index * 1.1}em)`, transitionDelay: `${delay}s` }}
		>
			{items.map((item) => (
				<span key={item} className='block h-[1.1em] whitespace-pre'>
					{item}
				</span>
			))}
		</span>
	</span>
);

export default Ticker;
