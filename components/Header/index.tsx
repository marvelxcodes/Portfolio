import styles from './styles.module.scss';
import { PropsWithChildren, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Inter } from 'next/font/google';
import Link from 'next/link';
import MenuIcon from '../Icons/MenuIcon';

const inter = Inter({
	subsets: ['latin'],
	weight: '800',
});

const Header = ({ children }: PropsWithChildren) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<AnimatePresence>
			<header className={styles.container}>
				<h3 className={styles.title} style={inter.style}>
					MarvelXCodes
				</h3>
				<nav
					className={
						isOpen
							? styles.routesContainerOpen
							: styles.routesContainerClosed
					}
				>
					{children}
					<Link href='https://www.fiverr.com/s/db1Z36'>
						<button className={styles.hireMeButton}>Hire Me</button>
					</Link>
				</nav>
				<MenuIcon
					isOpen={isOpen}
					onClick={() => setIsOpen((state) => !state)}
					className={styles.menuIcon}
				/>
			</header>
		</AnimatePresence>
	);
};

export default Header;
