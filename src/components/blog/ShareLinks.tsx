import { person } from '@/data/portfolio';
import ArrowIcon from '@/components/primitives/ArrowIcon';
import Label from '@/components/primitives/Label';

type ShareLinksProps = { title: string; url: string };

const ShareLinks = ({ title, url }: ShareLinksProps) => {
	const encodedUrl = encodeURIComponent(url);
	const targets = [
		{ label: 'X', href: `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodedUrl}&via=${person.handle}` },
		{ label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
		{ label: 'RSS', href: '/blog/rss.xml' }
	];

	return (
		<div className='flex flex-col gap-5'>
			<Label>Share</Label>
			<ul className='flex flex-col divide-y border-y'>
				{targets.map((target) => (
					<li key={target.label}>
						<a
							href={target.href}
							target='_blank'
							rel='noreferrer noopener'
							className='fill flex items-center justify-between py-2 [--fill:var(--c-plate)]'
						>
							{target.label}
							<ArrowIcon direction='up-right' className='size-4' />
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ShareLinks;
