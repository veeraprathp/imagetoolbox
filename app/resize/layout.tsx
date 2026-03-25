import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';

export const metadata: Metadata = {
  title: 'Resize Image Online Free — Set Width & Height Instantly',
  description: 'Resize any image to exact pixel dimensions. Aspect-ratio lock, social media presets. Free, browser-based, no upload.',
  openGraph: {
    title: 'Resize Image Online Free — Set Width & Height Instantly',
    description: 'Resize images to exact dimensions. Lock aspect ratio, use social presets. No upload.',
    url: 'https://imagetoolbox.vercel.app/resize',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Image Resizer',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online image resizer with aspect-ratio lock and social media presets.',
  url: 'https://imagetoolbox.vercel.app/resize',
};

export default function ResizeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
