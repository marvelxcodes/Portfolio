import type { Metadata } from 'next';
import { person, social, services } from '@/data/site';
import Chapter from '@/components/ui/Chapter';
import Reveal from '@/components/motion/Reveal';
import SplitReveal from '@/components/motion/SplitText';
import ContactForm from '@/components/ui/ContactForm';

export const metadata: Metadata = {
	title: 'Contact',
	description: `Start a project with ${person.name} — ${person.role} based in ${person.location}.`
};

const Contact = () => (
	<main className='relative z-10 pb-[var(--section-lg)] pt-[calc(var(--nav-h)+var(--section-md))]'>
		<div className='shell'>
			<Chapter index='—' title='Contact' />

			<div className='mt-12 grid gap-16 lg:grid-cols-12 lg:gap-10'>
				<div className='lg:col-span-5'>
					<h1 className='display max-w-[12ch] text-h1 text-stone-900'>
						<SplitReveal mode='lines' immediate stagger={0.1}>
							<span className='block'>Tell me</span>
							<span className='block'>
								the <span className='text-peach-500'>shape</span>
							</span>
							<span className='block'>of it.</span>
						</SplitReveal>
					</h1>

					<p className='mt-8 max-w-[42ch] text-base leading-relaxed text-stone-500'>
						What it has to do, who it is for, and roughly when. That is enough for
						a first reply — usually within a day.
					</p>

					<Reveal className='mt-12 flex flex-col gap-8 border-t border-cream-400 pt-8' stagger={0.08}>
						<div>
							<p className='font-mono text-xs uppercase tracking-wider text-stone-400'>
								Email/
							</p>
							<a
								href={`mailto:${person.email}`}
								className='link-underline mt-2 block text-lg text-stone-900'
							>
								{person.email}
							</a>
						</div>

						<div>
							<p className='font-mono text-xs uppercase tracking-wider text-stone-400'>
								Based/
							</p>
							<p className='mt-2 text-lg text-stone-900'>{person.locationLong}</p>
						</div>

						<div>
							<p className='font-mono text-xs uppercase tracking-wider text-stone-400'>
								Elsewhere/
							</p>
							<ul className='mt-3 flex flex-wrap gap-x-6 gap-y-2'>
								{social.map((item) => (
									<li key={item.label}>
										<a
											href={item.href}
											target='_blank'
											rel='noreferrer noopener'
											className='link-underline text-sm text-stone-500 transition-colors duration-300 hover:text-stone-900'
										>
											{item.label}
										</a>
									</li>
								))}
							</ul>
						</div>
					</Reveal>
				</div>

				<div className='lg:col-span-6 lg:col-start-7'>
					<ContactForm services={services.map((s) => s.title)} email={person.email} />
				</div>
			</div>
		</div>
	</main>
);

export default Contact;
