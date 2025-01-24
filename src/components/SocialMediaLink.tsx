import Link from 'next/link';

type SocialMediaLinkProps = {
	name: string;
	href: string;
	color: string;
};

const SocialMediaLink = ({ name, color, href }: SocialMediaLinkProps) => {
	return <Link className='' href={href}>{name}</Link>;
};

export default SocialMediaLink;
