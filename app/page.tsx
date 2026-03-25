import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ImageToolbox — Free Online Image Tools',
  description: 'Free browser-based tools to compress images, remove backgrounds, resize photos, and generate QR codes. No upload, no server, 100% private.',
};

const tools = [
  {
    href: '/compress',
    icon: '🗜️',
    title: 'Image Compressor',
    desc: 'Reduce file size up to 90% without visible quality loss.',
    badge: '~30M searches/mo',
    from: '#2563eb', to: '#1d4ed8',
    light: '#eff6ff', border: '#bfdbfe',
    tag: 'Most Popular',
  },
  {
    href: '/remove-background',
    icon: '✂️',
    title: 'Background Remover',
    desc: 'AI removes backgrounds in seconds — runs entirely in your browser.',
    badge: '~20M searches/mo',
    from: '#7c3aed', to: '#6d28d9',
    light: '#f5f3ff', border: '#ddd6fe',
    tag: 'AI Powered',
  },
  {
    href: '/resize',
    icon: '📐',
    title: 'Image Resizer',
    desc: 'Set exact pixel dimensions with aspect-ratio lock and social presets.',
    badge: '~15M searches/mo',
    from: '#059669', to: '#047857',
    light: '#ecfdf5', border: '#a7f3d0',
    tag: 'Social Presets',
  },
  {
    href: '/qr-code-generator',
    icon: '📱',
    title: 'QR Code Generator',
    desc: 'Custom QR codes with colors, dot styles — download PNG or SVG.',
    badge: '~10M searches/mo',
    from: '#d97706', to: '#b45309',
    light: '#fffbeb', border: '#fcd34d',
    tag: 'SVG Export',
  },
];

const stats = [
  { value: '75M+', label: 'Monthly searches targeted' },
  { value: '0 KB', label: 'Data uploaded to server' },
  { value: '4',    label: 'Free tools available' },
  { value: '100%', label: 'Browser-based processing' },
];

