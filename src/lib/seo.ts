import { blog, expertise, person, principles, siteUrl, social } from '@/data/portfolio';
import type { PostSummary } from './blog';

export const absoluteUrl = (pathname: string) => new URL(pathname, siteUrl).toString();

export const postPath = (slug: string) => `/blog/${slug}`;

const PERSON_ID = `${siteUrl}/#person`;
const WEBSITE_ID = `${siteUrl}/#website`;
const LANGUAGE = 'en';
const [locality, country] = person.location.split(', ');

export const sharedOpenGraph = { siteName: person.name, locale: 'en_US' } as const;

const author = { '@type': 'Person', '@id': PERSON_ID, name: person.name, url: siteUrl } as const;

export const personSchema = () => ({
	'@context': 'https://schema.org',
	'@type': 'Person',
	'@id': PERSON_ID,
	name: person.name,
	givenName: person.firstName,
	familyName: person.lastName,
	alternateName: person.handle,
	jobTitle: person.role,
	description: person.summary,
	url: siteUrl,
	image: absoluteUrl(principles.portrait),
	email: `mailto:${person.email}`,
	address: { '@type': 'PostalAddress', addressLocality: locality, addressCountry: country },
	knowsAbout: expertise.disciplines.map((discipline) => discipline.title),
	sameAs: social.map((link) => link.href)
});

export const websiteSchema = () => ({
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	'@id': WEBSITE_ID,
	name: person.name,
	alternateName: person.handle,
	url: siteUrl,
	inLanguage: LANGUAGE,
	publisher: { '@id': PERSON_ID }
});

export const profilePageSchema = () => ({
	'@context': 'https://schema.org',
	'@type': 'ProfilePage',
	url: siteUrl,
	name: `${person.name} — ${person.role}`,
	inLanguage: LANGUAGE,
	isPartOf: { '@id': WEBSITE_ID },
	mainEntity: { '@id': PERSON_ID }
});

export const blogPostingSchema = (post: PostSummary) => ({
	'@context': 'https://schema.org',
	'@type': 'BlogPosting',
	headline: post.title,
	description: post.description,
	datePublished: post.date,
	dateModified: post.updated ?? post.date,
	keywords: post.tag,
	timeRequired: `PT${post.readingMinutes}M`,
	url: absoluteUrl(postPath(post.slug)),
	mainEntityOfPage: absoluteUrl(postPath(post.slug)),
	image: absoluteUrl(`${postPath(post.slug)}/opengraph-image`),
	author,
	publisher: author
});

export const breadcrumbSchema = (post: PostSummary) => ({
	'@context': 'https://schema.org',
	'@type': 'BreadcrumbList',
	itemListElement: [
		{ '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
		{ '@type': 'ListItem', position: 2, name: blog.title, item: absoluteUrl('/blog') },
		{ '@type': 'ListItem', position: 3, name: post.title, item: absoluteUrl(postPath(post.slug)) }
	]
});

export const blogSchema = (posts: PostSummary[]) => ({
	'@context': 'https://schema.org',
	'@type': 'Blog',
	name: `${blog.title} — ${person.name}`,
	description: blog.description,
	url: absoluteUrl('/blog'),
	author,
	blogPost: posts.map((post) => ({
		'@type': 'BlogPosting',
		headline: post.title,
		datePublished: post.date,
		url: absoluteUrl(postPath(post.slug))
	}))
});
