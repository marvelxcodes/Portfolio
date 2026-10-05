import { cn } from '@/lib/utils';
import Ticker from './Ticker';

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const DIGIT_PATTERN = /\d/;

type RollingTextProps = {
	value: string;
	stagger?: number;
	className?: string;
};

const RollingText = ({ value, stagger = 0.05, className }: RollingTextProps) => (
	<span className={cn('inline-flex tabular-nums', className)}>
		<span className='sr-only'>{value}</span>
		{[...value].map((char, position) =>
			DIGIT_PATTERN.test(char) ? (
				<Ticker key={position} items={DIGITS} index={Number(char)} delay={position * stagger} />
			) : (
				<span key={position} aria-hidden className='whitespace-pre leading-[1.1em]'>
					{char}
				</span>
			)
		)}
	</span>
);

export const zeroDigits = (value: string) => value.replace(/\d/g, '0');

export default RollingText;
