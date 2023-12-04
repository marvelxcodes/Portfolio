import Image from 'next/image';
import Link from 'next/link';

interface SocialIconProps {
	name: string;
	href: string;
	src: string;
}

const SocialIcon = ({ href, name, src }: SocialIconProps) => {
	return (
		<Link
			title={name}
			href={href}
		>
			<Image
				className='invert'
				height={20}
				width={20}
				src={src}
				alt={name}
			/>
		</Link>
	);
};

export default SocialIcon;
