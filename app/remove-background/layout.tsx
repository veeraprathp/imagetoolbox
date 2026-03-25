import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';

export const metadata: Metadata = {
  title: 'Remove Background from Image Free — No Upload Limit',
  description: 'AI-powered background removal that runs entirely in your browser. Free, private, no upload limit. Download transparent PNG.',
  openGraph: {
    title: 'Remove Background from Image Free — No Upload Limit',
    description: 'Remove image backgrounds with AI — runs 100% in your browser. No upload, no signup.',
    url: 'https://imagetoolbox.vercel.app/remove-background',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Background Remover',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'AI-powered background removal running entirely in the browser using WebAssembly. No upload required.',
  url: 'https://imagetoolbox.vercel.app/remove-background',
};

export default function RemoveBgLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
