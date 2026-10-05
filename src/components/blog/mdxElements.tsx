import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';
import Callout from './Callout';
import Figure from './Figure';
import { cn } from '@/lib/utils';

const isInternal = (href = '') => href.startsWith('/') || href.startsWith('#');

const SmartLink = ({ href = '', className, ...props }: ComponentProps<'a'>) =>
	isInternal(href) ? (
		<Link href={href} className={className} {...props} />
	) : (
		<a href={href} target='_blank' rel='noreferrer noopener' className={className} {...props} />
	);

const headingAnchor = 'group/heading scroll-mt-[calc(var(--header-h)+1.5rem)]';

export const mdxElements: MDXComponents = {
	h2: ({ className, ...props }) => (
		<h2 className={cn(headingAnchor, 'mt-16 mb-6 text-title tracking-[-0.045em]', className)} {...props} />
	),
	h3: ({ className, ...props }) => (
		<h3 className={cn(headingAnchor, 'mt-10 mb-4 text-lead font-medium tracking-[-0.03em]', className)} {...props} />
	),
	p: (props) => <p className='my-5 text-[1.125rem] leading-[1.6]' {...props} />,
	a: ({ className, ...props }) => (
		<SmartLink
			className={cn('underline decoration-1 underline-offset-[0.2em] transition-opacity hover:opacity-50', className)}
			{...props}
		/>
	),
	ul: (props) => <ul className='my-6 flex flex-col gap-2 pl-5 text-[1.125rem] leading-[1.6] [list-style:square]' {...props} />,
	ol: (props) => <ol className='my-6 flex flex-col gap-2 pl-6 text-[1.125rem] leading-[1.6] [list-style:decimal-leading-zero]' {...props} />,
	li: (props) => <li className='pl-1 marker:text-dim' {...props} />,
	blockquote: (props) => (
		<blockquote className='my-10 border-l-2 border-ink pl-(--gutter) text-about tracking-[-0.03em] [&_p]:text-[length:inherit] [&_p]:leading-[1.15]' {...props} />
	),
	hr: () => <hr className='my-14 border-t' />,
	table: (props) => (
		<div className='my-8 overflow-x-auto border'>
			<table className='w-full border-collapse text-left text-body' {...props} />
		</div>
	),
	th: (props) => <th className='mono border-b bg-haze px-3 py-2' {...props} />,
	td: (props) => <td className='border-b px-3 py-2 align-top' {...props} />,
	Callout,
	Figure
};
