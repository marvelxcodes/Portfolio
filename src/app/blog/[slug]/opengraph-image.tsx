import { ImageResponse } from 'next/og';
import { person } from '@/data/portfolio';
import { getPost, getPostSlugs } from '@/lib/blog';
import { formatPostDate } from '@/lib/utils';
import OgCard, { OG_SIZE } from '@/components/seo/OgCard';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = `Blog post by ${person.name}`;

export const generateStaticParams = async () => (await getPostSlugs()).map((slug) => ({ slug }));

const PostImage = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const post = await getPost((await params).slug);
	return new ImageResponse(
		<OgCard
			eyebrow={post ? `${post.tag} · ${formatPostDate(post.date)}` : 'Blog'}
			title={post?.title ?? person.name}
			footer={`${person.handle} — ${post?.readingMinutes ?? 0} min read`}
		/>,
		size
	);
};

export default PostImage;
