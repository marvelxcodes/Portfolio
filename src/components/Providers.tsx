'use client';
import { PropsWithChildren } from 'react';
import PrelineProvider from '@/lib/preline';

const Providers = ({ children }: PropsWithChildren) => {
	return <PrelineProvider>{children}</PrelineProvider>;
};

export default Providers;
