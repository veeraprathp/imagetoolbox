import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ImageToolbox — Free Online Image Tools',
  description: 'Free browser-based tools to compress images, remove backgrounds, resize photos, and generate QR codes. No upload, no server, 100% private.',
  openGraph: {
    title: 'ImageToolbox — Free Online Image Tools',
    description: 'Compress, resize, remove backgrounds, generate QR codes — free, browser-based, no upload.',
    url: 'https://imagetoolbox.vercel.app',
  },
};

const tools = [
  {
    href: '/compress',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    ),
    title: 'Image Compressor',
    desc: 'Reduce file size up to 90% without visible quality loss. JPEG, PNG, WebP.',
    badge: '~30M searches/mo',
    color: 'blue',
  },
  {
    href: '/remove-background',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
      </svg>
    ),
    title: 'Background Remover',
    desc: 'AI removes backgrounds in seconds — runs entirely in your browser, no server.',
    badge: '~20M searches/mo',
    color: 'purple',
  },
  {
    href: '/resize',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
      </svg>
    ),
    title: 'Image Resizer',
    desc: 'Set exact pixel dimensions with aspect-ratio lock and social media presets.',
    badge: '~15M searches/mo',
    color: 'green',
  },
  {
    href: '/qr-code-generator',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
      </svg>
    ),
    title: 'QR Code Generator',
    desc: 'Custom QR codes with colors, backgrounds, dot styles — download PNG or SVG.',
    badge: '~10M searches/mo',
    color: 'orange',
  },
];

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-600 border-blue-100 hover:border-blue-300',
  purple: 'bg-purple-50 text-purple-600 border-purple-100 hover:border-purple-300',
  green: 'bg-green-50 text-green-600 border-green-100 hover:border-green-300',
  orange: 'bg-orange-50 text-orange-600 border-orange-100 hover:border-orange-300',
};
const iconColorMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-600',
  purple: 'bg-purple-100 text-purple-600',
  green: 'bg-green-100 text-green-600',
  orange: 'bg-orange-100 text-orange-600',
};

const trustBadges = [
  { label: '100% Free', sub: 'No hidden fees, no limits' },
  { label: 'No Upload', sub: 'Everything stays in browser' },
  { label: 'No Account', sub: 'Use without signing up' },
  { label: 'Open Source', sub: 'MIT licensed packages' },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <div className="text-center py-16 px-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          100% Browser-Based — No Server, No Upload
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-4 text-gray-900">
          Free Image Tools<br />
          <span className="text-blue-600">That Respect Your Privacy</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
          Compress, resize, remove backgrounds, and generate QR codes — everything runs
          in your browser. Your images never leave your device.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {trustBadges.map(b => (
            <div key={b.label} className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
              <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-800">{b.label}</div>
                <div className="text-xs text-gray-500">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {tools.map(t => (
          <Link
            key={t.href}
            href={t.href}
            className={`border-2 rounded-2xl p-6 transition-all group bg-white hover:shadow-lg ${colorMap[t.color]}`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${iconColorMap[t.color]}`}>
                {t.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-current">{t.title}</h2>
                  <span className="hidden sm:inline text-xs text-gray-400 font-normal">{t.badge}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{t.desc}</p>
              </div>
              <svg className="w-5 h-5 text-gray-300 group-hover:text-current transition-colors shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* How it works */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold mb-10 text-gray-900">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Upload', desc: 'Drag & drop or click to select your image. Stays 100% in your browser.' },
            { step: '2', title: 'Process', desc: 'Our tools run client-side using WebAssembly and Web APIs — fast and private.' },
            { step: '3', title: 'Download', desc: 'Click download to save the result. No account, no email, no waiting.' },
          ].map(s => (
            <div key={s.step} className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center mb-4">
                {s.step}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
