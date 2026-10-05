import { notFound as copy } from '@/data/portfolio';
import FillLink from '@/components/primitives/FillLink';
import Label from '@/components/primitives/Label';

const NotFound = () => (
	<main className='relative z-10 grid min-h-[calc(100svh-var(--header-h))] lg:grid-cols-2'>
		<div className='tile flex flex-col justify-between gap-16 border-b p-(--gutter) lg:border-r lg:border-b-0'>
			<Label>{copy.label}</Label>
			<div className='flex flex-col gap-8'>
				<h1 className='text-mega font-medium uppercase tracking-[-0.06em]'>{copy.heading}</h1>
				<p className='max-w-[42ch]'>{copy.body}</p>
				<FillLink href='/' className='mono w-60 px-3 py-2.5'>
					{copy.cta}
				</FillLink>
			</div>
		</div>
		<div className='min-h-60' />
	</main>
);

export default NotFound;
