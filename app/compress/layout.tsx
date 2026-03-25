import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';

export const metadata: Metadata = {
  title: 'Free Image Compressor — Compress JPEG, PNG, WebP Online',
  description: 'Reduce image file size by up to 90% without losing quality. Free, browser-based, no upload. Supports JPEG, PNG, WebP.',
  openGraph: {
    title: 'Free Image Compressor — Compress JPEG, PNG, WebP Online',
    description: 'Compress images instantly in your browser. No upload, no limits, 100% free.',
    url: 'https://imagetoolbox.vercel.app/compress',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Image Compressor',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based image compressor. Supports JPEG, PNG, WebP. No upload required.',
  url: 'https://imagetoolbox.vercel.app/compress',
};

export default function CompressLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
