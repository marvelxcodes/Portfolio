import type { Metadata, Viewport } from 'next';
import type { PropsWithChildren } from 'react';

import './globals.css';
import { fontVariables } from '@/fonts';
import { person } from '@/data/site';
import Nav from '@/components/ui/Nav';
import Cursor from '@/components/ui/Cursor';
import Footer from '@/components/ui/Footer';
import Preloader from '@/components/ui/Preloader';
import SmoothScroll from '@/components/providers/SmoothScroll';

const url = 'https://marvelxcodes.dev';

export const metadata: Metadata = {
	metadataBase: new URL(url),
	title: {
		default: `${person.name} — ${person.role}`,
		template: `%s — ${person.name}`
	},
	description: person.summary,
	keywords: [
		'Full Stack Developer',
		'React',
		'Next.js',
		'Rust',
		'TypeScript',
		'WebGL',
		person.name,
		person.handle
	],
	authors: [{ name: person.name, url }],
	creator: person.name,
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url,
		title: `${person.name} — ${person.role}`,
		description: person.summary,
		siteName: person.name
	},
	twitter: {
		card: 'summary_large_image',
		title: `${person.name} — ${person.role}`,
		description: person.summary,
		creator: '@marvelxcodes'
	},
	icons: { icon: '/favicon.ico' }
};

export const viewport: Viewport = {
	themeColor: '#faf6ef',
	colorScheme: 'light',
	width: 'device-width',
	initialScale: 1
};

const RootLayout = ({ children }: PropsWithChildren) => (
	<html lang='en' className={fontVariables}>
		<head>
			{/* entrance animations start hidden; without JS nothing would ever
			    reveal them, so undo the whole mechanism when scripts are off */}
			<noscript>
				<style>{`[data-anim]{opacity:1!important;transform:none!important}`}</style>
			</noscript>
		</head>
		<body className='relative antialiased'>
			<SmoothScroll>
				<Preloader />

				{/* structural rails, kept behind content */}
				<div className='rails' aria-hidden>
					<span />
					<span />
					<span />
					<span />
				</div>

				<Nav />
				<Cursor />

				<div className='relative z-10'>{children}</div>
				<Footer />

				<div className='grain' aria-hidden />
			</SmoothScroll>
		</body>
	</html>
);

export default RootLayout;
