import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { absoluteUrl, postPath } from '@/lib/seo';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
	const posts = await getAllPosts();
	const latestPost = posts[0]?.updated ?? posts[0]?.date;

	return [
		{ url: absoluteUrl('/'), lastModified: latestPost, changeFrequency: 'monthly', priority: 1 },
		{ url: absoluteUrl('/blog'), lastModified: latestPost, changeFrequency: 'weekly', priority: 0.8 },
		{ url: absoluteUrl('/contact'), changeFrequency: 'yearly', priority: 0.5 },
		...posts.map((post) => ({
			url: absoluteUrl(postPath(post.slug)),
			lastModified: post.updated ?? post.date,
			changeFrequency: 'yearly' as const,
			priority: 0.7
		}))
	];
};

export default sitemap;
