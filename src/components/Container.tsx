import { cn } from '@/utils/cn';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

const Container = ({
	className,
	...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
	return (
		<section
			className={cn("p-10 container mx-auto",className)}
			{...props}
		/>
	);
};

export default Container;
