import DisciplineIcon from '@/components/primitives/DisciplineIcon';
import FillLink from '@/components/primitives/FillLink';
import RevealLines from '@/components/primitives/RevealLines';
import { expertise, mailtoHref } from '@/data/portfolio';

const HEADING_ALIGNMENT = ['', 'text-right', ''];

const Expertise = () => (
	<section id='expertise' className='relative z-10 grid scroll-mt-(--header-h) border-t lg:grid-cols-2 lg:divide-x'>
		<div className='bg-plate'>
			<div className='flex flex-col justify-between px-8 gap-16 p-(--gutter) lg:sticky lg:top-(--header-h) lg:h-[calc(100svh-var(--header-h))]'>
				<RevealLines
					lines={expertise.heading}
					className='text-6xl font-medium tracking-[-0.06em]'
					lineClassNames={HEADING_ALIGNMENT}
				/>
				<div className='flex flex-col gap-12'>
					<p className='text-4xl'>{expertise.body}</p>
					<FillLink href={mailtoHref} className='mono w-50 px-3 py-2.5'>
						{expertise.cta}
					</FillLink>
				</div>
			</div>
		</div>

		<ul className='divide-y divide-paper/15 bg-ink text-paper'>
			{expertise.disciplines.map((discipline) => (
				<li
					key={discipline.title}
					className='grid gap-x-8 gap-y-10 p-12 lg:min-h-[calc(var(--tile-h)+2rem)] lg:grid-cols-2 lg:grid-rows-[auto_1fr]'
				>
					<h3 className='text-title max-w-xl'>{discipline.title}</h3>
					<p>{discipline.body}</p>
					<DisciplineIcon icon={discipline.icon} className='self-end' />
					<ul className='mono flex flex-col gap-1 self-end'>
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
