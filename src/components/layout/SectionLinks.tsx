'use client';

import Link from 'next/link';
import { sections } from '@/data/portfolio';
import { useSectionHref } from './useSectionHref';

const SectionLinks = ({ className }: { className?: string }) => {
	const sectionHref = useSectionHref();
	return (
		<ul className={className}>
			{sections.map((section) => (
				<li key={section.id}>
					<Link href={sectionHref(section.id)} className='transition-opacity duration-500 hover:opacity-50'>
						{section.label}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default SectionLinks;
