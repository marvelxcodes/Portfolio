'use client';

import { useRef } from 'react';
import { blog } from '@/data/portfolio';
import type { PostSummary } from '@/lib/blog';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { gsap, prefersReducedMotion, registerGsap } from '@/lib/gsap';
import ArrowIcon from '@/components/primitives/ArrowIcon';
import FillLink from '@/components/primitives/FillLink';
import Label from '@/components/primitives/Label';
import RevealLines from '@/components/primitives/RevealLines';
import PostCard from './PostCard';

const DRAG_THRESHOLD_PX = 6;

const useDragScroll = (rail: React.RefObject<HTMLDivElement | null>) => {
	useIsomorphicLayoutEffect(() => {
		const element = rail.current;
		if (!element) return;

		let startX = 0;
		let startScroll = 0;
		let dragging = false;
		let moved = false;

		const onPointerDown = (event: PointerEvent) => {
			if (event.pointerType !== 'mouse') return;
			dragging = true;
			moved = false;
			startX = event.clientX;
			startScroll = element.scrollLeft;
		};
		const onPointerMove = (event: PointerEvent) => {
			if (!dragging) return;
			const delta = event.clientX - startX;
			if (!moved && Math.abs(delta) < DRAG_THRESHOLD_PX) return;
			if (!moved) {
				moved = true;
				element.setPointerCapture(event.pointerId);
				element.style.scrollSnapType = 'none';
			}
			element.scrollLeft = startScroll - delta;
		};
		const onPointerUp = () => {
			dragging = false;
			element.style.scrollSnapType = '';
		};
		const onClickCapture = (event: MouseEvent) => {
			if (!moved) return;
			event.preventDefault();
			event.stopPropagation();
			moved = false;
		};

		element.addEventListener('pointerdown', onPointerDown);
		element.addEventListener('pointermove', onPointerMove);
		element.addEventListener('pointerup', onPointerUp);
		element.addEventListener('pointercancel', onPointerUp);
		element.addEventListener('click', onClickCapture, true);
		return () => {
			element.removeEventListener('pointerdown', onPointerDown);
			element.removeEventListener('pointermove', onPointerMove);
			element.removeEventListener('pointerup', onPointerUp);
			element.removeEventListener('pointercancel', onPointerUp);
			element.removeEventListener('click', onClickCapture, true);
		};
	}, [rail]);
};

const useStaggeredParallax = (rail: React.RefObject<HTMLDivElement | null>) => {
	useIsomorphicLayoutEffect(() => {
		const element = rail.current;
		if (!element || prefersReducedMotion()) return;
		registerGsap();

		const mm = gsap.matchMedia();
		mm.add('(min-width: 1024px)', () => {
			element.querySelectorAll('[data-card]').forEach((card, index) => {
				const lift = index % 2 ? 22 : 8;
				gsap.fromTo(
					card,
					{ yPercent: lift },
					{ yPercent: -lift, ease: 'none', scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: true } }
				);
			});
		});
		return () => mm.revert();
	}, [rail]);
};

const BlogRail = ({ posts }: { posts: PostSummary[] }) => {
	const rail = useRef<HTMLDivElement>(null);
	useDragScroll(rail);
	useStaggeredParallax(rail);

	const scrollRail = (direction: 1 | -1) => {
		const element = rail.current;
		const card = element?.querySelector<HTMLElement>('[data-card]');
		if (!element || !card) return;
		element.scrollBy({ left: direction * card.offsetWidth, behavior: 'smooth' });
	};

	return (
		<section id='blog' className='relative z-10 scroll-mt-(--header-h) border-t'>
			<div className='grid bg-paper lg:h-[calc(100svh-var(--header-h))] lg:grid-cols-2 lg:grid-rows-2 lg:divide-x'>
				<div className='border-b px-(--gutter) pt-3 pb-6'>
					<RevealLines lines={[blog.title]} className='text-giant font-medium tracking-[-0.06em]' />
				</div>
				<div className='flex items-center border-b p-(--gutter)'>
					<RevealLines as='p' lines={blog.tagline} className='text-title font-medium tracking-[-0.045em]' />
				</div>
				<div className='grid h-(--header-h) grid-cols-2 border-b lg:border-b-0'>
					<div className='p-(--gutter)'>
						<Label>{blog.label}</Label>
					</div>
					<div className='grid grid-cols-2 divide-x border-l lg:border-b'>
						<button type='button' aria-label='Previous posts' onClick={() => scrollRail(-1)} className='fill flex items-center justify-center text-dim [--fill:var(--c-plate)] hover:text-ink'>
							<ArrowIcon direction='left' />
						</button>
						<button type='button' aria-label='Next posts' onClick={() => scrollRail(1)} className='fill flex items-center justify-center [--fill:var(--c-plate)]'>
							<ArrowIcon />
						</button>
					</div>
				</div>
				<div className='flex flex-col items-start gap-10 p-(--gutter)'>
					<p className='lg:max-w-[42ch]'>{blog.body}</p>
					<FillLink href='/blog' className='mono w-50 px-3 py-2.5'>
						All posts
					</FillLink>
				</div>
			</div>

			<div
				ref={rail}
				className='no-scrollbar relative flex snap-x snap-mandatory gap-px overflow-x-auto overflow-y-clip py-10 lg:-mt-[40svh] lg:cursor-grab lg:py-[22svh] lg:active:cursor-grabbing'
			>
				{posts.map((post, index) => (
					<div key={post.slug} data-card className='w-[80vw] shrink-0 snap-start sm:w-[45vw] lg:w-[calc((100%-3px)/4)]'>
						<PostCard post={post} index={index} />
					</div>
				))}
			</div>
		</section>
	);
};

export default BlogRail;
