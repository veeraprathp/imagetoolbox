'use client';
import { useState, useRef, useEffect } from 'react';
import QRCodeStyling from 'qr-code-styling';
import AdUnit from '../../components/AdUnit';
import { useToast } from '../../components/Toast';

const BRAND = '#d97706';
const LIGHT  = '#fffbeb';

type DotType = 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';

const DOT_STYLES: { value: DotType; label: string }[] = [
  { value: 'rounded',       label: 'Rounded'  },
  { value: 'dots',          label: 'Dots'     },
  { value: 'classy',        label: 'Classy'   },
  { value: 'classy-rounded',label: 'Soft+' },
  { value: 'square',        label: 'Square'   },
  { value: 'extra-rounded', label: 'Bubble'   },
];

export default function QRPage() {
  const { toast } = useToast();
  const [text,     setText]     = useState('https://example.com');
  const [dotColor, setDotColor] = useState('#1d4ed8');
  const [bgColor,  setBgColor]  = useState('#ffffff');
  const [dotStyle, setDotStyle] = useState<DotType>('rounded');
  const [size,     setSize]     = useState(300);
  const ref    = useRef<HTMLDivElement>(null);
  const qrRef  = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    qrRef.current = new QRCodeStyling({
      width: size, height: size,
      data: text || ' ',
      dotsOptions: { color: dotColor, type: dotStyle },
      backgroundOptions: { color: bgColor },
      qrOptions: { errorCorrectionLevel: 'M' },
    });
    if (ref.current) { ref.current.innerHTML = ''; qrRef.current.append(ref.current); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    qrRef.current?.update({ data: text || ' ', width: size, height: size, dotsOptions: { color: dotColor, type: dotStyle }, backgroundOptions: { color: bgColor } });
  }, [text, dotColor, bgColor, dotStyle, size]);

  const download = (ext: 'png' | 'svg') => {
    if (!text.trim()) { toast('Enter text or URL first.', 'error'); return; }
    qrRef.current?.download({ name: 'qrcode', extension: ext });
    toast(`QR code downloaded as ${ext.toUpperCase()}`, 'success');
  };

  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, ${LIGHT} 0%, #fff 100%)`, borderBottom: '1px solid #fcd34d', padding: '2.5rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: BRAND, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '1.25rem' }}>📱</span>
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-.025em' }}>QR Code Generator</h1>
              <p style={{ margin: 0, fontSize: '.85rem', color: '#64748b' }}>Free · Custom styles · PNG & SVG export</p>
            </div>
          </div>
          <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.65, margin: 0 }}>
            Generate custom QR codes with colors, dot styles, and backgrounds. Download as PNG or infinitely-scalable SVG.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '56rem', margin: '2rem auto', padding: '0 1.5rem' }}>
        <AdUnit slot="qr-top" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem', alignItems: 'start' }}>
          {/* Controls */}
          <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '1.25rem', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,.05)' }}>
            <h2 style={{ margin: '0 0 1.25rem', fontSize: '.875rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '.06em' }}>Customize</h2>

            {/* URL input */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: '#64748b', marginBottom: '.4rem' }}>URL or Text</label>
              <input type="text" value={text} onChange={e => setText(e.target.value)}
                placeholder="https://example.com"
                className="field"
              />
            </div>

            {/* Dot style */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: '#64748b', marginBottom: '.5rem' }}>Dot Style</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
                {DOT_STYLES.map(d => (
                  <button key={d.value} onClick={() => setDotStyle(d.value)}
                    style={{
                      padding: '.35rem .8rem', borderRadius: 9999, fontSize: '.78rem', fontWeight: 600,
                      border: '1.5px solid', cursor: 'pointer', transition: 'all .15s',
                      borderColor: dotStyle === d.value ? BRAND : '#e2e8f0',
                      background: dotStyle === d.value ? LIGHT : '#fff',
                      color: dotStyle === d.value ? '#92400e' : '#64748b',
                    }}>{d.label}</button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <div>
                <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: '#64748b', marginBottom: '.4rem' }}>Dot Color</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <input type="color" value={dotColor} onChange={e => setDotColor(e.target.value)}
                    style={{ width: 36, height: 36, borderRadius: 8, border: '1.5px solid #e2e8f0', cursor: 'pointer', padding: 2 }} />
                  <input type="text" value={dotColor} onChange={e => setDotColor(e.target.value)}
                    className="field" style={{ width: 90, fontFamily: 'monospace', fontSize: '.8rem' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: '#64748b', marginBottom: '.4rem' }}>Background</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}
                    style={{ width: 36, height: 36, borderRadius: 8, border: '1.5px solid #e2e8f0', cursor: 'pointer', padding: 2 }} />
                  <input type="text" value={bgColor} onChange={e => setBgColor(e.target.value)}
                    className="field" style={{ width: 90, fontFamily: 'monospace', fontSize: '.8rem' }} />
                </div>
              </div>
            </div>

            {/* Size */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.4rem' }}>
                <label style={{ fontSize: '.8rem', fontWeight: 600, color: '#64748b' }}>Size</label>
                <span style={{ fontSize: '.8rem', fontWeight: 700, color: BRAND }}>{size}×{size}px</span>
              </div>
              <input type="range" min={150} max={600} step={50} value={size} onChange={e => setSize(Number(e.target.value))} style={{ width: '100%' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.72rem', color: '#94a3b8', marginTop: '.2rem' }}>
                <span>150px</span><span>600px</span>
              </div>
            </div>

            {/* Download buttons */}
            <div style={{ display: 'flex', gap: '.75rem' }}>
              <button onClick={() => download('png')}
                style={{ flex: 1, padding: '.65rem 1rem', background: `linear-gradient(135deg,${BRAND},#b45309)`, color: '#fff', fontWeight: 700, border: 'none', borderRadius: '.75rem', cursor: 'pointer', fontSize: '.875rem', boxShadow: '0 2px 8px rgba(217,119,6,.35)' }}>
                ↓ Download PNG
              </button>
              <button onClick={() => download('svg')}
                style={{ flex: 1, padding: '.65rem 1rem', background: '#fff', color: '#374151', fontWeight: 700, border: '1.5px solid #e2e8f0', borderRadius: '.75rem', cursor: 'pointer', fontSize: '.875rem' }}>
                ↓ Download SVG
              </button>
            </div>
          </div>

          {/* Live Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.75rem' }}>
            <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '1.25rem', padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,.05)' }}>
              <div ref={ref} />
            </div>
            <span style={{ fontSize: '.75rem', color: '#94a3b8', fontWeight: 500 }}>Live preview</span>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}><AdUnit slot="qr-mid" format="rectangle" /></div>

        <div style={{ marginTop: '3rem', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '1.25rem', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Frequently Asked Questions</h2>
          {[
            ['Can I use these QR codes commercially?', 'Yes, no restrictions whatsoever.'],
            ['What is the difference between PNG and SVG?', 'PNG is a raster format (best for web & sharing). SVG is vector — stays sharp at any size (best for print and logos).'],
            ['How large should a QR code be for scanning?', 'At least 2cm×2cm in print. For screen display, 200px+ is fine.'],
            ['Do static QR codes expire?', 'Never. Static QR codes (like these) are permanent.'],
          ].map(([q, a]) => (
            <div key={q} className="faq-item">
              <div style={{ fontWeight: 600, color: '#374151', marginBottom: '.3rem', fontSize: '.9rem' }}>{q}</div>
              <div style={{ color: '#64748b', fontSize: '.875rem' }}>{a}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem' }}><AdUnit slot="qr-bottom" /></div>
      </div>
    </div>
  );
}
