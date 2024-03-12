'use client';

import { coolvetica } from '@/fonts';
import { cn } from '@/utils/cn';
import {
	useInView,
	useMotionValueEvent,
	useScroll,
	motion,
	useSpring,
	useMotionValue
} from 'framer-motion';
import { useEffect, useRef } from 'react';

type SectionTitleProps = {
	textLeft: string;
	textRight: string;
};

const SectionTitle = ({ textLeft, textRight }: SectionTitleProps) => {
	const textContainerRef = useRef<HTMLDivElement>(null);
	const {} = useInView(textContainerRef, {});
	const { scrollYProgress } = useScroll({
		target: textContainerRef,
		smooth: 10
	});

	const translateX = useSpring(scrollYProgress, {
		damping: 0.05
	});
	return (
		<motion.div
			style={coolvetica.style}
			ref={textContainerRef}
		>
			<motion.h1
				translate='yes'
				style={{
					translateX
				}}
				// initial={{
				// 	opacity: 0,
				// 	translateX: -100
				// }}
				// whileInView={{
				// 	opacity: 1,
				// 	translateX: 0
				// }}
				className='text-4xl relative transition-transform inline-block md:text-6xl text-white'
			>
				{textLeft}
			</motion.h1>
			<motion.h1 className='text-4xl text-right font-medium md:text-8xl text-white'>
				{textRight}
			</motion.h1>
		</motion.div>
	);
};

export default SectionTitle;
