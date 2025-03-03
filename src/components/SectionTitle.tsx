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
	return (
		<motion.div
			className='max-w-full mx-auto py-3 w-max'
			style={coolvetica.style}
		>
			<motion.h1
				initial={{
					opacity: 0,
					translateX: -200
				}}
				whileInView={{
					opacity: 1,
					translateX: 0
				}}
				className='text-4xl -ml-32 inline-block md:text-6xl text-white'
				transition={{
					repeat: 0
				}}
			>
				{textLeft}
			</motion.h1>
			<motion.h1
				initial={{
					opacity: 0,
					translateX: 200
				}}
				whileInView={{
					opacity: 1,
					translateX: 0
				}}
				transition={{
					repeat: 0
				}}
				className='text-4xl -mr-32 text-right font-medium md:text-8xl text-white'
			>
				{textRight}
			</motion.h1>
		</motion.div>
	);
};

export default SectionTitle;
