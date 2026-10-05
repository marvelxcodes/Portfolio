import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Statement from '@/components/home/Statement';
import Work from '@/components/home/Work';
import Expertise from '@/components/home/Expertise';
import Principles from '@/components/home/Principles';
import BlogRail from '@/components/home/BlogRail';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import { personSchema, profilePageSchema, websiteSchema } from '@/lib/seo';
import Cta from '@/components/home/Cta';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
	alternates: { canonical: '/', types: { 'application/rss+xml': '/blog/rss.xml' } }
};

const Home = async () => (
	<main>
		<JsonLd data={[personSchema(), websiteSchema(), profilePageSchema()]} />
		<Hero />
		<About />
		<Statement />
		<Expertise />
		<Work />
		<Principles />
		<BlogRail posts={await getAllPosts()} />
		<Cta />
	</main>
);

export default Home;
