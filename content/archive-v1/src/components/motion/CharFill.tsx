'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { gsap, SplitText, registerGsap, prefersReducedMotion } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

type CharFillProps = {
	children: ReactNode;
	as?: ElementType;
	className?: string;
	/** Where the fill begins, as a ScrollTrigger start string. */
	start?: string;
	end?: string;
};

/**
 * tresmarescapital.com's signature: a paragraph laid out at ~9% opacity that
 * inks in character by character as the block crosses the viewport, scrubbed
 * directly against scroll position rather than played on a timer.
 *
 * Built inside `onSplit` so that a webfont landing mid-scroll re-splits the copy
 * *and* rebuilds the tween against the new characters.
 */
const CharFill = ({
	children,
	as: Tag = 'p',
	className,
	start = 'top 80%',
	end = 'bottom 60%'
}: CharFillProps) => {
	const ref = useRef<HTMLElement>(null);

	useIsomorphicLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		registerGsap();
		if (prefersReducedMotion()) return;

		const ctx = gsap.context(() => {
			const split = SplitText.create(el, {
				type: 'chars,words,lines',
				charsClass: 'char',
				wordsClass: 'split-word',
				linesClass: 'split-line',
				autoSplit: true,
				onSplit: (self) => {
					if (!self.chars?.length) return undefined;

					return gsap.fromTo(
						self.chars,
						{ opacity: 0.09 },
						{
							opacity: 1,
							ease: 'none',
							duration: 0.6,
							stagger: { each: 0.35, from: 'start' },
							scrollTrigger: { trigger: el, start, end, scrub: 0.6 }
						}
					);
				}
			});

			return () => split.revert();
		}, ref);

		return () => ctx.revert();
	}, [start, end]);

	return (
		<Tag ref={ref} className={cn('char-fill', className)}>
			{children}
		</Tag>
	);
};

export default CharFill;
