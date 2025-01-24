'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type SlideInProps = {
	children: ReactNode;
	from?: 'left' | 'right';
};

const SlideIn = ({ from = 'left', children }: SlideInProps) => {
	return (
		<motion.div
      className='h-max'
			initial={{
				translateX: from === 'left' ? -100 : 100,
				opacity: 0
			}}
			whileInView={{
				translateX: 0,
				opacity: 1
			}}
			transition={{
				velocity: 0.1
			}}
		>
			{children}
		</motion.div>
	);
};

export default SlideIn;
