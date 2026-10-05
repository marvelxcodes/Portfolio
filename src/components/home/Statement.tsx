import { hero } from '@/data/portfolio';
import RevealLines from '@/components/primitives/RevealLines';

const Statement = () => (
	<section aria-label='Statement' className='relative z-10 grid lg:grid-cols-2'>
		<div className='flex min-h-[48svh] flex-col justify-end bg-ink px-(--gutter) pb-(--gutter) text-paper lg:min-h-[calc(var(--tile-h)*1.4)]'>
			<RevealLines trigger='scrub' lines={hero.statement} className='text-mega font-medium uppercase tracking-[-0.06em]' />
		</div>
	</section>
);

export default Statement;
