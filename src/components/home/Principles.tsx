'use client';

import Image from 'next/image';
import { useState } from 'react';
import { principles } from '@/data/portfolio';
import ArrowIcon from '@/components/primitives/ArrowIcon';
import Label from '@/components/primitives/Label';
import RollingText from '@/components/primitives/RollingText';
import QuoteText from './QuoteText';
import { pad, wrapIndex } from '@/lib/utils';

const AUTOPLAY_SECONDS = 9;
const items = principles.items;

const Principles = () => {
	const [index, setIndex] = useState(0);
	const step = (direction: 1 | -1) => setIndex((current) => wrapIndex(current + direction, items.length));
	const current = items[index] ?? items[0];

	return (
		<section
			id='principles'
			aria-roledescription='carousel'
			className='group/principles relative z-10 grid scroll-mt-(--header-h) border-t lg:h-[calc(100svh-var(--header-h))] lg:grid-cols-4'
		>
			<div className='flex flex-col bg-paper lg:border-r'>
				<div className='flex justify-between gap-6 p-(--gutter) lg:flex-1 lg:flex-col'>
					<Label>{principles.label}</Label>
					<p className='mono flex items-center gap-1 text-dim'>
						<RollingText value={pad(index + 1)} /> - {pad(items.length)}
					</p>
				</div>

				<div className='relative order-last grid h-(--header-h) grid-cols-2 divide-x border-t lg:order-none'>
					<span
						key={index}
						aria-hidden
						onAnimationEnd={() => step(1)}
						className='absolute -top-px left-0 h-0.5 w-full origin-left animate-[grow_linear] bg-ink group-hover/principles:[animation-play-state:paused] motion-reduce:hidden'
						style={{ animationDuration: `${AUTOPLAY_SECONDS}s` }}
					/>
					<button type='button' aria-label='Previous principle' onClick={() => step(-1)} className='fill flex items-center justify-center [--fill:var(--c-plate)]'>
						<ArrowIcon direction='left' />
					</button>
					<button type='button' aria-label='Next principle' onClick={() => step(1)} className='fill flex items-center justify-center [--fill:var(--c-plate)]'>
						<ArrowIcon />
					</button>
				</div>

				<div className='relative hidden aspect-[4/5] border-t lg:block lg:aspect-auto lg:h-[42%]'>
					<Image src={principles.portrait} alt='Portrait of Rama Krishnan' fill sizes='25vw' className='object-cover grayscale' />
				</div>
			</div>

			<div aria-live='polite' className='flex flex-col gap-8 border-t bg-paper p-(--gutter) lg:col-span-2 lg:border-t-0 lg:pr-[8%]'>
				<span aria-hidden className='text-title font-semibold leading-none'>
					“
				</span>
				<QuoteText text={current.body} />
			</div>

			<div className='flex flex-col border-t lg:border-t-0 lg:border-l'>
				<dl className='flex flex-col gap-5 bg-ink p-(--gutter) text-paper lg:flex-1'>
					<div>
						<dt className='font-medium'>Principle</dt>
						<dd key={current.lead} className='mono mt-1 animate-[rise_0.8s_var(--ease-out)] text-paper/60'>
							{current.lead}
						</dd>
					</div>
					<div>
						<dt className='font-medium'>Applies to</dt>
						<dd key={current.scope} className='mono mt-1 animate-[rise_0.9s_var(--ease-out)] text-paper/60'>
							{current.scope}
						</dd>
					</div>
				</dl>
				<div className='hidden h-[28%] lg:block' />
			</div>
		</section>
	);
};

export default Principles;
