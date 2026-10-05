import Image from 'next/image';

type FigureProps = {
	src: string;
	alt: string;
	width: number;
	height: number;
	caption?: string;
};

const Figure = ({ src, alt, width, height, caption }: FigureProps) => (
	<figure className='my-10 border bg-haze'>
		<Image src={src} alt={alt} width={width} height={height} sizes='(min-width: 1024px) 50vw, 100vw' className='h-auto w-full' />
		{caption && <figcaption className='mono border-t p-3 text-dim'>{caption}</figcaption>}
	</figure>
);

export default Figure;
