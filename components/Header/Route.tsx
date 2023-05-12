import { ReactNode } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ImportLocalFont from 'next/font/local';

export type RoutePropsType = {
	href: string;
	children: ReactNode;
};

const sfPro = ImportLocalFont({
	src: '../../fonts/SF-Pro.ttf',
});

const Route = ({ children, href }: RoutePropsType) => {
	const { asPath } = useRouter();
	const isCurrentRoute = asPath === href;
	return (
		<Link
			style={sfPro.style}
			className={isCurrentRoute ? styles.route : styles.currentRoute}
			href={href}
		>
			{children}
		</Link>
	);
};

export default Route;
