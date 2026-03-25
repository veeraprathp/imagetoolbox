import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { ToastProvider } from '../components/Toast';
import Header from '../components/Header';

export const metadata: Metadata = {
  title: { default: 'ImageToolbox — Free Online Image Tools', template: '%s | ImageToolbox' },
  description: 'Free browser-based image tools: compress, resize, remove background, generate QR codes. 100% private — nothing is uploaded.',
  metadataBase: new URL('https://imagetoolbox.vercel.app'),
  openGraph: { siteName: 'ImageToolbox', type: 'website', locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

const navLinks = [
  { href: '/compress',          label: 'Compress'  },
  { href: '/resize',            label: 'Resize'    },
  { href: '/remove-background', label: 'Remove BG' },
  { href: '/qr-code-generator', label: 'QR Code'   },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <Header />

          <main style={{ minHeight: 'calc(100vh - 58px)' }}>
            {children}
          </main>

          {/* Footer */}
          <footer style={{
            background: '#0f172a',
            borderTop: '1px solid rgba(255,255,255,.07)',
            marginTop: '5rem',
            padding: '2.5rem 1.5rem',
          }}>
            <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem', marginBottom: '2rem' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff', marginBottom: '.5rem' }}>ImageToolbox</div>
                  <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.84rem', maxWidth: '22rem', lineHeight: 1.65, margin: 0 }}>
                    Free image tools that run entirely in your browser. Your files never leave your device.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,.3)', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '.75rem' }}>Tools</div>
                    {navLinks.map(l => (
                      <div key={l.href} style={{ marginBottom: '.4rem' }}>
                        <Link href={l.href} style={{ color: 'rgba(255,255,255,.5)', fontSize: '.85rem', textDecoration: 'none' }}>{l.label}</Link>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,.3)', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '.75rem' }}>Company</div>
                    <Link href="/contact" style={{ color: 'rgba(255,255,255,.5)', fontSize: '.85rem', textDecoration: 'none' }}>Contact</Link>
                  </div>
                </div>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: '1.5rem', color: 'rgba(255,255,255,.25)', fontSize: '.8rem', textAlign: 'center' }}>
                © {new Date().getFullYear()} ImageToolbox. All rights reserved. Built with ♥ using Next.js &amp; WebAssembly.
              </div>
            </div>
          </footer>
        </ToastProvider>
      </body>
    </html>
  );
}
