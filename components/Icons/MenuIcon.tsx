import { SVGProps } from 'react';

export interface MenuIconPropsType extends SVGProps<SVGSVGElement> {
	isOpen: boolean;
}

const MenuIcon = ({ isOpen, ...attributes }: MenuIconPropsType) => {
	return (
		<>
			{isOpen ? (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					{...attributes}
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M6 18L18 6M6 6l12 12'
					/>
				</svg>
			) : (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					{...attributes}
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25'
					/>
				</svg>
			)}
		</>
	);
};

export default MenuIcon;
