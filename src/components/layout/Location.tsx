import { person } from '@/data/portfolio';

const [city, country] = person.location.split(', ');

const Location = () => (
	<address className='flex items-center gap-1.5 whitespace-nowrap text-sm not-italic leading-none'>
		<svg viewBox='0 0 20 20' fill='none' stroke='currentColor' strokeWidth={1.4} aria-hidden className='size-4 shrink-0'>
			<path d='M10 18s6-5.2 6-10a6 6 0 0 0-12 0c0 4.8 6 10 6 10Z' />
			<circle cx={10} cy={8} r={2.2} />
		</svg>
		<span>
			{city}
			<span className='max-sm:sr-only'>, {country}</span>
		</span>
	</address>
);

export default Location;
