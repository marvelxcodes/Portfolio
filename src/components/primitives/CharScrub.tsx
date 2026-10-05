'use client';

import { useRef, type ElementType, type PropsWithChildren } from 'react';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { gsap, prefersReducedMotion, registerGsap, SplitText } from '@/lib/gsap';

type CharScrubProps = PropsWithChildren<{ as?: ElementType; className?: string }>;

const CharScrub = ({ as: Tag = 'p', className, children }: CharScrubProps) => {
	const root = useRef<HTMLElement>(null);

	useIsomorphicLayoutEffect(() => {
		const element = root.current;
		if (!element || prefersReducedMotion()) return;
		registerGsap();

		const split = SplitText.create(element, {
			type: 'words,chars',
			autoSplit: true,
			onSplit: (self) =>
				gsap.fromTo(
					self.chars,
					{ opacity: 0.06 },
					{
						opacity: 1,
						ease: 'none',
						stagger: { each: 0.01, from: 'random' },
						scrollTrigger: { trigger: element, start: 'top 85%', end: 'bottom 60%', scrub: 0.6 }
					}
				)
		});

		return () => split.revert();
	}, []);

	return (
		<Tag ref={root} className={className}>
			{children}
		</Tag>
	);
};

export default CharScrub;
