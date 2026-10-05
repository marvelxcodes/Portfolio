import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import ArrowIcon from './ArrowIcon';

export const fillVariants = {
	ink: 'bg-ink text-paper [--fill:var(--c-plate)] hover:text-ink focus-visible:text-ink',
	plate: 'bg-plate text-ink [--fill:var(--c-ink)] hover:text-paper focus-visible:text-paper',
	paper: 'bg-paper text-ink [--fill:var(--c-ink)] hover:text-paper focus-visible:text-paper'
} as const;

export type FillVariant = keyof typeof fillVariants;

type FillLinkProps = Omit<ComponentProps<typeof Link>, 'children'> & {
	children: ReactNode;
	variant?: FillVariant;
	arrow?: 'right' | 'up-right';
};

const isExternal = (href: FillLinkProps['href']) => typeof href === 'string' && /^(https?:|mailto:)/.test(href);

const FillLink = ({ children, variant = 'ink', arrow = 'right', className, href, ...props }: FillLinkProps) => (
	<Link
		href={href}
		{...(isExternal(href) && { target: '_blank', rel: 'noreferrer noopener' })}
		{...props}
		className={cn('fill group flex items-center justify-between gap-6', fillVariants[variant], className)}
	>
		{children}
		<ArrowIcon
			direction={arrow}
			className='transition-transform duration-700 ease-out-expo group-hover:translate-x-1'
		/>
	</Link>
);

export default FillLink;
