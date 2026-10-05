import { MARK_PATH } from '@/components/primitives/Mark';

export const OG_SIZE = { width: 1200, height: 630 };

type OgCardProps = { eyebrow: string; title: string; footer: string };

const INK = '#232323';
const PAPER = '#ffffff';
const PLATE = '#d9d9d9';

const OgCard = ({ eyebrow, title, footer }: OgCardProps) => (
	<div style={{ display: 'flex', width: '100%', height: '100%', background: PAPER, color: INK }}>
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, padding: 56, borderRight: `2px solid ${INK}` }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, letterSpacing: 1, textTransform: 'uppercase' }}>
				<div style={{ width: 12, height: 12, background: INK }} />
				{eyebrow}
			</div>
			<div style={{ display: 'flex', fontSize: title.length > 48 ? 64 : 80, lineHeight: 1, letterSpacing: -3, fontWeight: 500 }}>{title}</div>
			<div style={{ display: 'flex', fontSize: 24 }}>{footer}</div>
		</div>
		<div style={{ display: 'flex', flexDirection: 'column', width: 300 }}>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, background: INK }}>
				<svg width='150' height='100' viewBox='0 0 120 80' fill='none' stroke={PAPER} strokeWidth='10' strokeLinecap='round' strokeLinejoin='round'>
					<path d={MARK_PATH} />
				</svg>
			</div>
			<div
				style={{
					display: 'flex',
					flex: 1,
					background: PLATE,
					backgroundImage: `radial-gradient(${INK} 1.5px, transparent 2px)`,
					backgroundSize: '10px 10px'
				}}
			/>
		</div>
	</div>
);

export default OgCard;
