'use client';
import Link from 'next/link';

const navLinks = [
  { href: '/compress',          label: 'Compress'  },
  { href: '/resize',            label: 'Resize'    },
  { href: '/remove-background', label: 'Remove BG' },
  { href: '/qr-code-generator', label: 'QR Code'   },
];

export default function Header() {
  return (
    <header style={{
      background: '#0f172a',
      borderBottom: '1px solid rgba(255,255,255,.07)',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <style>{`
        .nav-link { color: rgba(255,255,255,.6) !important; text-decoration: none; font-size: .845rem; font-weight: 500; padding: .35rem .75rem; border-radius: .5rem; transition: color .15s, background .15s; }
        .nav-link:hover { color: #fff !important; background: rgba(255,255,255,.08) !important; }
        .nav-feedback { color: rgba(255,255,255,.4); text-decoration: none; font-size: .8rem; font-weight: 500; padding: .35rem .75rem; border-radius: .5rem; border: 1px solid rgba(255,255,255,.1); transition: color .15s, border-color .15s; }
        .nav-feedback:hover { color: rgba(255,255,255,.75); border-color: rgba(255,255,255,.25); }
      `}</style>
      <nav style={{
        maxWidth: '72rem', margin: '0 auto', padding: '.85rem 1.5rem',
        display: 'flex', alignItems: 'center', gap: '1.5rem',
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '.5rem', flexShrink: 0 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: 'linear-gradient(135deg,#4f46e5,#2563eb)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
          <span style={{
            fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-.02em',
            background: 'linear-gradient(135deg,#a5b4fc,#60a5fa)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>ImageToolbox</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '.1rem', flexWrap: 'wrap' }}>
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} className="nav-link">{l.label}</Link>
          ))}
        </div>

        <div style={{ marginLeft: 'auto' }}>
          <Link href="/contact" className="nav-feedback">Feedback</Link>
        </div>
      </nav>
    </header>
  );
}