const features = [
  { icon: '🔒', title: 'Completely Private', desc: 'Your images never leave your device. All processing happens locally in your browser using WebAssembly.' },
  { icon: '⚡', title: 'Instant Results',   desc: 'No waiting for server uploads or processing. Results appear in seconds thanks to client-side rendering.' },
  { icon: '🆓', title: 'Always Free',        desc: 'No account, no credit card, no watermarks. All 4 tools are free forever with no usage limits.' },
  { icon: '📱', title: 'Works Everywhere',  desc: 'Desktop, tablet, or mobile — all tools are fully responsive and work on any modern browser.' },
];

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(160deg, #0f172a 0%, #1e1b4b 45%, #0f172a 100%)',
        padding: '5rem 1.5rem 4rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow blobs */}
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(99,102,241,.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '15%', width: 250, height: 250, background: 'radial-gradient(circle, rgba(37,99,235,.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: '52rem', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            background: 'rgba(99,102,241,.15)', border: '1px solid rgba(99,102,241,.3)',
            color: '#a5b4fc', borderRadius: 9999, padding: '.35rem 1rem',
            fontSize: '.8rem', fontWeight: 600, marginBottom: '1.75rem',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#818cf8', display: 'inline-block' }} />
            100% Browser-Based · No Upload · No Account
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: '-.03em',
            color: '#fff',
            marginBottom: '1.25rem',
          }}>
            Free Image Tools That<br />
            <span style={{
              background: 'linear-gradient(135deg, #818cf8, #60a5fa)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Respect Your Privacy</span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,.55)', maxWidth: '36rem', margin: '0 auto 2.5rem', lineHeight: 1.65 }}>
            Compress, resize, remove backgrounds, and generate QR codes — everything runs
            in your browser. Your images never leave your device.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/compress" style={{ textDecoration: 'none' }}>
              <span className="btn-primary" style={{ fontSize: '1rem', padding: '.75rem 2rem' }}>
                Start for Free →
              </span>
            </Link>
            <Link href="#tools" style={{ textDecoration: 'none' }}>
              <span className="btn-ghost" style={{
                color: 'rgba(255,255,255,.6)', borderColor: 'rgba(255,255,255,.15)',
                background: 'rgba(255,255,255,.05)', fontSize: '1rem', padding: '.75rem 2rem',
              }}>
                View All Tools
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ───────────────────────────────────────────── */}
      <section style={{
        background: '#fff',
        borderBottom: '1px solid #e2e8f0',
        padding: '1.5rem 1.5rem',
      }}>
        <div style={{
          maxWidth: '72rem', margin: '0 auto',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2.5rem',
        }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-.03em', color: '#4f46e5' }}>{s.value}</div>
              <div style={{ fontSize: '.78rem', color: '#94a3b8', fontWeight: 500, marginTop: '.15rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tool cards ──────────────────────────────────────────── */}
      <section id="tools" style={{ maxWidth: '72rem', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="section-label">Tools</div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, letterSpacing: '-.025em', color: '#0f172a', marginTop: '.5rem' }}>
            Everything you need for images
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {tools.map(t => (
            <Link key={t.href} href={t.href} style={{ textDecoration: 'none' }}>
              <div className="tool-card" style={{
                background: '#fff',
                border: `1.5px solid ${t.border}`,
                borderRadius: '1.25rem',
                padding: '1.5rem',
                height: '100%',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Top accent bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${t.from}, ${t.to})`, borderRadius: '1.25rem 1.25rem 0 0' }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  {/* Icon box */}
                  <div style={{
                    width: 48, height: 48, borderRadius: '12px', flexShrink: 0,
                    background: t.light,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}>
                    {t.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.3rem' }}>
                      <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a', margin: 0 }}>{t.title}</h3>
                      <span style={{
                        fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em',
                        background: t.light, color: t.from, padding: '.2rem .5rem', borderRadius: 9999,
                        border: `1px solid ${t.border}`,
                      }}>{t.tag}</span>
                    </div>
                    <p style={{ fontSize: '.875rem', color: '#64748b', lineHeight: 1.55, margin: 0 }}>{t.desc}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 4 }}>
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </div>

                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: `1px solid ${t.border}` }}>
                  <span style={{ fontSize: '.78rem', color: t.from, fontWeight: 600 }}>{t.badge}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────── */}
      <section style={{ background: '#fff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="section-label">Why ImageToolbox</div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, letterSpacing: '-.025em', color: '#0f172a', marginTop: '.5rem' }}>
              Built for privacy and speed
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {features.map(f => (
              <div key={f.title}>
                <div style={{ fontSize: '2rem', marginBottom: '.75rem' }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a', marginBottom: '.4rem' }}>{f.title}</h3>
                <p style={{ fontSize: '.875rem', color: '#64748b', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────── */}
      <section style={{ maxWidth: '72rem', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="section-label">Process</div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, letterSpacing: '-.025em', color: '#0f172a', marginTop: '.5rem' }}>
            Three steps. That's it.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem' }}>
          {[
            { n: '01', title: 'Upload', desc: 'Drag & drop or click to select. Stays 100% in your browser.' },
            { n: '02', title: 'Process', desc: 'WebAssembly runs the tool client-side — fast and private.' },
            { n: '03', title: 'Download', desc: 'Click download. No account, no email, no watermarks.' },
          ].map(s => (
            <div key={s.n} style={{ textAlign: 'center' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'linear-gradient(135deg,#4f46e5,#2563eb)',
                color: '#fff', fontWeight: 800, fontSize: '1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1rem', boxShadow: '0 4px 14px rgba(79,70,229,.35)',
              }}>{s.n}</div>
              <h3 style={{ fontWeight: 700, color: '#0f172a', marginBottom: '.4rem' }}>{s.title}</h3>
              <p style={{ fontSize: '.875rem', color: '#64748b', lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA banner ──────────────────────────────────────────── */}
      <section style={{ maxWidth: '72rem', margin: '0 auto 4rem', padding: '0 1.5rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #4f46e5, #2563eb)',
          borderRadius: '1.5rem',
          padding: '3rem 2rem',
          textAlign: 'center',
          boxShadow: '0 16px 48px rgba(79,70,229,.3)',
        }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '.75rem' }}>Ready to try it?</h2>
          <p style={{ color: 'rgba(255,255,255,.7)', marginBottom: '1.75rem', fontSize: '1rem' }}>
            No signup. No upload. Just pick a tool and go.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {tools.map(t => (
              <Link key={t.href} href={t.href} style={{ textDecoration: 'none' }}>
                <span className="cta-link" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '.4rem',
                  background: 'rgba(255,255,255,.15)', color: '#fff',
                  border: '1.5px solid rgba(255,255,255,.25)',
                  padding: '.5rem 1.1rem', borderRadius: '.75rem',
                  fontSize: '.875rem', fontWeight: 600,
                }}>
                  {t.icon} {t.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
