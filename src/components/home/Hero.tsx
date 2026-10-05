import Image from 'next/image';
import { hero, person, stackIcons } from '@/data/portfolio';
import RevealLines from '@/components/primitives/RevealLines';
import FillLink from '@/components/primitives/FillLink';
import Marquee from '@/components/primitives/Marquee';

const nameClass = 'text-name font-medium tracking-[-0.06em]';
const highlightClass = 'border bg-paper px-3 py-1 box-decoration-clone';

const Hero = () => (
	<section aria-label='Introduction' className='relative z-10 grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-[repeat(2,var(--tile-h))]'>
		<h1 className='sr-only'>
			{person.name} — {person.role} in {person.location}
		</h1>
		<div aria-hidden className='tile flex h-[34svh] items-end justify-end border-b border-r px-(--gutter) pb-[0.12em] lg:col-span-2 lg:h-auto'>
			<RevealLines as='p' trigger='load' lines={[person.firstName]} className={nameClass} />
		</div>
		<div aria-hidden className='flex h-[34svh] items-end border-b bg-ink px-(--gutter) text-paper pb-[0.12em] lg:col-span-2 lg:h-auto'>
			<RevealLines as='p' trigger='load' delay={0.12} lines={[person.lastName]} className={nameClass} />
		</div>

		<div className='col-span-2 flex flex-col gap-10 bg-ink px-(--gutter) pt-5 pb-(--gutter) text-paper lg:col-span-1 lg:col-start-1 lg:row-start-2 lg:border-r'>
			<p className='text-lead'>{hero.intro}</p>
			<FillLink href='/contact' className='mono mt-auto -mx-2 px-3 py-2.5'>
				{hero.cta}
			</FillLink>
		</div>

		<figure className='col-span-2 flex flex-col justify-between gap-10 border-b px-(--gutter) pt-5 pb-(--gutter) lg:col-start-2 lg:row-start-2 lg:border-b-0'>
			<blockquote className='text-quote leading-[calc(1.26em+1rem+2px)] tracking-[-0.045em]'>
				<span className={highlightClass}>“{hero.quote.text}”</span>
			</blockquote>
			<figcaption className='mono'>
				<span className={highlightClass}>— {hero.quote.author}</span>
			</figcaption>
		</figure>

		<div className='col-span-2 flex min-h-[44svh] flex-col overflow-hidden bg-haze pt-5 lg:col-span-1 lg:col-start-4 lg:row-start-2 lg:min-h-0'>
			<p className='px-(--gutter) text-lead'>{hero.pitch}</p>
			<p className='mt-8 px-(--gutter) text-lead'>{hero.stackLabel}</p>
			<Marquee className='mt-auto pb-(--gutter)'>
				{stackIcons.map((icon) => (
					<span key={icon.name} className='flex items-center gap-2 px-5 text-lg font-semibold tracking-[-0.03em]'>
						<Image src={icon.src} alt='' width={26} height={26} className='size-6.5 object-contain grayscale contrast-125' />
						{icon.name}
					</span>
				))}
			</Marquee>
		</div>
	</section>
);

export default Hero;
