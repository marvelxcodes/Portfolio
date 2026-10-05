'use client';

import { useEffect, useState } from 'react';
import type { PostHeading } from '@/lib/blog';
import Label from '@/components/primitives/Label';
import { cn } from '@/lib/utils';

const ACTIVE_BAND = '-20% 0px -70% 0px';

const TableOfContents = ({ headings }: { headings: PostHeading[] }) => {
	const [activeId, setActiveId] = useState(headings[0]?.id ?? '');

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.find((entry) => entry.isIntersecting);
				if (visible) setActiveId(visible.target.id);
			},
			{ rootMargin: ACTIVE_BAND }
		);
		headings.forEach(({ id }) => {
			const element = document.getElementById(id);
			if (element) observer.observe(element);
		});
		return () => observer.disconnect();
	}, [headings]);

	if (headings.length === 0) return null;

	return (
		<nav aria-label='Table of contents' className='flex flex-col gap-5'>
			<Label>Contents</Label>
			<ol className='flex flex-col gap-2'>
				{headings.map((heading) => (
					<li key={heading.id} className={cn(heading.depth === 3 && 'pl-4')}>
						<a
							href={`#${heading.id}`}
							aria-current={activeId === heading.id ? 'location' : undefined}
							className={cn(
								'flex items-start gap-2 transition-opacity duration-500 hover:opacity-100',
								activeId === heading.id ? 'opacity-100' : 'opacity-40'
							)}
						>
							<span
								aria-hidden
								className={cn(
									'mt-[0.55em] size-1.5 shrink-0 bg-current transition-transform duration-500 ease-out-expo',
									activeId === heading.id ? 'scale-100' : 'scale-0'
								)}
							/>
							{heading.text}
						</a>
					</li>
				))}
			</ol>
		</nav>
	);
};

export default TableOfContents;
