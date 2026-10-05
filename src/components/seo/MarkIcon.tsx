import { MARK_PATH } from '@/components/primitives/Mark';

const INK = '#232323';
const PAPER = '#ffffff';
const MARK_WIDTH_RATIO = 0.6;

const MarkIcon = ({ size }: { size: number }) => (
	<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: INK }}>
		<svg
			width={size * MARK_WIDTH_RATIO}
			viewBox='0 0 120 80'
			fill='none'
			stroke={PAPER}
			strokeWidth='10'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d={MARK_PATH} />
		</svg>
	</div>
);

export default MarkIcon;
