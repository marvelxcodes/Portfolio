import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const THIRTY_DAYS_SECONDS = 60 * 60 * 24 * 30;

const securityHeaders = [
	{ key: 'X-Content-Type-Options', value: 'nosniff' },
	{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
	{ key: 'X-Frame-Options', value: 'SAMEORIGIN' },
	{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' }
];

const nextConfig: NextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	pageExtensions: ['ts', 'tsx', 'mdx'],
	images: {
		formats: ['image/avif', 'image/webp'],
		minimumCacheTTL: THIRTY_DAYS_SECONDS
	},
	experimental: {
		optimizePackageImports: ['gsap', 'motion']
	},
	headers: async () => [{ source: '/:path*', headers: securityHeaders }]
};

const withMDX = createMDX({
	options: {
		remarkPlugins: ['remark-gfm'],
		rehypePlugins: [
			'rehype-slug',
			['rehype-pretty-code', { theme: { light: 'min-light', dark: 'min-dark' }, keepBackground: false }]
		]
	}
});

export default withMDX(nextConfig);
