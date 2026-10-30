import { JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';

export const satoshi = localFont({
	src: './Satoshi.woff2',
	variable: '--font-satoshi',
	display: 'swap',
	weight: '300 900'
});

export const jetbrains = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-jetbrains',
	display: 'swap',
	weight: ['400', '500']
});

export const fontVariables = `${satoshi.variable} ${jetbrains.variable}`;
