'use client';

import { usePathname } from 'next/navigation';

export const useSectionHref = () => {
	const onHome = usePathname() === '/';
	return (id: string) => (onHome ? `#${id}` : `/#${id}`);
};
