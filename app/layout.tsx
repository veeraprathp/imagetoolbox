import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { ToastProvider } from '../components/Toast';

export const metadata: Metadata = {
  title: { default: 'ImageToolbox — Free Online Image Tools', template: '%s | ImageToolbox' },
  description: 'Free browser-based image tools: compress, resize, remove background, generate QR codes. 100% private — nothing is uploaded.',
  metadataBase: new URL('https://imagetoolbox.vercel.app'),
  openGraph: {
    siteName: 'ImageToolbox',
    type: 'website',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

const navLinks = [
  { href: '/compress', label: 'Compress' },
  { href: '/resize', label: 'Resize' },
  { href: '/remove-background', label: 'Remove BG' },
  { href: '/qr-code-generator', label: 'QR Code' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <ToastProvider>
          <header className="border-b bg-white/95 backdrop-blur sticky top-0 z-50">
            <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6">
              <Link href="/" className="font-bold text-blue-600 text-xl tracking-tight">
                ImageToolbox
              </Link>
              <div className="flex items-center gap-1 ml-2">
                {navLinks.map(l => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-sm px-3 py-1.5 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className="ml-auto">
                <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  Feedback
                </Link>
              </div>
            </nav>
          </header>

          <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>

          <footer className="border-t mt-16 py-8 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
              <span>© {new Date().getFullYear()} ImageToolbox — Free Online Image Tools</span>
              <div className="flex gap-4">
                {navLinks.map(l => (
                  <Link key={l.href} href={l.href} className="hover:text-gray-700 transition-colors">{l.label}</Link>
                ))}
                <Link href="/contact" className="hover:text-gray-700 transition-colors">Contact</Link>
              </div>
            </div>
          </footer>
        </ToastProvider>
      </body>
    </html>
  );
}
