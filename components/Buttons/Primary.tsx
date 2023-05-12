import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export type ButtonPropsType = {
	children: ReactNode;
	attributes: DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>;
};

export const Button = ({ children, ...attributes }: ButtonPropsType) => {
	return <button {...attributes}>{children}</button>;
};

export default Button;
