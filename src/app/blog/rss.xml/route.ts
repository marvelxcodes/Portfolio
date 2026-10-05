import { blog, person } from '@/data/portfolio';
import { getAllPosts } from '@/lib/blog';
import { absoluteUrl, postPath } from '@/lib/seo';

export const dynamic = 'force-static';

const escapeXml = (value: string) =>
	value.replace(/[<>&'"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[char] ?? char);

export const GET = async () => {
	const posts = await getAllPosts();
	const items = posts
		.map((post) => {
			const url = absoluteUrl(postPath(post.slug));
			return `<item><title>${escapeXml(post.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(post.description)}</description><category>${escapeXml(post.tag)}</category><pubDate>${new Date(post.date).toUTCString()}</pubDate></item>`;
		})
		.join('');

	const feed = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escapeXml(`${blog.title} — ${person.name}`)}</title><link>${absoluteUrl('/blog')}</link><description>${escapeXml(blog.description)}</description><language>en</language><atom:link href="${absoluteUrl('/blog/rss.xml')}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;

	return new Response(feed, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
