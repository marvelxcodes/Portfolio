import styles from './Section1.module.scss';

import ImportLocalFont from 'next/font/local';
import { Inter } from 'next/font/google';

const sfPro = ImportLocalFont({
	src: '../../fonts/SF-Pro.ttf',
});
const inter = Inter({
	subsets: ['latin'],
	weight: ['600', '700'],
});

export const Section1 = () => {
	return (
		<section className={styles.container}>
			<span className={styles.blur}></span>
			<h3 style={sfPro.style} className={styles.greeting}>
				Hey There! I&apos;m
			</h3>
			<h1 style={sfPro.style} className={styles.name}>
				Rama Krishnan
			</h1>
			<h4 style={sfPro.style} className={styles.about}>
				I&apos;m a
				<b className={styles.gradientText}>Full Stack Developer</b>and
				coding prodigy with expertise in React Ecosystem and Golang.
			</h4>
			<div className={styles.buttonContainer}>
				<button className={styles.hireMeButton}>Hire Me</button>
				<button className={styles.ResumeButton}>Resume</button>
			</div>
		</section>
	);
};
