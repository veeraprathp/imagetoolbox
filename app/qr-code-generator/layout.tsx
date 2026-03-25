import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';

export const metadata: Metadata = {
  title: 'Free QR Code Generator — Custom Colors & Styles',
  description: 'Generate custom QR codes with colors, dot styles, and backgrounds. Download as PNG or SVG. Free, no account required.',
  openGraph: {
    title: 'Free QR Code Generator — Custom Colors & Styles',
    description: 'Create custom QR codes instantly. Choose dot styles, colors, and size. Download PNG or SVG.',
    url: 'https://imagetoolbox.vercel.app/qr-code-generator',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'QR Code Generator',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free QR code generator with custom colors, dot styles, and PNG/SVG download.',
  url: 'https://imagetoolbox.vercel.app/qr-code-generator',
};

export default function QRLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
