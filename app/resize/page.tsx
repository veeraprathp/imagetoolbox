'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import Pica from 'pica';
import DropZone from '../../components/DropZone';
import AdUnit from '../../components/AdUnit';
import BeforeAfter from '../../components/BeforeAfter';
import { useToast } from '../../components/Toast';

const BRAND = '#059669';
const LIGHT  = '#ecfdf5';

const PRESETS = [
  { label: 'Instagram Post',    w: 1080, h: 1080 },
  { label: 'Instagram Story',   w: 1080, h: 1920 },
  { label: 'Twitter/X Post',    w: 1200, h: 675  },
  { label: 'Facebook Cover',    w: 820,  h: 312  },
  { label: 'LinkedIn Post',     w: 1200, h: 627  },
  { label: 'YouTube Thumb',     w: 1280, h: 720  },
  { label: 'A4 @ 150dpi',       w: 1240, h: 1754 },
];

function Spinner() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </svg>
  );
}

export default function ResizePage() {
  const { toast } = useToast();
  const [width, setWidth]           = useState(800);
  const [height, setHeight]         = useState(600);
  const [lockRatio, setLockRatio]   = useState(true);
  const [originalRatio, setOriginalRatio] = useState<number | null>(null);
  const [result, setResult]         = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [loading, setLoading]       = useState(false);
  const [origName, setOrigName]     = useState('image.png');

  const widthRef     = useRef(width);
  const heightRef    = useRef(height);
  const lockRatioRef = useRef(lockRatio);
  useEffect(() => { widthRef.current = width; }, [width]);
  useEffect(() => { heightRef.current = height; }, [height]);
  useEffect(() => { lockRatioRef.current = lockRatio; }, [lockRatio]);

  useEffect(() => () => { if (originalUrl) URL.revokeObjectURL(originalUrl); }, [originalUrl]);
  useEffect(() => () => { if (result) URL.revokeObjectURL(result); }, [result]);

  const handleWidthChange = useCallback((val: number) => {
    setWidth(val); widthRef.current = val;
    if (lockRatioRef.current && originalRatio) {
      const h = Math.round(val / originalRatio);
      setHeight(h); heightRef.current = h;
    }
  }, [originalRatio]);

  const handleHeightChange = useCallback((val: number) => {
    setHeight(val); heightRef.current = val;
    if (lockRatioRef.current && originalRatio) {
      const w = Math.round(val * originalRatio);
      setWidth(w); widthRef.current = w;
    }
  }, [originalRatio]);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) { toast('Please upload an image file.', 'error'); return; }
    setOrigName(file.name);
    setResult(null);
    setOriginalUrl(URL.createObjectURL(file));
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await new Promise<void>(r => { img.onload = () => r(); });
    const ratio = img.naturalWidth / img.naturalHeight;
    setOriginalRatio(ratio);
    const targetW = widthRef.current;
    let targetH = heightRef.current;
    if (lockRatioRef.current) { targetH = Math.round(targetW / ratio); setHeight(targetH); heightRef.current = targetH; }
    setLoading(true);
    try {
      const pica = new Pica();
      const from = document.createElement('canvas');
      from.width = img.naturalWidth; from.height = img.naturalHeight;
      from.getContext('2d')!.drawImage(img, 0, 0);
      const to = document.createElement('canvas');
      to.width = targetW; to.height = targetH;
      await pica.resize(from, to);
      setResult(to.toDataURL('image/png'));
      toast(`Resized to ${targetW}×${targetH}px`, 'success');
    } catch { toast('Resize failed. Try a different image.', 'error'); }
    finally { setLoading(false); URL.revokeObjectURL(img.src); }
  };

  const applyPreset = (w: number, h: number) => {
    setWidth(w); widthRef.current = w;
    setHeight(h); heightRef.current = h;
    setLockRatio(false); lockRatioRef.current = false;
  };

  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, ${LIGHT} 0%, #fff 100%)`, borderBottom: '1px solid #a7f3d0', padding: '2.5rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: BRAND, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '1.25rem' }}>📐</span>
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-.025em' }}>Image Resizer</h1>
              <p style={{ margin: 0, fontSize: '.85rem', color: '#64748b' }}>Free · Aspect-ratio lock · Social presets</p>
            </div>
          </div>
          <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.65, margin: 0 }}>
            Resize any image to exact pixel dimensions. Lock the aspect ratio, use social media presets, and preview before/after — all in your browser.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '48rem', margin: '2rem auto', padding: '0 1.5rem' }}>
        <AdUnit slot="resize-top" />

        <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,.05)' }}>
          <h2 style={{ margin: '0 0 1.25rem', fontSize: '.875rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '.06em' }}>Dimensions</h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: '#64748b', marginBottom: '.35rem' }}>Width (px)</label>
              <input type="number" min={1} max={8000} value={width}
                onChange={e => handleWidthChange(Number(e.target.value))}
                className="field" style={{ width: 110 }}
              />
            </div>

            <button onClick={() => { setLockRatio(v => { lockRatioRef.current = !v; return !v; }); }}
              style={{
                width: 36, height: 36, borderRadius: 8, border: '1.5px solid',
                borderColor: lockRatio ? BRAND : '#e2e8f0',
                background: lockRatio ? LIGHT : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', flexShrink: 0, marginTop: '1.2rem',
              }}
              title={lockRatio ? 'Unlock ratio' : 'Lock ratio'}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={lockRatio ? BRAND : '#9ca3af'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {lockRatio
                  ? <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>
                  : <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></>
                }
              </svg>
            </button>

            <div>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: '#64748b', marginBottom: '.35rem' }}>Height (px)</label>
              <input type="number" min={1} max={8000} value={height}
                onChange={e => handleHeightChange(Number(e.target.value))}
                className="field" style={{ width: 110 }}
              />
            </div>

            <div style={{ alignSelf: 'flex-end', paddingBottom: '.2rem' }}>
              <span style={{ fontSize: '.78rem', color: lockRatio ? BRAND : '#9ca3af', fontWeight: 600, background: lockRatio ? LIGHT : '#f1f5f9', padding: '.25rem .65rem', borderRadius: 9999 }}>
                {lockRatio ? '🔒 Locked' : '🔓 Unlocked'}
              </span>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: '#64748b', marginBottom: '.5rem' }}>Social Media Presets</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
              {PRESETS.map(p => (
                <button key={p.label} onClick={() => applyPreset(p.w, p.h)}
                  style={{
                    padding: '.3rem .7rem', fontSize: '.75rem', fontWeight: 500,
                    borderRadius: 9999, border: '1.5px solid #e2e8f0', background: '#fff',
                    color: '#64748b', cursor: 'pointer', transition: 'all .15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = BRAND; (e.currentTarget as HTMLElement).style.color = BRAND; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLElement).style.color = '#64748b'; }}>
                  {p.label} <span style={{ color: '#94a3b8' }}>{p.w}×{p.h}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <DropZone onFile={handleFile} label={`Drop image to resize to ${width}×${height}px`} />

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.75rem', padding: '1.5rem', color: BRAND }}>
            <Spinner /><span style={{ fontWeight: 600 }}>Resizing…</span>
          </div>
        )}

        {originalUrl && result && (
          <div style={{ marginTop: '1.75rem' }}>
            <div className="result-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
              <span style={{ fontWeight: 700, color: '#059669' }}>✓ Resized to {width}×{height}px</span>
              <a href={result} download={`resized_${origName.replace(/\.[^.]+$/, '')}.png`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', background: 'linear-gradient(135deg,#059669,#047857)', color: '#fff', fontWeight: 600, fontSize: '.875rem', padding: '.6rem 1.25rem', borderRadius: '.75rem', textDecoration: 'none', boxShadow: '0 2px 8px rgba(5,150,105,.3)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download PNG
              </a>
            </div>
            <BeforeAfter before={originalUrl} after={result} beforeLabel="Original" afterLabel={`${width}×${height}`} />
          </div>
        )}

        <div style={{ marginTop: '2rem' }}><AdUnit slot="resize-mid" format="rectangle" /></div>

        <div style={{ marginTop: '3rem', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '1.25rem', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Frequently Asked Questions</h2>
          {[
            ['What does aspect ratio lock do?', 'When locked, changing width updates height automatically to keep the original proportions, and vice versa.'],
            ['Is my image uploaded?', 'No. Resize runs in your browser via Pica (WebGL/Canvas).'],
            ['What is the output format?', 'PNG. For smaller files, use our Image Compressor after resizing.'],
          ].map(([q, a]) => (
            <div key={q} className="faq-item">
              <div style={{ fontWeight: 600, color: '#374151', marginBottom: '.3rem', fontSize: '.9rem' }}>{q}</div>
              <div style={{ color: '#64748b', fontSize: '.875rem' }}>{a}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem' }}><AdUnit slot="resize-bottom" /></div>
      </div>
    </div>
  );
}
