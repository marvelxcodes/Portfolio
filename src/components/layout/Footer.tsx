import Link from 'next/link';
import { clocks, footer, person, social } from '@/data/portfolio';
import ArrowIcon from '@/components/primitives/ArrowIcon';
import FooterClock from './FooterClock';
import SectionLinks from './SectionLinks';

const FOOTER_SOCIALS = social.slice(0, 3);

const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<footer className='relative z-10 border-t bg-paper lg:grid lg:h-[calc(100svh-var(--header-h))] lg:grid-cols-2 lg:grid-rows-[1fr_auto_1fr] lg:divide-x'>
			<p className='p-(--gutter) pb-16 text-title font-medium tracking-[-0.04em] lg:row-span-2'>{footer.tagline}</p>

			<div className='grid grid-cols-2 divide-x border-t lg:border-t-0'>
				<SectionLinks className='flex flex-col gap-2 p-(--gutter)' />
				<div className='flex flex-col gap-6 p-(--gutter)'>
					{clocks.map((clock) => (
						<FooterClock key={clock.city} clock={clock} />
					))}
				</div>
			</div>

			<div className='grid grid-cols-2 divide-x border-t lg:col-start-2'>
				<a href={`mailto:${person.email}`} className='fill truncate p-(--gutter) [--fill:var(--c-plate)]'>
					{person.email}
				</a>
				<ul className='flex flex-col divide-y'>
					{FOOTER_SOCIALS.map((link) => (
						<li key={link.label}>
							<a
								href={link.href}
								target='_blank'
								rel='noreferrer noopener'
								className='fill flex items-center justify-between px-(--gutter) py-2 [--fill:var(--c-plate)]'
							>
								{link.label}
								<ArrowIcon direction='up-right' className='size-4' />
							</a>
						</li>
					))}
				</ul>
			</div>

			<div className='flex min-h-[60svh] flex-col bg-ink text-paper lg:min-h-0'>
				<div className='flex flex-1 items-center justify-center p-(--gutter)'>
					<p className='text-[14vw] font-medium leading-none tracking-[-0.06em] lg:text-[7.4vw]'>{person.handle}</p>
				</div>
				<div className='mono flex flex-wrap justify-between gap-2 p-(--gutter)'>
					<p>
						© {year} {person.name}
					</p>
					<p>Built with Next.js · GSAP · WebGL</p>
				</div>
			</div>

			<Link
				href='/contact'
				className='fill fill-y group relative flex min-h-[50svh] flex-col justify-between bg-plate p-(--gutter) text-ink [--fill:var(--c-ink)] hover:text-paper lg:min-h-0'
			>
				<span className='max-w-[14ch] text-title font-medium tracking-[-0.04em]'>{footer.closer}</span>
				<span className='flex items-end justify-between'>
					<span>{footer.action}</span>
					<svg
						viewBox='0 0 120 120'
						fill='none'
						stroke='currentColor'
						strokeWidth={1}
						aria-hidden
						className='size-28 transition-transform duration-1000 ease-out-expo group-hover:-translate-y-3 group-hover:translate-x-3'
					>
						<path d='M2 118 118 2M118 2v116' />
					</svg>
				</span>
			</Link>
		</footer>
	);
};

export default Footer;
