import type { PropsWithChildren } from 'react';
import Label from '@/components/primitives/Label';

type CalloutProps = PropsWithChildren<{ title?: string }>;

const Callout = ({ title = 'Note', children }: CalloutProps) => (
	<aside className='my-10 bg-ink p-(--gutter) text-paper [&_p]:my-0 [&_p]:text-paper/80'>
		<Label className='mb-4'>{title}</Label>
		{children}
	</aside>
);

export default Callout;
