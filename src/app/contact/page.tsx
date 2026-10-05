import type { Metadata } from 'next';
import { contactPage, person, process, social } from '@/data/portfolio';
import ArrowIcon from '@/components/primitives/ArrowIcon';
import Label from '@/components/primitives/Label';
import RevealLines from '@/components/primitives/RevealLines';
import ContactForm from '@/components/contact/ContactForm';
import { pad } from '@/lib/utils';
import { sharedOpenGraph } from '@/lib/seo';

const description = `Start a project with ${person.name} — ${person.role} based in ${person.location}.`;

export const metadata: Metadata = {
	title: 'Contact',
	description,
	alternates: { canonical: '/contact' },
	openGraph: { ...sharedOpenGraph, type: 'website', url: '/contact', title: `Contact — ${person.name}`, description }
};

const Contact = () => (
	<main className='relative z-10'>
		<div className='grid bg-paper lg:grid-cols-2 lg:divide-x'>
			<section className='flex flex-col justify-between gap-16 border-b p-(--gutter) lg:sticky lg:top-(--header-h) lg:h-[calc(100svh-var(--header-h))] lg:border-b-0'>
				<Label>Contact</Label>
				<div className='flex flex-col gap-10'>
					<RevealLines as='h1' trigger='load' lines={contactPage.heading} className='text-mega font-medium uppercase tracking-[-0.06em]' />
					<p className='max-w-[42ch]'>{contactPage.body}</p>
					<dl className='grid grid-cols-2 gap-6 border-t pt-6'>
						<div>
							<dt className='mono text-dim'>Email</dt>
							<dd className='mt-1'>
								<a href={`mailto:${person.email}`} className='transition-opacity hover:opacity-50'>
									{person.email}
								</a>
							</dd>
						</div>
						<div>
							<dt className='mono text-dim'>Based</dt>
							<dd className='mt-1'>{person.location}</dd>
						</div>
						<div className='col-span-2'>
							<dt className='mono text-dim'>Elsewhere</dt>
							<dd className='mt-2 flex flex-wrap gap-x-5 gap-y-2'>
								{social.map((link) => (
									<a key={link.label} href={link.href} target='_blank' rel='noreferrer noopener' className='flex items-center gap-1 transition-opacity hover:opacity-50'>
										{link.label}
										<ArrowIcon direction='up-right' className='size-3.5' />
									</a>
								))}
							</dd>
						</div>
					</dl>
				</div>
			</section>

			<div className='flex flex-col'>
				<ol className='divide-y divide-paper/15 bg-ink text-paper'>
					{process.map((step, index) => (
						<li key={step.title} className='grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-3 p-(--gutter)'>
							<span className='mono pt-1.5 text-paper/50'>{pad(index + 1)}</span>
							<h2 className='text-lead'>{step.title}</h2>
							<p className='col-start-2 text-paper/70'>{step.body}</p>
						</li>
					))}
				</ol>
				<div className='p-(--gutter) py-16'>
					<ContactForm />
				</div>
			</div>
		</div>
		<div className='h-40 lg:h-60' />
	</main>
);

export default Contact;
