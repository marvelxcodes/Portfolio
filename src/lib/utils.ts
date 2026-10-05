import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			'font-size': [
				{ text: ['mono', 'body', 'lead', 'about', 'title', 'quote', 'name', 'giant', 'mega'] }
			]
		}
	}
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const pad = (n: number, length = 2) => String(n).padStart(length, '0');

export const clamp = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max);

export const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

export const wrapIndex = (index: number, length: number) => ((index % length) + length) % length;

export const formatPostDate = (iso: string, month: 'short' | 'long' = 'short') =>
	new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month, year: 'numeric' });

export const hexToUnitRgb = (hex: string): [number, number, number] => {
	const digits = hex.trim().replace('#', '');
	const fullDigits = digits.length === 3 ? [...digits].map((digit) => digit + digit).join('') : digits;
	const value = Number.parseInt(fullDigits, 16);
	return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
};

export const readCssVar = (name: string) =>
	getComputedStyle(document.documentElement).getPropertyValue(name).trim();
