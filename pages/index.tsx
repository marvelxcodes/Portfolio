import Image from 'next/image';
import styles from '@/styles/Home.module.scss';
import ImportLocalFont from 'next/font/local';
import Header from '@/components/Header';
import { Section1, Section2 } from '@/components/Home';
import Route from '@/components/Header/Route';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

const SFPro = ImportLocalFont({
	src: '../fonts/SF-Pro.ttf',
});

export default function Home() {
	return (
		<>
			<Header>
				<Route href='/expertise'>Expertise</Route>
				<Route href='/projects'>Projects</Route>
				<Route href='/journey'>Journey</Route>
			</Header>
			<Parallax pages={2} className={styles.container}>
				<ParallaxLayer speed={1.5} offset={0}>
					<Section1 />
				</ParallaxLayer>
				<ParallaxLayer speed={5} offset={1}>
					<Section1 />
					{/* <Section2 /> */}
				</ParallaxLayer>
			</Parallax>
		</>
	);
}
