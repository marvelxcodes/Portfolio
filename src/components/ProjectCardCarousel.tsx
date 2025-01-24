'use client';

import Image from 'next/image';
import { useState } from 'react';

type ProjectCardCarouselProps = {
	name: string;
	imageUrls: string[];
};

const ProjectCardCarousel = ({ name, imageUrls }: ProjectCardCarouselProps) => {
	const [currentSlide, setCurrentSlide] = useState(imageUrls[0]);
	return (
		<div className='flex'>
			{imageUrls.map((url) => (
				<div
					className='w-full'
					style={{
						display: currentSlide !== url ? 'none' : 'block'
					}}
					key={url}
				>
					<Image
						src={url}
						alt={name}
						height={600}
						width={600}
					/>
				</div>
			))}
		</div>
	);
};

export default ProjectCardCarousel;
