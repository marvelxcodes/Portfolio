import { expertise } from '@/data/portfolio';
import DisciplineIcon from '@/components/primitives/DisciplineIcon';
import FillLink from '@/components/primitives/FillLink';
import RevealLines from '@/components/primitives/RevealLines';
import { pad } from '@/lib/utils';

const HEADING_ALIGNMENT = ['', 'text-right', ''];

const Expertise = () => (
	<section id='expertise' className='relative z-10 grid scroll-mt-(--header-h) border-t lg:grid-cols-2 lg:divide-x'>
		<div className='bg-plate'>
			<div className='flex flex-col justify-between gap-16 p-(--gutter) lg:sticky lg:top-(--header-h) lg:h-[calc(100svh-var(--header-h))]'>
				<RevealLines
					lines={expertise.heading}
					className='text-mega font-medium uppercase tracking-[-0.06em]'
					lineClassNames={HEADING_ALIGNMENT}
				/>
				<div className='flex flex-col gap-12 sm:pl-[50%]'>
					<p>{expertise.body}</p>
					<FillLink href='/contact' className='mono w-50 px-3 py-2.5'>
						{expertise.cta}
					</FillLink>
				</div>
			</div>
		</div>

		<ul className='divide-y divide-paper/15 bg-ink text-paper'>
			{expertise.disciplines.map((discipline, index) => (
				<li
					key={discipline.title}
					className='grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-10 px-(--gutter) py-10 lg:min-h-[calc(var(--tile-h)+2rem)] lg:grid-cols-[2.5rem_1fr_1fr] lg:grid-rows-[auto_1fr]'
				>
					<span className='mono pt-1.5 text-paper/50'>{pad(index + 1)}</span>
					<h3 className='max-w-[12ch] text-title'>{discipline.title}</h3>
					<p className='col-start-2 lg:col-start-3 lg:row-start-1'>{discipline.body}</p>
					<DisciplineIcon icon={discipline.icon} className='col-start-2 self-end lg:row-start-2' />
					<ul className='mono col-start-2 flex flex-col gap-1 self-end lg:col-start-3 lg:row-start-2'>
						{discipline.focus.map((item) => (
							<li key={item} className='flex items-center gap-2'>
								<span aria-hidden className='size-2 shrink-0 bg-paper' />
								{item}
							</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	</section>
);

export default Expertise;
