'use client';

import { useEffect, useState, type RefObject } from 'react';

export const useInView = (ref: RefObject<Element | null>, rootMargin = '0px 0px -15% 0px') => {
	const [inView, setInView] = useState(false);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry?.isIntersecting) return;
				setInView(true);
				observer.disconnect();
			},
			{ rootMargin }
		);
		observer.observe(element);
		return () => observer.disconnect();
	}, [ref, rootMargin]);

	return inView;
};
