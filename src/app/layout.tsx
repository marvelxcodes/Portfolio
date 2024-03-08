import './globals.scss';
import '@/lib/tailwind.css';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
	title: 'Rama Krishnan V',
	description: 'I am an Aesthetic Developer',
	colorScheme: 'dark',
	themeColor: '#000'
};

const RootLayout = ({ children }: PropsWithChildren) => {
	return (
		<html lang='en'>
			<body className='bg-black'>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
