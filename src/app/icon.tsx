import { ImageResponse } from 'next/og';
import MarkIcon from '@/components/seo/MarkIcon';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

const Icon = () => new ImageResponse(<MarkIcon size={size.width} />, size);

export default Icon;
