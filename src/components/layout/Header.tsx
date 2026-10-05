'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { person, sections } from '@/data/portfolio';
import Ticker from '@/components/primitives/Ticker';
import FillLink from '@/components/primitives/FillLink';
import Location from './Location';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';
import { useSectionHref } from './useSectionHref';
import { cn } from '@/lib/utils';

const MENU_LABELS = ['Menu', 'Close'];

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const closeMenu = useCallback(() => setMenuOpen(false), []);
	const sectionHref = useSectionHref();

	return (
		<>
			<header className='sticky inset-x-0 top-0 z-40 grid h-(--header-h) grid-cols-2 border-b bg-paper'>
				<div className='flex items-center'>
					<Link href='/' aria-label='Home' onClick={closeMenu} className='group flex size-(--header-h) shrink-0 items-center justify-center bg-ink text-paper'>
						<span className='text-lg font-medium tracking-[-0.06em] transition-transform duration-700 ease-out-expo group-hover:scale-110'>{person.initials}</span>
					</Link>
					<div className='flex flex-1 justify-center'>
						<Location />
					</div>
				</div>

				<div className='flex items-center lg:border-l'>
					<nav aria-label='Primary' className='hidden flex-1 items-center gap-4 pl-6 lg:flex'>
						{sections.map((section) => (
							<Link key={section.id} href={sectionHref(section.id)} className='transition-opacity duration-500 hover:opacity-50'>
								{section.label}
							</Link>
						))}
					</nav>
					<ThemeToggle className='mr-5 hidden lg:flex' />
					<FillLink href={`mailto:${person.email}`} arrow='up-right' className='hidden h-full w-50 px-5 lg:flex'>
						Contact
					</FillLink>

					<button
						type='button'
						aria-expanded={menuOpen}
						aria-controls='mobile-menu'
						onClick={() => setMenuOpen((open) => !open)}
						className='flex h-full flex-1 items-center justify-between bg-plate px-3 lg:hidden'
					>
						<Ticker items={MENU_LABELS} index={menuOpen ? 1 : 0} />
						<span className='sr-only'>{menuOpen ? 'Close menu' : 'Open menu'}</span>
						<span aria-hidden className='relative h-2.5 w-4'>
							<span className={cn('absolute inset-x-0 h-px bg-current transition-transform duration-700 ease-out-expo', menuOpen ? 'top-1/2 rotate-45' : 'top-0')} />
							<span className={cn('absolute inset-x-0 h-px bg-current transition-transform duration-700 ease-out-expo', menuOpen ? 'top-1/2 -rotate-45' : 'bottom-0')} />
						</span>
					</button>
				</div>
			</header>
			<MobileMenu open={menuOpen} onClose={closeMenu} />
		</>
	);
};

export default Header;
