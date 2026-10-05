import type { MetadataRoute } from 'next';
import { person } from '@/data/portfolio';

const manifest = (): MetadataRoute.Manifest => ({
	name: `${person.name} — ${person.role}`,
	short_name: person.initials,
	description: person.summary,
	start_url: '/',
	display: 'standalone',
	background_color: '#ffffff',
	theme_color: '#232323',
	icons: [
		{ src: '/icon', sizes: '512x512', type: 'image/png', purpose: 'any' },
		{ src: '/apple-icon', sizes: '180x180', type: 'image/png' },
		{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }
	]
});

export default manifest;
