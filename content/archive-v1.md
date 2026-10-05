# Content archive — portfolio v1

Everything the previous build of the site said, kept verbatim before the rebuild.

## Hardcoded copy (sections and pages)

- Hero: headline faces `SHIP` / `MAKE`; CTA "Success stories ↓"
- Curious: "Who is a little curious?" · "{years} years making browsers do things they were never designed to do." · "The toolkit" · "Keep scrolling"
- Stories: "Things that shipped, and what changed once they did." · "View project ↗" · "View all repositories"
- Services: "Design expert" · "I help teams succeed on projects like:"
- Reasons: "Why" · "Good software takes time. Working with me saves you some of it."
- Process: "Four steps, no theatre" · "Every project runs the same shape. It is not complicated — it is just the order that keeps a build from unravelling somewhere around week three."
- Contact section: "Start something" · "Let's build something people remember." · "Read the journal"
- Footer: "{availability} — building products end to end from {location}" · "Built using"
- Contact page: "Tell me the shape of it." · "What it has to do, who it is for, and roughly when. That is enough for a first reply — usually within a day." · Scope options: Prefer not to say / Under $2k / $2k – $6k / $6k – $15k / $15k+
- Blog index: "Notes from the build." · "Long-form writing about the parts of the work that are hard to explain in a commit message — systems, motion, and what it actually costs to ship something alone."
- 404: "4 0 4 / Off the map" · "This page never shipped." · "The link is broken or the page moved. Either way, the work is back this way." · "Back to the story"

## Data layer (src/data/site.ts, verbatim)

