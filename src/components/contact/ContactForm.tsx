'use client';

import { useState, type FormEvent } from 'react';
import { contactPage, person } from '@/data/portfolio';
import ArrowIcon from '@/components/primitives/ArrowIcon';
import { fillVariants } from '@/components/primitives/FillLink';
import { cn } from '@/lib/utils';

const fieldClass = 'w-full border-b bg-transparent py-3 text-lead placeholder:text-dim focus:outline-none focus-visible:border-b-2';

const composeMailBody = (data: FormData, scopes: string[]) =>
	[
		`Name: ${data.get('name') ?? ''}`,
		data.get('company') && `Company: ${data.get('company')}`,
		scopes.length > 0 && `Scope: ${scopes.join(', ')}`,
		data.get('budget') && `Budget: ${data.get('budget')}`,
		'',
		data.get('message') ?? ''
	]
		.filter((line) => line !== false && line !== null)
		.join('\n');

const ContactForm = () => {
	const [scopes, setScopes] = useState<string[]>([]);

	const toggleScope = (scope: string) =>
		setScopes((current) => (current.includes(scope) ? current.filter((item) => item !== scope) : [...current, scope]));

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const subject = encodeURIComponent(`New project — ${data.get('name') || 'enquiry'}`);
		window.location.href = `mailto:${person.email}?subject=${subject}&body=${encodeURIComponent(composeMailBody(data, scopes))}`;
	};

	return (
		<form onSubmit={onSubmit} className='flex flex-col gap-10'>
			<div className='grid gap-8 sm:grid-cols-2'>
				<label className='flex flex-col gap-1'>
					<span className='mono'>Name*</span>
					<input name='name' required autoComplete='name' className={fieldClass} placeholder='Your name' />
				</label>
				<label className='flex flex-col gap-1'>
					<span className='mono'>Company</span>
					<input name='company' autoComplete='organization' className={fieldClass} placeholder='Optional' />
				</label>
			</div>

			<fieldset className='flex flex-col gap-3'>
				<legend className='mono mb-3'>Scope</legend>
				<div className='flex flex-wrap gap-px'>
					{contactPage.scopes.map((scope) => (
						<button
							key={scope}
							type='button'
							aria-pressed={scopes.includes(scope)}
							data-active={scopes.includes(scope)}
							onClick={() => toggleScope(scope)}
							className='fill mono border px-3 py-2 [--fill:var(--c-ink)] data-[active=true]:text-paper'
						>
							{scope}
						</button>
					))}
				</div>
			</fieldset>

			<label className='flex flex-col gap-1'>
				<span className='mono'>Budget</span>
				<select name='budget' defaultValue='' className={cn(fieldClass, 'appearance-none')}>
					<option value='' disabled>
						Select a range
					</option>
					{contactPage.budgets.map((budget) => (
						<option key={budget}>{budget}</option>
					))}
				</select>
			</label>

			<label className='flex flex-col gap-1'>
				<span className='mono'>Message*</span>
				<textarea name='message' required rows={5} className={cn(fieldClass, 'resize-none')} placeholder={contactPage.body} />
			</label>

			<button type='submit' className={cn('fill mono flex w-60 items-center justify-between px-3 py-3', fillVariants.ink)}>
				Send enquiry
				<ArrowIcon />
			</button>
		</form>
	);
};

export default ContactForm;
