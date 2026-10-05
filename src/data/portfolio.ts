export const person = {
	name: 'Rama Krishnan V',
	firstName: 'Rama',
	lastName: 'Krishnan',
	initials: 'RK',
	handle: 'marvelxcodes',
	role: 'Full Stack Engineer',
	location: 'Bengaluru, India',
	tagline: 'I build everything from web apps to a Linux distro.',
	summary:
		'Indie hacker and full stack engineer. I build products end to end — interfaces that feel inevitable, backends that hold under load, and the occasional operating system when the itch gets bad enough.',
	email: 'ramakrishnan@crownos.org',
	github: 'https://github.com/marvelxcodes',
	since: 2021
} as const;

export const siteUrl = 'https://ramakrishnan.crownos.org';

export const sections = [
	{ id: 'about', label: 'About' },
	{ id: 'work', label: 'Work' },
	{ id: 'expertise', label: 'Expertise' },
	{ id: 'principles', label: 'Principles' },
	{ id: 'blog', label: 'Blog' }
] as const;

export const social = [
	{ label: 'GitHub', href: 'https://github.com/marvelxcodes' },
	{ label: 'LinkedIn', href: 'https://linkedin.com/in/marvelxcodes' },
	{ label: 'X', href: 'https://x.com/marvelxcodes' },
	{ label: 'Instagram', href: 'https://instagram.com/marvelxcodes' },
	{ label: 'Stack Overflow', href: 'https://stackoverflow.com/users/marvelxcodes' }
] as const;

export const clocks = [
	{ city: 'BLR', name: 'Bengaluru', timeZone: 'Asia/Kolkata' },
	{ city: 'UTC', name: 'UTC', timeZone: 'UTC' }
] as const;

export const hero = {
	intro: person.summary,
	pitch: person.tagline,
	stackLabel: 'Shipping with:',
	cta: 'Start a project',
	quote: {
		text: 'We’re here to put a dent in the universe. Otherwise why else even be here?',
		author: 'Steve Jobs'
	},
	statement: ['Make it.', 'Ship it.']
} as const;

export const stackIcons = [
	{ name: 'React', src: '/skills/react.png' },
	{ name: 'Next.js', src: '/skills/nextjs.svg' },
	{ name: 'TypeScript', src: '/skills/typescript.png' },
	{ name: 'Rust', src: '/skills/rust.svg' },
	{ name: 'Svelte', src: '/skills/svelte.svg' },
	{ name: 'Python', src: '/skills/python.svg' },
	{ name: 'Go', src: '/skills/go.svg' },
	{ name: 'Astro', src: '/skills/astro.svg' }
] as const;

export const about = {
	label: 'About me',
	paragraphs: [
		person.summary,
		'Five years in, the work spans SaaS platforms for clients, an agent-native Linux distribution and tooling that clones websites on autopilot. The common thread is ownership — the schema, the API, the interface and the deploy are the same pair of hands, so nothing gets lost in a handoff.'
	]
} as const;

export type Stat = { value: string; label: string };

export const stats = {
	repositories: { value: '72+', label: 'Public repositories shipped' },
	years: { value: '05', label: 'Years writing production code' },
	languages: { value: '12', label: 'Languages and runtimes in rotation' },
	distro: { value: '01', label: 'Linux distribution, in production' }
} as const satisfies Record<string, Stat>;

export type Discipline = {
	title: string;
	body: string;
	focus: string[];
	icon: 'rings' | 'globe' | 'burst' | 'orbit';
};

export const expertise = {
	heading: ['Schema,', 'Interface,', 'Deploy.'],
	body: 'Full stack delivery from an empty repository to production traffic. I take products end to end — the data model, the API, the interface people touch and the pipeline that ships it.',
	cta: 'Start a project',
	disciplines: [
		{
			title: 'Product engineering',
			body: 'Multi-tenant applications with billing, auth and the boring reliability work that keeps customers. Shipped end to end, owned after launch.',
			focus: ['Schema & API design', 'Auth, billing, tenancy', 'Deploy pipelines', 'Production on-call'],
			icon: 'rings'
		},
		{
			title: 'Interface & motion',
			body: 'Where the product earns its trust — motion, type, and state that never stutters. Scroll choreography and shader work that directs attention.',
			focus: ['React, Next.js, Svelte', 'GSAP & WebGL', 'Design systems', 'Landing pages'],
			icon: 'globe'
		},
		{
			title: 'Systems & low level',
			body: 'Rust, Kotlin and a stubborn interest in what happens under the runtime. Services, CLIs and an operating system built from the compositor up.',
			focus: ['Rust services & CLIs', 'Linux & Wayland', 'WebAssembly', 'Internal tooling'],
			icon: 'burst'
		},
		{
			title: 'AI products',
			body: 'Agent-native tooling and pipelines that turn unstructured input into decisions — from ranking résumés to weighting a backlog by revenue.',
			focus: ['Claude Code plugins', 'Embeddings & clustering', 'Transcript extraction', 'Local models'],
			icon: 'orbit'
		}
	] satisfies Discipline[]
} as const;

export type Project = {
	name: string;
	category: string;
	year: string;
	blurb: string;
	description: string;
	stack: string[];
	metric: Stat;
	accent: string;
	onAccent: 'light' | 'dark';
	href?: string;
};

