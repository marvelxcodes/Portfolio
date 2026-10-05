import { ImageResponse } from 'next/og';
import MarkIcon from '@/components/seo/MarkIcon';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

const AppleIcon = () => new ImageResponse(<MarkIcon size={size.width} />, size);

export default AppleIcon;
