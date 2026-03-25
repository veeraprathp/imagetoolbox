'use client';
import { useState, useEffect } from 'react';
import DropZone from '../../components/DropZone';
import AdUnit from '../../components/AdUnit';
import BeforeAfter from '../../components/BeforeAfter';
import { useToast } from '../../components/Toast';

const BRAND = '#7c3aed';
const LIGHT  = '#f5f3ff';

export default function RemoveBgPage() {
  const { toast } = useToast();
  const [result, setResult]             = useState<string | null>(null);
  const [originalUrl, setOriginalUrl]   = useState<string | null>(null);
  const [loading, setLoading]           = useState(false);
  const [progress, setProgress]         = useState(0);
  const [progressLabel, setProgressLabel] = useState('');
  const [origName, setOrigName]         = useState('image.png');

  useEffect(() => () => { if (originalUrl) URL.revokeObjectURL(originalUrl); }, [originalUrl]);
  useEffect(() => () => { if (result) URL.revokeObjectURL(result); }, [result]);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) { toast('Please upload an image file.', 'error'); return; }
    setOrigName(file.name);
    setResult(null);
    setOriginalUrl(URL.createObjectURL(file));
    setLoading(true);
    setProgress(5);
    setProgressLabel('Loading AI model…');
    try {
      const { removeBackground } = await import('@imgly/background-removal');
      setProgress(30);
      setProgressLabel('Analysing image…');
      const blob = await removeBackground(file, {
        progress: (key: string, current: number, total: number) => {
          if (total > 0) {
            setProgress(Math.min(90, Math.round((current / total) * 60) + 30));
            setProgressLabel(key.includes('fetch') ? 'Downloading AI model…' : 'Removing background…');
          }
        },
      });
      setProgress(100);
      setResult(URL.createObjectURL(blob));
      toast('Background removed!', 'success');
    } catch (e) {
      toast('Removal failed. Try a clearer image.', 'error');
      console.error(e);
    } finally {
      setLoading(false);
      setProgress(0);
      setProgressLabel('');
    }
  };

  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, ${LIGHT} 0%, #fff 100%)`, borderBottom: '1px solid #ddd6fe', padding: '2.5rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: BRAND, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '1.25rem' }}>✂️</span>
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-.025em' }}>Background Remover</h1>
              <p style={{ margin: 0, fontSize: '.85rem', color: '#64748b' }}>Free · AI-powered · Runs in browser</p>
            </div>
          </div>
          <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.65, margin: 0 }}>
            Remove backgrounds instantly with AI that runs entirely in your browser. No upload, no server, 100% private. Download transparent PNG.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '48rem', margin: '2rem auto', padding: '0 1.5rem' }}>
        <AdUnit slot="rmbg-top" />

        <DropZone onFile={handleFile} label="Drop image here to remove background" />

        {loading && (
          <div style={{ marginTop: '1.5rem', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '1.25rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.5rem' }}>
              <span style={{ fontSize: '.875rem', color: '#374151', fontWeight: 500 }}>{progressLabel}</span>
              <span style={{ fontSize: '.875rem', fontWeight: 700, color: BRAND }}>{progress}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${BRAND}, #6d28d9)` }} />
            </div>
            <p style={{ fontSize: '.78rem', color: '#94a3b8', marginTop: '.75rem' }}>
              ℹ️ First run downloads the AI model (~40MB) and caches it. Subsequent uses are instant.
            </p>
          </div>
        )}

        {originalUrl && result && (
          <div style={{ marginTop: '1.75rem' }}>
            <div className="result-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#059669', marginBottom: '.2rem' }}>✓ Background removed</div>
                <div style={{ fontSize: '.825rem', color: '#64748b' }}>Transparent PNG ready to download</div>
              </div>
              <a href={result} download={`no-bg_${origName.replace(/\.[^.]+$/, '')}.png`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', background: `linear-gradient(135deg,${BRAND},#6d28d9)`, color: '#fff', fontWeight: 600, fontSize: '.875rem', padding: '.6rem 1.25rem', borderRadius: '.75rem', textDecoration: 'none', boxShadow: `0 2px 8px rgba(124,58,237,.35)` }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download PNG
              </a>
            </div>
            <BeforeAfter before={originalUrl} after={result} beforeLabel="Original" afterLabel="Background Removed" />
            <div style={{ marginTop: '1.25rem' }}>
              <p style={{ fontSize: '.85rem', fontWeight: 600, color: '#64748b', marginBottom: '.5rem' }}>Transparency preview:</p>
              <div className="checkerboard" style={{ display: 'inline-block', borderRadius: '1rem', overflow: 'hidden' }}>
                <img src={result} alt="No background" style={{ maxHeight: 180, display: 'block' }} />
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '2rem' }}><AdUnit slot="rmbg-mid" format="rectangle" /></div>

        <div style={{ marginTop: '3rem', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '1.25rem', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Frequently Asked Questions</h2>
          {[
            ['Is my image uploaded?', 'No. The AI runs entirely in your browser using WebAssembly — your image never leaves your device.'],
            ['Why does the first run take longer?', 'The AI model (~40MB) is downloaded once and cached in your browser. After that, removal is instant.'],
            ['What works best?', 'Photos with clear subjects (people, products, animals) on distinct backgrounds.'],
            ['What is the output format?', 'PNG with a transparent background.'],
          ].map(([q, a]) => (
            <div key={q} className="faq-item">
              <div style={{ fontWeight: 600, color: '#374151', marginBottom: '.3rem', fontSize: '.9rem' }}>{q}</div>
              <div style={{ color: '#64748b', fontSize: '.875rem' }}>{a}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem' }}><AdUnit slot="rmbg-bottom" /></div>
      </div>
    </div>
  );
}
