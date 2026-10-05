'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { gsap, prefersReducedMotion, registerGsap, SplitText } from '@/lib/gsap';

const QuoteText = ({ text }: { text: string }) => {
	const root = useRef<HTMLParagraphElement>(null);

	useIsomorphicLayoutEffect(() => {
		const element = root.current;
		if (!element || prefersReducedMotion()) return;
		registerGsap();

		const split = SplitText.create(element, {
			type: 'words,chars',
			autoSplit: true,
			onSplit: (self) =>
				gsap.from(self.chars, {
					opacity: 0,
					duration: 0.6,
					ease: 'power2.out',
					stagger: { each: 0.006, from: 'random' }
				})
		});

		return () => split.revert();
	}, [text]);

	return (
		<p ref={root} className='text-quote tracking-[-0.045em]'>
			{text}
		</p>
	);
};

export default QuoteText;