```ts
/* ==========================================================================
   Content layer. Sourced from github.com/marvelxcodes (profile, README and
   pinned repositories) and the previous build of this site.
   ========================================================================== */

export const person = {
	name: 'Rama Krishnan V',
	handle: 'marvelxcodes',
	role: 'Full Stack Engineer',
	location: 'India',
	locationLong: 'Chennai, India',
	tagline: 'I build everything from web apps to a Linux distro.',
	summary:
		'Indie hacker and full stack engineer. I build products end to end — interfaces that feel inevitable, backends that hold under load, and the occasional operating system when the itch gets bad enough.',
	availability: 'Open to select engagements',
	email: 'hello@marvelxcodes.dev',
	since: 2021
} as const;

export const social = [
	{ label: 'GitHub', href: 'https://github.com/marvelxcodes', icon: '/social-media/github.svg' },
	{ label: 'LinkedIn', href: 'https://linkedin.com/in/marvelxcodes', icon: '/social-media/linkedin.svg' },
	{ label: 'X', href: 'https://x.com/marvelxcodes', icon: '/social-media/x.svg' },
	{ label: 'Instagram', href: 'https://instagram.com/marvelxcodes', icon: '/social-media/instagram.svg' },
	{ label: 'Stack Overflow', href: 'https://stackoverflow.com/users/marvelxcodes', icon: '/social-media/stack-overflow.svg' }
] as const;

export const nav = [
	{ label: 'Curious', href: '#curious' },
	{ label: 'Stories', href: '#stories' },
	{ label: 'Services', href: '#services' },
	{ label: 'Process', href: '#process' },
	{ label: 'Journal', href: '/blog' }
] as const;

/* Portrait assets. Both are graded crops of the source photograph; drop a
   replacement at the same path and nothing else needs to change. */
export const media = {
	portraitHero: '/portrait-hero.jpg',
	portraitAbout: '/portrait-about.jpg'
} as const;

/* The two faces of the hero headline. Same length so every cell has a partner
   to flip to — the whole mechanic depends on it. */
export const heroFaces = { front: 'SHIP', back: 'MAKE' } as const;

/* ---- chapter 01: the numbers -------------------------------------------- */

export const stats = [
	{ value: 72, suffix: '+', label: 'Public repositories shipped' },
	{ value: 5, suffix: '', label: 'Years writing production code' },
	{ value: 12, suffix: '', label: 'Languages and runtimes in rotation' },
	{ value: 1, suffix: '', label: 'Linux distribution, in progress' }
] as const;

/* ---- chapter 02: the stack ---------------------------------------------- */

export type SkillGroup = {
	title: string;
	index: string;
	note: string;
	items: { name: string; icon?: string; level: number }[];
};

export const skillGroups: SkillGroup[] = [
	{
		title: 'Interface',
		index: '01',
		note: 'Where the product earns its trust — motion, type, and state that never stutters.',
		items: [
			{ name: 'React', icon: '/skills/react.png', level: 96 },
			{ name: 'Next.js', icon: '/skills/nextjs.svg', level: 94 },
			{ name: 'TypeScript', icon: '/skills/typescript.png', level: 95 },
			{ name: 'Svelte', icon: '/skills/svelte.svg', level: 90 },
			{ name: 'Astro', icon: '/skills/astro.svg', level: 88 },
			{ name: 'Tailwind', level: 93 },
			{ name: 'SCSS', icon: '/skills/sass.svg', level: 92 },
			{ name: 'GSAP / WebGL', level: 86 }
		]
	},
	{
		title: 'Systems',
		index: '02',
		note: 'The half nobody sees. Schemas, queues, and the long tail of failure modes.',
		items: [
			{ name: 'Node.js', level: 93 },
			{ name: 'Python', icon: '/skills/python.svg', level: 91 },
			{ name: 'PostgreSQL', level: 88 },
			{ name: 'Redis', level: 84 },
			{ name: 'Prisma / Drizzle', level: 89 },
			{ name: 'NestJS', level: 80 },
			{ name: 'Django', level: 78 },
			{ name: 'Java / Spring', level: 76 }
		]
	},
	{
		title: 'Low level',
		index: '03',
		note: 'Rust, Kotlin and a stubborn interest in what happens under the runtime.',
		items: [
			{ name: 'Rust', icon: '/skills/rust.svg', level: 74 },
			{ name: 'Go', icon: '/skills/go.svg', level: 68 },
			{ name: 'Kotlin', level: 72 },
			{ name: 'WebAssembly', level: 70 },
			{ name: 'Linux / Hyprland', level: 92 },
			{ name: 'Bash', level: 87 },
			{ name: 'Docker', level: 82 },
			{ name: 'AWS / Vercel', level: 84 }
		]
	}
];

export const marqueeWords = [
	'React',
	'Next.js',
	'TypeScript',
	'Rust',
	'Svelte',
	'Python',
	'WebGL',
	'PostgreSQL',
	'Kotlin',
	'Linux',
	'GSAP',
	'Astro',
	'Node.js',
	'WebAssembly'
] as const;

/* ---- chapter 03: the work ------------------------------------------------ */

export type Project = {
	index: string;
	name: string;
	year: string;
	blurb: string;
	description: string;
	tags: string[];
	stack: string[];
	image: string;
	href: string;
	metric?: { value: string; label: string };
};

export const projects: Project[] = [
	{
		index: '01',
		name: 'CrownOS',
		year: '2026',
		blurb: 'A Linux distribution built from the compositor up',
		description:
			'An opinionated Linux distribution written largely in Rust — custom shell, tiling compositor configuration and a package layer designed for people who live in the terminal.',
		tags: ['Operating System', 'Long-running'],
		stack: ['Rust', 'Linux', 'Wayland', 'Bash'],
		image: '/covers/crownos.svg',
		href: 'https://github.com/crown-os',
		metric: { value: '∞', label: 'Ongoing since 2025' }
	},
	{
		index: '02',
		name: 'Rankcraft',
		year: '2024',
		blurb: 'Etsy SEO analytics for sellers who need the numbers',
		description:
			'A SaaS analytics platform that scrapes, scores and forecasts Etsy listing performance. Built for a client, shipped end to end — ingestion pipeline, scoring engine, dashboard and billing.',
		tags: ['SaaS', 'Client Project'],
		stack: ['Next.js', 'PostgreSQL', 'Drizzle', 'Python'],
		image: '/projects/rankcraft2.png',
		href: 'https://github.com/marvelxcodes',
		metric: { value: '4×', label: 'Faster keyword audits' }
	},
	{
		index: '03',
		name: 'xSpecies Leaderboard',
		year: '2026',
		blurb: 'Realtime leaderboard for an AI hackathon',
		description:
			'A live scoring dashboard for the xSpecies AI hackathon — streaming submissions, tie-break logic and a projector-friendly display mode that held up in front of a room.',
		tags: ['Realtime', 'Hackathon'],
		stack: ['TypeScript', 'Next.js', 'WebSockets'],
		image: '/covers/xspecies.svg',
		href: 'https://github.com/marvelxcodes/xspecies-ai-hackathon',
		metric: { value: '<80ms', label: 'Score propagation' }
	},
	{
		index: '04',
		name: 'Shortlister',
		year: '2025',
		blurb: 'CV shortlisting for companies drowning in applications',
		description:
			'Resume parsing and ranking for high-volume hiring. Structured extraction, weighted scoring against a role spec, and an interface a recruiter can actually move through quickly.',
		tags: ['AI', 'Product'],
		stack: ['TypeScript', 'Next.js', 'Python', 'Postgres'],
		image: '/covers/shortlister.svg',
		href: 'https://cvshortlister.vercel.app',
		metric: { value: '10k', label: 'Résumés per batch' }
	},
	{
		index: '05',
		name: 'Epsilon',
		year: '2026',
		blurb: 'Native Android, written in Kotlin',
		description:
			'A Kotlin-first mobile application exploring offline-first sync and a gesture-driven interface — the counterweight to a year spent mostly in the browser.',
		tags: ['Mobile', 'Native'],
		stack: ['Kotlin', 'Android', 'SQLite'],
		image: '/covers/epsilon.svg',
		href: 'https://github.com/marvelxcodes/Epsilon',
		metric: { value: '100%', label: 'Offline capable' }
	},
	{
		index: '06',
		name: 'HTTP From Scratch',
		year: '2025',
		blurb: 'A web server with no framework underneath it',
		description:
			'An HTTP/1.1 server implemented from the socket up — parser, keep-alive, chunked encoding and a router. Written to stop treating the request lifecycle as a black box.',
		tags: ['Systems', 'Learning in public'],
		stack: ['Rust', 'Sockets', 'HTTP/1.1'],
		image: '/covers/http-server.svg',
		href: 'https://github.com/marvelxcodes/HttpServerFromScratch',
		metric: { value: '0', label: 'Dependencies' }
	}
];

/* ---- chapter 04: craft --------------------------------------------------- */

export const services = [
	{
		index: '01',
		title: 'Product engineering',
		body: 'Full stack delivery from empty repository to production traffic — schema, API, interface, deploy pipeline.'
	},
	{
		index: '02',
		title: 'SaaS platforms',
		body: 'Multi-tenant applications with billing, auth and the boring reliability work that keeps customers.'
	},
	{
		index: '03',
		title: 'Motion & WebGL',
		body: 'Scroll-driven narrative, GSAP timelines and shader work — the layer that makes a site feel authored.'
	},
	{
		index: '04',
		title: 'Landing pages',
		body: 'Marketing surfaces that load fast, read clearly and convert without shouting.'
	},
	{
		index: '05',
		title: 'Interfaces & design systems',
		body: 'Token-driven component libraries that survive the second and third designer.'
	},
	{
		index: '06',
		title: 'Systems & tooling',
		body: 'Rust services, CLIs, Chrome extensions and the internal tools nobody puts on a portfolio.'
	}
] as const;

/* ---- chapter 05: process ------------------------------------------------- */

export const processSteps = [
	{
		index: '01',
		title: 'Understand the shape',
		body: 'Before a line of code: what the thing actually has to do, who breaks it, and what "done" looks like. Most projects fail here, quietly.'
	},
	{
		index: '02',
		title: 'Build the spine',
		body: 'Data model and critical path first. If the hard half works, the rest is decoration. If it does not, no amount of polish saves it.'
	},
	{
		index: '03',
		title: 'Make it feel authored',
		body: 'Motion, type and detail arrive last and matter enormously. This is where a competent build becomes one people remember.'
	},
	{
		index: '04',
		title: 'Ship, then sharpen',
		body: 'Production is the only honest test environment. Measure, cut what nobody uses, and keep tightening the parts that carry weight.'
	}
] as const;

/* ---- the pinned panel ----------------------------------------------------
   juanmora.co holds one dark plate in place while the argument for hiring it
   scrolls over the top. These are the four lines that scroll. */

export const reasons = [
	{
		index: '01',
		lead: 'One person, whole stack',
		body: 'No handoff between a designer who cannot ship and an engineer who will not decide. The schema, the API, the interface and the deploy are the same pair of hands.'
	},
	{
		index: '02',
		lead: 'Motion that means something',
		body: 'Scroll choreography, GSAP timelines and shader work used to direct attention — not to prove the site can move.'
	},
	{
		index: '03',
		lead: 'Systems, not screens',
		body: 'Token-driven design systems and typed contracts, so the second and third contributor inherit something that holds its shape.'
	},
	{
		index: '04',
		lead: 'Built to survive production',
		body: 'The unglamorous half — failure modes, migrations, load. It is the half that decides whether the launch is a launch or an incident.'
	}
] as const;

export const panelHeadline = ['GOOD SOFTWARE', 'TAKES TIME', 'AND I SAVE YOU SOME'] as const;

export const manifesto = ['ROBUST', 'BY DEFAULT', 'FAST', 'BY DESIGN'] as const;

export const quote = {
	text: "We're here to put a dent in the universe. Otherwise why else even be here?",
	author: 'Steve Jobs'
} as const;

/* ---- footer (sui.io architecture) ---------------------------------------- */

/* juanmora.co credits its own build in the footer; so does this one. */
export const builtWith = [
	'Next.js 16',
	'Tailwind v4',
	'GSAP + SplitText',
	'MorphSVG',
	'Motion',
	'Lottie',
	'Paper Shaders',
	'Lenis'
] as const;

export const footerColumns = [
	{
		heading: 'Work',
		links: [
			{ label: 'Selected projects', href: '#work' },
			{ label: 'CrownOS', href: 'https://github.com/crown-os' },
			{ label: 'Rankcraft', href: '#work' },
			{ label: 'Shortlister', href: 'https://cvshortlister.vercel.app' },
			{ label: 'Open source', href: 'https://github.com/marvelxcodes?tab=repositories' }
		]
	},
	{
		heading: 'Services',
		links: [
			{ label: 'Product engineering', href: '#craft' },
			{ label: 'SaaS platforms', href: '#craft' },
			{ label: 'Motion & WebGL', href: '#craft' },
			{ label: 'Landing pages', href: '#craft' },
			{ label: 'Design systems', href: '#craft' }
		]
	},
	{
		heading: 'Stack',
		links: [
			{ label: 'TypeScript', href: '#stack' },
			{ label: 'React & Next.js', href: '#stack' },
			{ label: 'Rust', href: '#stack' },
			{ label: 'Python', href: '#stack' },
			{ label: 'Linux & Hyprland', href: 'https://github.com/marvelxcodes/hyprland-config' }
		]
	},
	{
		heading: 'Elsewhere',
		links: [
			{ label: 'GitHub', href: 'https://github.com/marvelxcodes' },
			{ label: 'LinkedIn', href: 'https://linkedin.com/in/marvelxcodes' },
			{ label: 'X', href: 'https://x.com/marvelxcodes' },
			{ label: 'Journal', href: '/blog' },
			{ label: 'Contact', href: '/contact' }
		]
	}
] as const;

/* ---- journal ------------------------------------------------------------- */

export const posts = [
	{
		id: 'writing-an-http-server-in-rust',
		title: 'Writing an HTTP server in Rust, without the framework',
		excerpt:
			'Parsing request lines by hand teaches you more about the web than a year of using a framework that hides them.',
		date: '2026-06-14',
		readingTime: '9 min',
		tag: 'Systems'
	},
	{
		id: 'scroll-driven-narrative',
		title: 'Scroll is a timeline, not a scrollbar',
		excerpt:
			'Treating scroll position as playhead changes how you structure a page. Notes from building pinned, layered scenes with GSAP.',
		date: '2026-04-02',
		readingTime: '7 min',
		tag: 'Motion'
	},
	{
		id: 'building-a-linux-distro',
		title: 'What building a Linux distribution taught me about scope',
		excerpt:
			'CrownOS started as a config repo. Somewhere along the way it became an operating system, and the lesson was about restraint.',
		date: '2026-01-28',
		readingTime: '11 min',
		tag: 'CrownOS'
	},
	{
		id: 'shipping-saas-solo',
		title: 'Shipping a SaaS alone, and what breaks first',
		excerpt:
			'Billing is not the hard part. Support, migrations and the three-in-the-morning incident are the hard part.',
		date: '2025-11-09',
		readingTime: '8 min',
		tag: 'Product'
	}
] as const;
```
