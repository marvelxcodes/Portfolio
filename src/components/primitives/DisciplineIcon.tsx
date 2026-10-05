import type { Discipline } from '@/data/portfolio';
import { cn } from '@/lib/utils';

const CENTER = 60;
const RADIUS = 54;
const BURST_RAYS = 48;
const RING_COUNT = 6;
const MERIDIAN_COUNT = 5;

const centered = { transformOrigin: `${CENTER}px ${CENTER}px`, transformBox: 'view-box' } as const;

const Rings = () => (
	<>
		{Array.from({ length: RING_COUNT }, (_, ring) => (
			<g key={ring} transform={`translate(${(ring - 2.5) * 6} 0)`}>
				<ellipse
					cx={CENTER}
					cy={CENTER}
					rx={RADIUS * 0.5}
					ry={RADIUS}
					className='animate-[breathe_5s_ease-in-out_infinite]'
					style={{ ...centered, animationDelay: `${-ring * 0.8}s` }}
				/>
			</g>
		))}
	</>
);

const Globe = () => (
	<>
		{Array.from({ length: MERIDIAN_COUNT }, (_, meridian) => (
			<ellipse
				key={meridian}
				cx={CENTER}
				cy={CENTER}
				rx={RADIUS}
				ry={RADIUS}
				className='animate-[breathe_6s_linear_infinite]'
				style={{ ...centered, animationDelay: `${(-meridian * 6) / MERIDIAN_COUNT}s` }}
			/>
		))}
		<path d={`M${CENTER - RADIUS} ${CENTER}h${RADIUS * 2}M14 34h92M14 86h92`} />
		<rect x={CENTER - RADIUS} y={CENTER - RADIUS} width={RADIUS * 2} height={RADIUS * 2} strokeDasharray='1 3' />
	</>
);

const Burst = () => (
	<g className='animate-[spin_40s_linear_infinite]' style={centered}>
		{Array.from({ length: BURST_RAYS }, (_, ray) => (
			<line
				key={ray}
				x1={CENTER}
				y1={CENTER - 6}
				x2={CENTER}
				y2={CENTER - (ray % 3 === 0 ? 46 : 32)}
				style={{ ...centered, transform: `rotate(${(ray * 360) / BURST_RAYS}deg)` }}
			/>
		))}
		<circle cx={CENTER} cy={CENTER} r={3} />
	</g>
);

const Orbit = () => (
	<>
		<circle cx={CENTER} cy={CENTER} r={2} fill='currentColor' />
		{[44, 50].map((radius, index) => (
			<g
				key={radius}
				className='animate-[orbit_9s_linear_infinite]'
				style={{ ...centered, animationDuration: `${9 + index * 4}s`, animationDirection: index ? 'reverse' : 'normal' }}
			>
				<circle cx={CENTER + index * 4} cy={CENTER} r={radius} />
				<rect x={CENTER + index * 4 - 2} y={CENTER - radius - 2} width={4} height={4} fill='currentColor' />
			</g>
		))}
	</>
);

const shapes = { rings: Rings, globe: Globe, burst: Burst, orbit: Orbit } as const;

const DisciplineIcon = ({ icon, className }: { icon: Discipline['icon']; className?: string }) => {
	const Shape = shapes[icon];
	return (
		<svg viewBox='0 0 120 120' fill='none' stroke='currentColor' strokeWidth={0.6} aria-hidden className={cn('size-44 overflow-visible', className)}>
			<circle cx={CENTER} cy={CENTER} r={RADIUS + 4} strokeDasharray='1 2.5' />
			<Shape />
		</svg>
	);
};

export default DisciplineIcon;
