import { cn } from '@/lib/utils';

type AnalogClockProps = { hours: number; minutes: number; className?: string };

const AnalogClock = ({ hours, minutes, className }: AnalogClockProps) => {
	const minuteAngle = minutes * 6;
	const hourAngle = (hours % 12) * 30 + minutes * 0.5;

	return (
		<svg viewBox='0 0 40 40' fill='none' stroke='currentColor' aria-hidden className={cn('size-10', className)}>
			<circle cx='20' cy='20' r='19' strokeWidth={1} />
			<line x1='20' y1='20' x2='20' y2='9' strokeWidth={1.2} style={{ transform: `rotate(${hourAngle}deg)`, transformOrigin: '20px 20px' }} />
			<line x1='20' y1='20' x2='20' y2='5' strokeWidth={1} style={{ transform: `rotate(${minuteAngle}deg)`, transformOrigin: '20px 20px' }} />
		</svg>
	);
};

export default AnalogClock;
