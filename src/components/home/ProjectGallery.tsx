'use client';

import Image from 'next/image';
import { type CSSProperties, useState } from 'react';
import ArrowIcon from '@/components/primitives/ArrowIcon';
import RollingText from '@/components/primitives/RollingText';
import { pad, wrapIndex } from '@/lib/utils';

const VISIBLE_RANGE = 2;
const CARD_SPREAD_PERCENT = [0, 62, 112];
const CARD_DEPTH_PX = 170;
const CARD_TILT_DEG = 26;
const HIDDEN_DEPTH_PX = 700;
const DIM_PER_STEP = 0.28;

const signedOffset = (index: number, activeIndex: number, length: number) => {
	const forward = wrapIndex(index - activeIndex, length);
	return forward > length / 2 ? forward - length : forward;
};

const cardStyle = (offset: number): CSSProperties => {
	const distance = Math.abs(offset);

	if (distance > VISIBLE_RANGE) {
		return {
			transform: `translate(-50%, -50%) translateZ(-${HIDDEN_DEPTH_PX}px)`,
			opacity: 0,
			zIndex: 0,
			pointerEvents: 'none'
		};
	}

	const direction = Math.sign(offset);
	return {
		transform: `translate(-50%, -50%) translateX(${direction * CARD_SPREAD_PERCENT[distance]}%) translateZ(-${distance * CARD_DEPTH_PX}px) rotateY(${direction * CARD_TILT_DEG}deg)`,
		filter: `brightness(${1 - distance * DIM_PER_STEP})`,
		zIndex: VISIBLE_RANGE + 1 - distance
	};
};

type ProjectGalleryProps = {
	name: string;
	images: readonly string[];
};

const ProjectGallery = ({ name, images }: ProjectGalleryProps) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const step = (delta: number) => setActiveIndex((index) => wrapIndex(index + delta, images.length));

	return (
		<div className='flex min-h-0 flex-1 animate-[rise_0.9s_var(--ease-out)] flex-col gap-4'>
			<div className='relative -mx-(--gutter) min-h-56 flex-1 overflow-hidden [perspective:1200px]'>
				{images.map((src, index) => {
					const offset = signedOffset(index, activeIndex, images.length);
					return (
						<button
							key={src}
							type='button'
							tabIndex={Math.abs(offset) > VISIBLE_RANGE ? -1 : 0}
							aria-label={`Show ${name} screenshot ${index + 1}`}
							aria-current={offset === 0}
							onClick={() => setActiveIndex(index)}
							style={cardStyle(offset)}
							className='absolute top-1/2 left-1/2 aspect-[3/2] w-[56%] overflow-hidden border border-current/25 bg-black shadow-[0_30px_60px_-24px_rgb(0_0_0/0.7)] transition-[transform,filter,opacity] duration-[900ms] ease-out-expo [transform-style:preserve-3d]'
						>
							<Image
								src={src}
								alt={`${name} screenshot ${index + 1}`}
								fill
								sizes='(min-width: 1024px) 28vw, 56vw'
								className='object-cover object-top'
							/>
						</button>
					);
				})}
			</div>

			<div className='mono flex items-center justify-between'>
				<button
					type='button'
					aria-label='Previous screenshot'
					onClick={() => step(-1)}
					className='transition-opacity hover:opacity-60'
				>
					<ArrowIcon direction='left' />
				</button>
				<span className='flex items-center gap-1'>
					<RollingText value={pad(activeIndex + 1)} /> / {pad(images.length)}
				</span>
				<button
					type='button'
					aria-label='Next screenshot'
					onClick={() => step(1)}
					className='transition-opacity hover:opacity-60'
				>
					<ArrowIcon />
				</button>
			</div>
		</div>
	);
};

export default ProjectGallery;
