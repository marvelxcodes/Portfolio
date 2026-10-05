import Link from 'next/link';

const NotFound = () => (
	<main className='relative z-10 flex min-h-svh flex-col items-center justify-center gap-8 px-[var(--site-margin)] text-center'>
		<p className='font-mono text-xs uppercase tracking-wider text-peach-500'>
			4 0 4 / Off the map
		</p>
		<h1 className='display max-w-[14ch] text-display text-stone-900'>
			This page never shipped.
		</h1>
		<p className='max-w-[44ch] text-base leading-relaxed text-stone-500'>
			The link is broken or the page moved. Either way, the work is back this way.
		</p>
		<Link href='/' className='btn btn-peach'>
			Back to the story
			<span aria-hidden>↗</span>
		</Link>
	</main>
);

export default NotFound;
