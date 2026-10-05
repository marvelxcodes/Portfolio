import type { SVGProps } from 'react';

export const MARK_PATH = 'M34 16 10 40l24 24M86 16l24 24-24 24M70 8 50 72';

const Mark = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox='0 0 120 80' fill='none' stroke='currentColor' strokeWidth={10} strokeLinecap='round' strokeLinejoin='round' aria-hidden {...props}>
		<path d={MARK_PATH} />
	</svg>
);

export default Mark;
