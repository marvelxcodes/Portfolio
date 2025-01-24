import { cn } from '@/utils/cn';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import {} from '@/fonts';

const Button = ({
	className,
	...props
}: DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>) => {
	return (
		<button
			className={cn(
				'text-lg font-medium bg-white inline-flex hover:bg-neutral-300 transition-colors gap-x-3 text-black px-8 rounded-full py-3',
				className
			)}
			{...props}
		/>
	);
};

export default Button;
