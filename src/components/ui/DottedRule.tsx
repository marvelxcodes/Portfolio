import { cn } from '@/lib/utils';

/**
 * sui.io rules its footer with a 2px dashed SVG stroke (`stroke-dasharray="2 8"`)
 * rather than a solid hairline; it reads lighter at full width.
 */
const DottedRule = ({ className }: { className?: string }) => (
	<svg
		className={cn('h-0.5 w-full', className)}
		viewBox='0 0 1440 2'
		preserveAspectRatio='none'
		fill='none'
		aria-hidden
	>
		<path
			d='M0 1L1440 1'
			stroke='currentColor'
			strokeWidth={2}
			strokeDasharray='2 8'
			vectorEffect='non-scaling-stroke'
		/>
	</svg>
);

export default DottedRule;
