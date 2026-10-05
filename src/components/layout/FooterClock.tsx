'use client';

import type { clocks } from '@/data/portfolio';
import { parseClockTime, useZonedTime } from '@/hooks/useZonedTime';
import AnalogClock from '@/components/primitives/AnalogClock';

const FooterClock = ({ clock }: { clock: (typeof clocks)[number] }) => {
	const time = useZonedTime(clock.timeZone);
	const { hours, minutes } = parseClockTime(time);
	return (
		<div className='flex items-center gap-4'>
			<AnalogClock hours={hours} minutes={minutes} />
			<div>
				<p className='font-medium'>{clock.name}</p>
				<p className='mono text-dim'>
					<time>{time}</time>
				</p>
			</div>
		</div>
	);
};

export default FooterClock;
