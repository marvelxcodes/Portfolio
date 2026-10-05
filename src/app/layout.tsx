import type { Metadata, Viewport } from 'next';
import type { PropsWithChildren } from 'react';

import './globals.css';
import { fontVariables } from '@/fonts';
import { person, siteUrl } from '@/data/portfolio';
import SmoothScroll from '@/components/providers/SmoothScroll';
import HalftoneCanvas from '@/components/gl/HalftoneCanvas';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/layout/Preloader';
import CursorTrail from '@/components/layout/CursorTrail';
import { themeBootScript } from '@/lib/theme';
import { sharedOpenGraph } from '@/lib/seo';

const title = `${person.name} — ${person.role}`;

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: { default: title, template: `%s — ${person.name}` },
	description: person.summary,
	applicationName: person.name,
	keywords: [
		person.name,
		`${person.firstName} ${person.lastName}`,
		person.handle,
		person.role,
		'Next.js developer',
		'Rust',
		'TypeScript',
		'WebGL',
		'CrownOS'
	],
	authors: [{ name: person.name, url: siteUrl }],
	creator: person.name,
	publisher: person.name,
	category: 'technology',
	formatDetection: { email: false, address: false, telephone: false },
	robots: {
		index: true,
		follow: true,
		googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 }
	},
	verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
	openGraph: { ...sharedOpenGraph, type: 'website', url: '/', title, description: person.summary },
	twitter: { card: 'summary_large_image', title, description: person.summary, creator: `@${person.handle}` }
};

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
		{ media: '(prefers-color-scheme: dark)', color: '#121212' }
	],
	width: 'device-width',
	initialScale: 1
};

const RootLayout = ({ children }: PropsWithChildren) => (
	<html lang='en' className={fontVariables} suppressHydrationWarning>
		<head>
			<script id='theme-boot' dangerouslySetInnerHTML={{ __html: themeBootScript }} />
		</head>
		<body className='relative antialiased'>
			<SmoothScroll>
				<Preloader />
				<HalftoneCanvas />
				<Header />
				<div className='relative z-10'>{children}</div>
				<Footer />
				<CursorTrail />
			</SmoothScroll>
		</body>
	</html>
);

export default RootLayout;
