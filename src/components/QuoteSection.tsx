import Container from './Container';
import { Satoshi } from '@/fonts';

type QuoteSectionProps = {
	children: string;
	author: string;
};

const QuoteSection = ({ author, children }: QuoteSectionProps) => {
	return (
		<Container
			className='space-y-6'
			style={Satoshi.style}
		>
			<blockquote
				style={Satoshi.style}
				className='text-4xl w-max flex relative flex-col'
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
					- Steve Jobs
				</span>
			</p>
		</Container>
	);
};

export default QuoteSection;
