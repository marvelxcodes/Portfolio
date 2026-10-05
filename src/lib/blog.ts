import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { cache, type ComponentType } from 'react';
import GithubSlugger from 'github-slugger';

const BLOG_DIRECTORY = path.join(process.cwd(), 'src/content/blog');
const MDX_EXTENSION = '.mdx';
const WORDS_PER_MINUTE = 220;
const HEADING_PATTERN = /^(#{2,3})\s+(.+?)\s*#*$/;
const CODE_FENCE_PATTERN = /^\s*(```|~~~)/;

export type PostFrontmatter = {
	title: string;
	description: string;
	date: string;
	updated?: string;
	tag: string;
};

export type PostSummary = PostFrontmatter & {
	slug: string;
	readingMinutes: number;
};

export type PostHeading = { id: string; text: string; depth: 2 | 3 };

export type Post = PostSummary & {
	headings: PostHeading[];
	Content: ComponentType;
};

type PostModule = { default: ComponentType; metadata?: unknown };

const isIsoDate = (value: unknown): value is string =>
	typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));

const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;

const parseFrontmatter = (slug: string, metadata: unknown): PostFrontmatter => {
	const candidate = (metadata ?? {}) as Record<string, unknown>;
	const valid =
		isNonEmptyString(candidate.title) &&
		isNonEmptyString(candidate.description) &&
		isNonEmptyString(candidate.tag) &&
		isIsoDate(candidate.date) &&
		(candidate.updated === undefined || isIsoDate(candidate.updated));

	if (!valid) {
		throw new Error(
			`${slug}${MDX_EXTENSION} must export metadata { title, description, tag, date: 'YYYY-MM-DD', updated?: 'YYYY-MM-DD' }`
		);
	}
	return candidate as PostFrontmatter;
};

const stripInlineMarkdown = (text: string) =>
	text
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/[`*_~]/g, '')
		.trim();

const proseLines = (source: string) => {
	let insideFence = false;
	return source.split('\n').filter((line) => {
		if (CODE_FENCE_PATTERN.test(line)) {
			insideFence = !insideFence;
			return false;
		}
		return !insideFence;
	});
};

const extractHeadings = (source: string): PostHeading[] => {
	const slugger = new GithubSlugger();
	return proseLines(source).flatMap((line) => {
		const match = HEADING_PATTERN.exec(line);
		if (!match?.[1] || !match[2]) return [];
		const text = stripInlineMarkdown(match[2]);
		return [{ id: slugger.slug(text), text, depth: match[1].length === 2 ? 2 : 3 }];
	});
};

const countReadingMinutes = (source: string) => {
	const words = source.split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
};

export const getPostSlugs = cache(async () => {
	const files = await readdir(BLOG_DIRECTORY);
	return files.filter((file) => file.endsWith(MDX_EXTENSION)).map((file) => file.slice(0, -MDX_EXTENSION.length));
});

export const getPost = cache(async (slug: string): Promise<Post | null> => {
	if (!(await getPostSlugs()).includes(slug)) return null;

	const [postModule, source] = await Promise.all([
		import(`@/content/blog/${slug}.mdx`) as Promise<PostModule>,
		readFile(path.join(BLOG_DIRECTORY, `${slug}${MDX_EXTENSION}`), 'utf8')
	]);

	return {
		slug,
		...parseFrontmatter(slug, postModule.metadata),
		readingMinutes: countReadingMinutes(source),
		headings: extractHeadings(source),
		Content: postModule.default
	};
});

const toSummary = ({ slug, title, description, date, updated, tag, readingMinutes }: Post): PostSummary => ({
	slug,
	title,
	description,
	date,
	updated,
	tag,
	readingMinutes
});

export const getAllPosts = cache(async (): Promise<PostSummary[]> => {
	const posts = await Promise.all((await getPostSlugs()).map(getPost));
	return posts
		.filter((post): post is Post => post !== null)
		.map(toSummary)
		.sort((left, right) => right.date.localeCompare(left.date));
});

export const getAdjacentPosts = async (slug: string) => {
	const posts = await getAllPosts();
	const index = posts.findIndex((post) => post.slug === slug);
	return { newer: posts[index - 1] ?? null, older: posts[index + 1] ?? null };
};
