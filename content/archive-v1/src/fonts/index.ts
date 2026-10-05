import localFont from 'next/font/local';
import { JetBrains_Mono } from 'next/font/google';

/** Display face — the giant uppercase headline voice. */
export const coolvetica = localFont({
	src: './Coolvetica.otf',
	variable: '--font-coolvetica',
	display: 'swap',
	weight: '400'
});

/** Body / UI grotesk. */
export const satoshi = localFont({
	src: './Satoshi.ttf',
	variable: '--font-satoshi',
	display: 'swap'
});

/** Editorial serif, used sparingly for pull-quotes. */
export const crima = localFont({
	src: './Crima.otf',
	variable: '--font-crima',
	display: 'swap'
});

/** Mono — eyebrows, indices, metadata. */
export const jetbrains = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-jetbrains',
	display: 'swap',
	weight: ['400', '500']
});

export const fontVariables = [
	coolvetica.variable,
	satoshi.variable,
	crima.variable,
	jetbrains.variable
].join(' ');
