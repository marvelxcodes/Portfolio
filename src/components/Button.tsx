import { cn } from '@/utils/cn';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { coolvetica } from '@/fonts';

const Button = ({
	className,
	...props
}: DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>) => {
	return (
		<button
			style={coolvetica.style}
			className={cn(
				'text-xl bg-white inline-flex gap-x-3 text-black px-8 rounded-full tracking-wider hover:scale-105 transition-transform py-3',
				className
			)}
			{...props}
		/>
	);
};

export default Button;
