'use client';

import { useRef } from 'react';
import { stats, type Stat } from '@/data/portfolio';
import { useInView } from '@/hooks/useInView';
import RollingText, { zeroDigits } from '@/components/primitives/RollingText';
import { cn } from '@/lib/utils';

type StatTileProps = { stat: Stat; visible: boolean; className?: string; labelClassName?: string };

const StatTile = ({ stat, visible, className, labelClassName }: StatTileProps) => (
	<div className={cn('flex flex-col justify-between gap-6 p-(--gutter) pt-3', className)}>
		<RollingText
			value={visible ? stat.value : zeroDigits(stat.value)}
			stagger={0.12}
			className='text-[clamp(4rem,9vw,10rem)] font-medium leading-none tracking-[-0.06em]'
		/>
		<p className={labelClassName}>{stat.label}</p>
	</div>
);

const Stats = () => {
	const root = useRef<HTMLDivElement>(null);
	const visible = useInView(root);

	return (
		<div ref={root} className='grid grid-cols-2 border-t lg:grid-cols-4 lg:grid-rows-[minmax(12.5rem,auto)_25rem]'>
			<StatTile
				stat={stats.years}
				visible={visible}
				className='min-h-56 bg-ink pb-8 text-paper lg:col-start-3 lg:row-start-1 lg:h-auto'
			/>
			<StatTile
				stat={stats.languages}
				visible={visible}
				className='h-56 bg-plate lg:col-start-4 lg:row-span-2 lg:row-start-1 lg:h-100 lg:self-start lg:border-l lg:border-b'
			/>
			<StatTile
				stat={stats.repositories}
				visible={visible}
				className='col-span-2 h-[26rem] border-y bg-haze lg:col-start-1 lg:row-start-2 lg:h-auto lg:border-y-0 lg:border-t lg:border-r'
				labelClassName='self-end'
			/>
			<StatTile
				stat={stats.distro}
				visible={visible}
				className='col-span-2 h-56 border-b lg:col-span-1 lg:col-start-3 lg:row-start-2 lg:h-auto lg:border-t lg:border-b-0'
			/>
		</div>
	);
};

export default Stats;
