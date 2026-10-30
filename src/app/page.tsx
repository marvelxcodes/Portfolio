import type { Metadata } from 'next';
import About from '@/components/home/About';
import BlogRail from '@/components/home/BlogRail';
import Cta from '@/components/home/Cta';
import Expertise from '@/components/home/Expertise';
import Hero from '@/components/home/Hero';
import Principles from '@/components/home/Principles';
import Statement from '@/components/home/Statement';
import Work from '@/components/home/Work';
import JsonLd from '@/components/seo/JsonLd';
import { getAllPosts } from '@/lib/blog';
import { personSchema, profilePageSchema, websiteSchema } from '@/lib/seo';

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
