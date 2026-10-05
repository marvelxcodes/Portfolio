'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Reads a media query as an external store rather than mirroring it into state
 * from an effect — the browser already holds this value, so there is nothing to
 * synchronise and no cascading render to pay for.
 *
 * Returns `false` during server render, where no viewport exists yet.
 */
export const useMediaQuery = (query: string) => {
	const subscribe = useCallback(
		(onChange: () => void) => {
			const list = window.matchMedia(query);
			list.addEventListener('change', onChange);
			return () => list.removeEventListener('change', onChange);
		},
		[query]
	);

	return useSyncExternalStore(
		subscribe,
		() => window.matchMedia(query).matches,
		() => false
	);
};
