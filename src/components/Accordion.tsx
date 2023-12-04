interface AccordionProps {
	question: string;
	answer: string;
}

const Accordion = ({ question, answer }: AccordionProps) => {
	return (
		<div
			className='hs-accordion active'
			id='hs-basic-with-title-and-arrow-stretched-heading-one'
		>
			<button
				className='hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400'
				aria-controls='hs-basic-with-title-and-arrow-stretched-collapse-one'
			>
				{question}
				<svg
					className='hs-accordion-active:hidden block w-4 h-4'
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					stroke-width='2'
					stroke-linecap='round'
					stroke-linejoin='round'
				>
					<path d='m6 9 6 6 6-6' />
				</svg>
				<svg
					className='hs-accordion-active:block hidden w-4 h-4'
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					stroke-width='2'
					stroke-linecap='round'
					stroke-linejoin='round'
				>
					<path d='m18 15-6-6-6 6' />
				</svg>
			</button>
			<div
				id='hs-basic-with-title-and-arrow-stretched-collapse-one'
				className='hs-accordion-content w-full overflow-hidden transition-[height] duration-300'
				aria-labelledby='hs-basic-with-title-and-arrow-stretched-heading-one'
			>
				<p className='text-gray-800 dark:text-gray-200'>{answer}</p>
			</div>
		</div>
	);
};

export default Accordion;
