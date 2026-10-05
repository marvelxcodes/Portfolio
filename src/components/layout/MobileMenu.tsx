'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { clocks, person, sections } from '@/data/portfolio';
import { parseClockTime, useZonedTime } from '@/hooks/useZonedTime';
import AnalogClock from '@/components/primitives/AnalogClock';
import ThemeToggle from './ThemeToggle';
import { useSectionHref } from './useSectionHref';
import { cn } from '@/lib/utils';

type MobileMenuProps = { open: boolean; onClose: () => void };

const MenuClock = ({ clock }: { clock: (typeof clocks)[number] }) => {
	const { hours, minutes } = parseClockTime(useZonedTime(clock.timeZone));
	return (
		<div className='flex items-center justify-center gap-3 border-r py-4 text-sm font-medium'>
			<AnalogClock hours={hours} minutes={minutes} className='size-8' />
			{clock.city}
		</div>
	);
};

const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
	const sectionHref = useSectionHref();
	const items = [...sections.map((section) => ({ label: section.label, href: sectionHref(section.id) })), { label: 'Contact', href: `mailto:${person.email}` }];

	useEffect(() => {
		if (!open) return;
		const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
		document.documentElement.style.overflow = 'hidden';
		window.addEventListener('keydown', onKey);
		return () => {
			document.documentElement.style.overflow = '';
			window.removeEventListener('keydown', onKey);
		};
	}, [open, onClose]);

	return (
		<nav
			id='mobile-menu'
			aria-hidden={!open}
			inert={!open}
			className={cn(
				'fixed inset-x-0 bottom-0 top-(--header-h) z-30 flex flex-col bg-paper transition-[clip-path] duration-1000 ease-out-expo lg:hidden',
				open ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(0_0_100%_0)]'
			)}
		>
			<ul className='flex flex-1 flex-col'>
				{items.map((item, index) => (
					<li key={item.label} className='flex flex-1 border-b'>
						<Link
							href={item.href}
							onClick={onClose}
							className='fill fill-y flex w-full items-end overflow-hidden px-3 pb-3 text-[2rem] font-medium tracking-[-0.04em] [--fill:var(--c-plate)]'
						>
							<span
								className={cn('block transition-transform duration-1000 ease-out-expo', open ? 'translate-y-0' : 'translate-y-full')}
								style={{ transitionDelay: open ? `${0.15 + index * 0.05}s` : '0s' }}
							>
								{item.label}
							</span>
						</Link>
					</li>
				))}
			</ul>
			<div className='grid grid-cols-3'>
				{clocks.map((clock) => (
					<MenuClock key={clock.city} clock={clock} />
				))}
				<ThemeToggle className='h-auto w-full' />
			</div>
		</nav>
	);
};

export default MobileMenu;
