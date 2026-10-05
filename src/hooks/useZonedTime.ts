'use client';

import { useMemo, useSyncExternalStore } from 'react';

const PLACEHOLDER_TIME = '00:00 AM';

const subscribeToSeconds = (onTick: () => void) => {
	const id = window.setInterval(onTick, 1000);
	return () => window.clearInterval(id);
};

export const useZonedTime = (timeZone: string) => {
	const formatter = useMemo(
		() =>
			new Intl.DateTimeFormat('en-US', {
				hour: '2-digit',
				minute: '2-digit',
				hour12: true,
				timeZone
			}),
		[timeZone]
	);

	return useSyncExternalStore(
		subscribeToSeconds,
		() => formatter.format(new Date()),
		() => PLACEHOLDER_TIME
	);
};

export const parseClockTime = (time: string) => {
	const [clock = '0:0', period] = time.split(' ');
	const [hours = 0, minutes = 0] = clock.split(':').map(Number);
	return { hours: (hours % 12) + (period === 'PM' ? 12 : 0), minutes };
};
