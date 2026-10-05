import { ImageResponse } from 'next/og';
import { person } from '@/data/portfolio';
import OgCard, { OG_SIZE } from '@/components/seo/OgCard';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = `${person.name} — ${person.role}`;

const SiteImage = () =>
	new ImageResponse(<OgCard eyebrow={person.role} title={person.tagline} footer={`${person.name} · ${person.location}`} />, size);

export default SiteImage;
