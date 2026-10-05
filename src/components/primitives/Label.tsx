import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

const Label = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
	<p className={cn('mono flex items-center gap-3', className)}>
		<span aria-hidden className='size-2 bg-current' />
		{children}
	</p>
);

export default Label;
