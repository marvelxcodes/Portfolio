'use client';

import { cn } from '@/lib/utils';
import { THEME_KEY } from '@/lib/theme';

const toggleTheme = () => {
	const root = document.documentElement;
	const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
	root.dataset.theme = next;
	try {
		localStorage.setItem(THEME_KEY, next);
	} catch {}
};

const ThemeToggle = ({ className }: { className?: string }) => (
	<button
		type='button'
		onClick={toggleTheme}
		aria-label='Toggle colour theme'
		className={cn('group relative flex h-10 w-12 items-center justify-center', className)}
	>
		<span className='relative h-3 w-6'>
			<span className='absolute left-0 top-0 size-3 rounded-full border border-current transition-transform duration-700 ease-out-expo dark:translate-x-3' />
			<span className='absolute right-0 top-0 size-3 rounded-full bg-current transition-transform duration-700 ease-out-expo group-hover:-translate-x-1 dark:-translate-x-3' />
		</span>
	</button>
);

export default ThemeToggle;
