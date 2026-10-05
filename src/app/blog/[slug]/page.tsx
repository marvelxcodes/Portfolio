import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { blog, person } from '@/data/portfolio';
import { getAdjacentPosts, getPost, getPostSlugs } from '@/lib/blog';
import { absoluteUrl, blogPostingSchema, breadcrumbSchema, postPath, sharedOpenGraph } from '@/lib/seo';
import { formatPostDate } from '@/lib/utils';
import ArrowIcon from '@/components/primitives/ArrowIcon';
import Label from '@/components/primitives/Label';
import RevealLines from '@/components/primitives/RevealLines';
import TableOfContents from '@/components/blog/TableOfContents';
import ShareLinks from '@/components/blog/ShareLinks';
import PostPager from '@/components/blog/PostPager';
import JsonLd from '@/components/seo/JsonLd';

type PostPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export const generateStaticParams = async () => (await getPostSlugs()).map((slug) => ({ slug }));

export const generateMetadata = async ({ params }: PostPageProps): Promise<Metadata> => {
	const post = await getPost((await params).slug);
	if (!post) return {};

	return {
		title: post.title,
		description: post.description,
		keywords: [post.tag, person.name, person.handle],
		authors: [{ name: person.name, url: absoluteUrl('/') }],
		alternates: { canonical: postPath(post.slug) },
		openGraph: {
			...sharedOpenGraph,
			type: 'article',
			url: postPath(post.slug),
			title: post.title,
			description: post.description,
			publishedTime: post.date,
			modifiedTime: post.updated ?? post.date,
			authors: [person.name],
			tags: [post.tag]
		},
		twitter: { card: 'summary_large_image', title: post.title, description: post.description, creator: `@${person.handle}` }
	};
};

const PostPage = async ({ params }: PostPageProps) => {
	const post = await getPost((await params).slug);
	if (!post) notFound();

	const { newer, older } = await getAdjacentPosts(post.slug);
	const { Content } = post;
	const details = [
		{ term: 'Published', value: <time dateTime={post.date}>{formatPostDate(post.date, 'long')}</time> },
		...(post.updated ? [{ term: 'Updated', value: <time dateTime={post.updated}>{formatPostDate(post.updated, 'long')}</time> }] : []),
		{ term: 'Reading time', value: `${post.readingMinutes} min` },
		{ term: 'Topic', value: post.tag }
	];

	return (
		<main className='relative z-10'>
			<JsonLd data={blogPostingSchema(post)} />
			<JsonLd data={breadcrumbSchema(post)} />
			<div aria-hidden className='reading-progress fixed inset-x-0 top-(--header-h) z-30 h-0.5 bg-ink' />

			<article>
				<header className='grid lg:grid-cols-2 lg:divide-x'>
					<div className='tile flex flex-col justify-between gap-16 border-b p-(--gutter) lg:min-h-[calc(100svh-var(--header-h))]'>
						<nav aria-label='Breadcrumb' className='mono flex items-center gap-2'>
							<Link href='/blog' className='flex items-center gap-2 transition-opacity hover:opacity-50'>
								<ArrowIcon direction='left' className='size-4' />
								{blog.title}
							</Link>
							<span aria-hidden className='text-dim'>
								/
							</span>
							<span className='text-dim'>{post.tag}</span>
						</nav>
						<RevealLines
							as='h1'
							trigger='load'
							lines={[post.title]}
							className='text-title font-medium tracking-[-0.05em] lg:text-[clamp(2.75rem,4.4vw,5rem)] lg:leading-[0.98]'
						/>
					</div>
					<div className='flex flex-col justify-between gap-12 border-b bg-plate p-(--gutter)'>
						<Label>{person.name}</Label>
						<div className='flex flex-col gap-10'>
							<p className='text-about tracking-[-0.03em]'>{post.description}</p>
							<dl className='grid grid-cols-2 gap-x-6 gap-y-4 border-t pt-5 sm:grid-cols-4'>
								{details.map((detail) => (
									<div key={detail.term}>
										<dt className='mono text-dim'>{detail.term}</dt>
										<dd className='mt-1'>{detail.value}</dd>
									</div>
								))}
							</dl>
						</div>
					</div>
				</header>

				<div className='h-32 lg:h-48' />

				<div className='grid border-t bg-paper lg:grid-cols-4 lg:divide-x'>
					<aside className='hidden p-(--gutter) lg:block'>
						<div className='sticky top-[calc(var(--header-h)+var(--gutter))]'>
							<TableOfContents headings={post.headings} />
						</div>
					</aside>

					<div className='post-body min-w-0 px-(--gutter) pt-4 pb-24 lg:col-span-2 lg:px-[min(4vw,4rem)] lg:pt-10'>
						<Content />
					</div>

					<aside className='border-t p-(--gutter) lg:border-t-0'>
						<div className='flex flex-col gap-12 lg:sticky lg:top-[calc(var(--header-h)+var(--gutter))]'>
							<ShareLinks title={post.title} url={absoluteUrl(postPath(post.slug))} />
						</div>
					</aside>
				</div>
			</article>

			<PostPager newer={newer} older={older} />
			<div className='h-32 lg:h-48' />
		</main>
	);
};

export default PostPage;
