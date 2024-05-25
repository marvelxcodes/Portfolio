'use client';
import { useInView } from 'framer-motion';
import Container from './Container';
import { Satoshi } from '@/fonts';
import { useRef } from 'react';
import { motion } from 'framer-motion';

type QuoteSectionProps = {
	children: string;
	author: string;
};

const QuoteSection = ({ author, children }: QuoteSectionProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(containerRef);

	return (
		<Container
			ref={containerRef}
			className='space-y-6 text-white'
			style={Satoshi.style}
		>
			<motion.div
				initial={{
					opacity: 0,
					rotateX: 90
				}}
				whileInView={{
					opacity: 1,
					rotateX: 0
				}}
				transition={{
					velocity: 0.1
				}}
			>
				<blockquote
					style={Satoshi.style}
					className='text-4xl flex relative flex-col'
				>
					&quot;{children}&quot;
				</blockquote>
				<p className='text-xl font-medium'>
					This philosophy is what drives the Dev in myself.
					<span
						className='glow-effect text-2xl
					'
					>
						{' '}
						- {author}
					</span>
				</p>
			</motion.div>
		</Container>
	);
};

export default QuoteSection;