export const work = {
	title: 'Work',
	label: 'Selected projects',
	intro: 'Products I have taken from an empty repository to real users — an operating system, a cloning engine, a revenue-weighted backlog and a SaaS analytics platform. Each one shipped, and each one is still being sharpened.',
	cta: { label: 'All repositories', href: 'https://github.com/marvelxcodes?tab=repositories' },
	projects: [
		{
			name: 'CrownOS',
			category: 'Operating system',
			year: '2026',
			blurb: 'An agent-native desktop OS built on the Linux kernel.',
			description:
				'An Arch-based distribution designed around AI agents — local models on CUDA, ROCm or NPU, a custom tiling and floating compositor, multi-device sync and a single TOML configuration system, with everything kept on-device.',
			stack: ['Rust', 'Linux', 'Wayland', 'PipeWire'],
			metric: { value: '60s', label: 'ISO to desktop' },
			accent: '#f2b33d',
			onAccent: 'dark',
			href: 'https://crownos.org'
		},
		{
			name: 'Imitation Engine',
			category: 'Developer tool',
			year: '2026',
			blurb: 'Pixel-perfect website clones, on autopilot.',
			description:
				'A Claude Code plugin that crawls a site, extracts its design tokens and interaction graph, and ships a verified Next.js + Tailwind clone — checked with pixel, DOM and interaction diffs at three viewports.',
			stack: ['Claude Code', 'Playwright', 'Next.js', 'Tailwind'],
			metric: { value: '98.7%', label: 'Median pixel fidelity' },
			accent: '#7b61ff',
			onAccent: 'light',
			href: 'https://imitationengine.com'
		},
		{
			name: 'Gridlogs',
			category: 'SaaS',
			year: '2026',
			blurb: 'The product backlog, weighted by revenue.',
			description:
				'Ingests sales calls from Gong and Fireflies, extracts and clusters feature requests with embeddings, weights them by HubSpot ARR and pushes the winners straight into Linear.',
			stack: ['Next.js', 'Drizzle', 'Postgres', 'Stripe'],
			metric: { value: '04', label: 'Integrations, one ranked backlog' },
			accent: '#2fd48a',
			onAccent: 'dark'
		},
		{
			name: 'Rankcraft',
			category: 'Client project',
			year: '2024',
			blurb: 'Etsy SEO analytics for sellers who need the numbers.',
			description:
				'A SaaS analytics platform that scrapes, scores and forecasts Etsy listing performance. Built for a client end to end — ingestion pipeline, scoring engine, dashboard and billing.',
			stack: ['Next.js', 'PostgreSQL', 'Drizzle', 'Python'],
			metric: { value: '4×', label: 'Faster keyword audits' },
			accent: '#ff5a36',
			onAccent: 'dark',
			href: 'https://github.com/marvelxcodes'
		}
	] satisfies Project[]
} as const;

export const principles = {
	label: 'Principles',
	portrait: '/portrait-about.jpg',
	items: [
		{
			lead: 'One person, whole stack',
			scope: 'Every engagement',
			body: 'No handoff between a designer who cannot ship and an engineer who will not decide. The schema, the API, the interface and the deploy are the same pair of hands.'
		},
		{
			lead: 'Motion that means something',
			scope: 'Interface & WebGL',
			body: 'Scroll choreography, GSAP timelines and shader work used to direct attention — not to prove the site can move.'
		},
		{
			lead: 'Systems, not screens',
			scope: 'Design systems',
			body: 'Token-driven design systems and typed contracts, so the second and third contributor inherit something that holds its shape.'
		},
		{
			lead: 'Built to survive production',
			scope: 'Launch & beyond',
			body: 'The unglamorous half — failure modes, migrations, load. It is the half that decides whether the launch is a launch or an incident.'
		}
	]
} as const;

export const process = [
	{
		title: 'Understand the shape',
		body: 'Before a line of code: what the thing actually has to do, who breaks it, and what "done" looks like. Most projects fail here, quietly.'
	},
	{
		title: 'Build the spine',
		body: 'Data model and critical path first. If the hard half works, the rest is decoration. If it does not, no amount of polish saves it.'
	},
	{
		title: 'Make it feel authored',
		body: 'Motion, type and detail arrive last and matter enormously. This is where a competent build becomes one people remember.'
	},
	{
		title: 'Ship, then sharpen',
		body: 'Production is the only honest test environment. Measure, cut what nobody uses, and keep tightening the parts that carry weight.'
	}
] as const;

export const blog = {
	title: 'Blog',
	label: 'Writing in public',
	tagline: ['Notes from', 'the build.'],
	description: 'Notes on systems, motion and shipping software alone — written by Rama Krishnan V.',
	body: 'Long-form writing about the parts of the work that are hard to explain in a commit message — systems, motion, and what it actually costs to ship something alone.'
} as const;

export const cta = {
	rows: [['Let’s', 'build'], ['something']],
	href: '/contact'
} as const;

export const footer = {
	tagline: 'Interfaces that feel inevitable.',
	closer: 'Let’s build something people remember',
	action: 'Start a project'
} as const;

export const contactPage = {
	heading: ['Tell me', 'the shape', 'of it.'],
	body: 'What it has to do, who it is for, and roughly when. That is enough for a first reply — usually within a day.',
	scopes: ['Product engineering', 'SaaS platforms', 'Motion & WebGL', 'Landing pages', 'Design systems', 'Systems & tooling'],
	budgets: ['Prefer not to say', 'Under $2k', '$2k – $6k', '$6k – $15k', '$15k+']
} as const;

export const notFound = {
	label: '404 / Off the map',
	heading: 'This page never shipped.',
	body: 'The link is broken or the page moved. Either way, the work is back this way.',
	cta: 'Back to the story'
} as const;

