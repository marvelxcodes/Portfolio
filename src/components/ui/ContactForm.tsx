'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import Magnetic from '@/components/motion/Magnetic';

type ContactFormProps = {
	services: string[];
	email: string;
};

const field =
	'w-full rounded-md border border-cream-500 bg-cream-200/50 px-4 py-3.5 text-base text-stone-900 placeholder:text-stone-400 transition-colors duration-300 focus:border-peach-500 focus:outline-none';

const label = 'font-mono text-xs uppercase tracking-wider text-stone-500';

/**
 * No backend is wired up, so the form composes a mailto: rather than pretending
 * to submit. Everything the visitor typed survives the handoff.
 */
const ContactForm = ({ services, email }: ContactFormProps) => {
	const [scope, setScope] = useState<string[]>([]);

	const toggle = (service: string) =>
		setScope((prev) =>
			prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
		);

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const name = String(data.get('name') ?? '');
		const company = String(data.get('company') ?? '');
		const budget = String(data.get('budget') ?? '');
		const message = String(data.get('message') ?? '');

		const body = [
			`Name: ${name}`,
			company && `Company: ${company}`,
			scope.length && `Scope: ${scope.join(', ')}`,
			budget && `Budget: ${budget}`,
			'',
			message
		]
			.filter(Boolean)
			.join('\n');

		window.location.href = `mailto:${email}?subject=${encodeURIComponent(
			`New project — ${name || 'enquiry'}`
		)}&body=${encodeURIComponent(body)}`;
	};

	return (
		<form onSubmit={onSubmit} className='card flex flex-col gap-7 p-7 md:p-9'>
			<div className='grid gap-5 sm:grid-cols-2'>
				<div className='flex flex-col gap-2.5'>
					<label className={label} htmlFor='name'>
						Name*
					</label>
					<input id='name' name='name' required className={field} placeholder='Your name' />
				</div>
				<div className='flex flex-col gap-2.5'>
					<label className={label} htmlFor='company'>
						Company
					</label>
					<input id='company' name='company' className={field} placeholder='Optional' />
				</div>
			</div>

			<div className='flex flex-col gap-3'>
				<span className={label}>Scope</span>
				<div className='flex flex-wrap gap-2'>
					{services.map((service) => (
						<button
							key={service}
							type='button'
							onClick={() => toggle(service)}
							aria-pressed={scope.includes(service)}
							className={cn(
								'rounded-full border px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] transition-colors duration-300',
								scope.includes(service)
									? 'border-peach-500 bg-peach-400/12 text-peach-600'
									: 'border-cream-500 text-stone-500 hover:border-cream-500 hover:text-stone-500'
							)}
						>
							{service}
						</button>
					))}
				</div>
			</div>

			<div className='flex flex-col gap-2.5'>
				<label className={label} htmlFor='budget'>
					Budget range
				</label>
				<select id='budget' name='budget' className={cn(field, 'appearance-none')} defaultValue=''>
					<option value=''>Prefer not to say</option>
					<option>Under $2k</option>
					<option>$2k – $6k</option>
					<option>$6k – $15k</option>
					<option>$15k+</option>
				</select>
			</div>

			<div className='flex flex-col gap-2.5'>
				<label className={label} htmlFor='message'>
					What are you building?*
				</label>
				<textarea
					id='message'
					name='message'
					required
					rows={6}
					className={cn(field, 'resize-y')}
					placeholder='What it has to do, who it is for, and roughly when.'
				/>
			</div>

			<div className='flex flex-wrap items-center justify-between gap-4 pt-1'>
				<p className='max-w-[32ch] font-mono text-[0.65rem] uppercase leading-relaxed tracking-[0.14em] text-stone-400'>
					Opens your mail client with everything filled in.
				</p>
				<Magnetic>
					<button type='submit' className='btn btn-peach px-7 py-4'>
						Send it
						<span aria-hidden>↗</span>
					</button>
				</Magnetic>
			</div>
		</form>
	);
};

export default ContactForm;
