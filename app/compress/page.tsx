'use client';
import { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import DropZone from '../../components/DropZone';
import AdUnit from '../../components/AdUnit';
import BeforeAfter from '../../components/BeforeAfter';
import { useToast } from '../../components/Toast';

const MAX_FILE_MB = 20;
type OutputFormat = 'jpeg' | 'png' | 'webp';

const BRAND = '#2563eb';
const LIGHT  = '#eff6ff';

function Spinner() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </svg>
  );
}

export default function CompressPage() {
  const { toast } = useToast();
  const [original, setOriginal]     = useState<{ file: File; url: string } | null>(null);
  const [compressed, setCompressed] = useState<{ url: string; size: number } | null>(null);
  const [loading, setLoading]       = useState(false);
  const [quality, setQuality]       = useState(0.8);
  const [format, setFormat]         = useState<OutputFormat>('jpeg');

  useEffect(() => () => { if (original?.url) URL.revokeObjectURL(original.url); }, [original?.url]);
  useEffect(() => () => { if (compressed?.url) URL.revokeObjectURL(compressed.url); }, [compressed?.url]);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) { toast('Please upload an image file.', 'error'); return; }
    if (file.size > MAX_FILE_MB * 1024 * 1024) { toast(`Max file size is ${MAX_FILE_MB}MB.`, 'error'); return; }
    setOriginal({ file, url: URL.createObjectURL(file) });
    setCompressed(null);
    setLoading(true);
    try {
      const result = await imageCompression(file, { maxSizeMB: 10, useWebWorker: true, initialQuality: quality, fileType: `image/${format}` });
      setCompressed({ url: URL.createObjectURL(result), size: result.size });
      const saving = Math.round((1 - result.size / file.size) * 100);
      toast(`Done! ${saving > 0 ? `${saving}% smaller` : 'Already optimized'}`, 'success');
    } catch { toast('Compression failed. Try a different image.', 'error'); }
    finally { setLoading(false); }
  };

  const savings = original && compressed ? Math.round((1 - compressed.size / original.file.size) * 100) : 0;

  return (
    <div>
      {/* Tool hero */}
      <div style={{ background: `linear-gradient(135deg, ${LIGHT} 0%, #fff 100%)`, borderBottom: '1px solid #bfdbfe', padding: '2.5rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: BRAND, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '1.25rem' }}>🗜️</span>
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-.025em' }}>
                Image Compressor
              </h1>
              <p style={{ margin: 0, fontSize: '.85rem', color: '#64748b' }}>Free · Browser-based · No upload</p>
            </div>
          </div>
          <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.65, maxWidth: '40rem', margin: 0 }}>
            Reduce image file size by up to 90% without visible quality loss. Supports JPEG, PNG, WebP — all processing happens in your browser.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '48rem', margin: '2rem auto', padding: '0 1.5rem' }}>
        <AdUnit slot="compress-top" />

        {/* Settings card */}
        <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,.05)' }}>
          <h2 style={{ margin: '0 0 1.25rem', fontSize: '.875rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '.06em' }}>Settings</h2>

          {/* Quality slider */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.5rem' }}>
              <label style={{ fontSize: '.875rem', fontWeight: 600, color: '#374151' }}>Quality</label>
              <span style={{ fontWeight: 700, color: BRAND, fontSize: '.9rem' }}>{Math.round(quality * 100)}%</span>
            </div>
            <input type="range" min={0.1} max={1} step={0.05} value={quality}
              onChange={e => setQuality(Number(e.target.value))}
              style={{ width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.75rem', color: '#94a3b8', marginTop: '.25rem' }}>
              <span>Smallest file</span><span>Best quality</span>
            </div>
          </div>

          {/* Format */}
          <div>
            <label style={{ display: 'block', fontSize: '.875rem', fontWeight: 600, color: '#374151', marginBottom: '.5rem' }}>Output Format</label>
            <div style={{ display: 'flex', gap: '.5rem' }}>
              {(['jpeg', 'png', 'webp'] as OutputFormat[]).map(f => (
                <button key={f} onClick={() => setFormat(f)}
                  style={{
                    padding: '.4rem 1rem', borderRadius: 9999, border: '1.5px solid',
                    borderColor: format === f ? BRAND : '#e2e8f0',
                    background: format === f ? BRAND : '#fff',
                    color: format === f ? '#fff' : '#64748b',
                    fontWeight: 600, fontSize: '.8rem', cursor: 'pointer',
                    transition: 'all .15s',
                  }}
                >{f.toUpperCase()}</button>
              ))}
            </div>
          </div>
        </div>

        <DropZone onFile={handleFile} label="Drop image here or click to upload (max 20MB)" />

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.75rem', padding: '1.5rem', color: BRAND }}>
            <Spinner />
            <span style={{ fontWeight: 600 }}>Compressing…</span>
          </div>
        )}

        {original && compressed && (
          <div style={{ marginTop: '1.75rem' }}>
            <div className="result-card" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '.25rem' }}>
                  <span style={{ fontSize: '.875rem', color: '#64748b' }}>Original: <strong>{(original.file.size / 1024).toFixed(1)} KB</strong></span>
                  <span style={{ fontSize: '.875rem', color: '#64748b' }}>Compressed: <strong>{(compressed.size / 1024).toFixed(1)} KB</strong></span>
                </div>
                <div style={{ fontWeight: 700, color: '#059669', fontSize: '.95rem' }}>
                  {savings > 0 ? `🎉 Saved ${savings}% of file size` : '✓ File already well optimized'}
                </div>
              </div>
              <a href={compressed.url} download={`compressed_${original.file.name.replace(/\.[^.]+$/, '')}.${format}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '.4rem',
                  background: 'linear-gradient(135deg,#059669,#047857)',
                  color: '#fff', fontWeight: 600, fontSize: '.875rem',
                  padding: '.6rem 1.25rem', borderRadius: '.75rem',
                  textDecoration: 'none', boxShadow: '0 2px 8px rgba(5,150,105,.3)',
                }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download {format.toUpperCase()}
              </a>
            </div>
            <BeforeAfter before={original.url} after={compressed.url}
              beforeLabel={`Original (${(original.file.size/1024).toFixed(0)}KB)`}
              afterLabel={`Compressed (${(compressed.size/1024).toFixed(0)}KB)`}
            />
          </div>
        )}

        <div style={{ marginTop: '2rem' }}><AdUnit slot="compress-mid" format="rectangle" /></div>

        {/* FAQ */}
        <div style={{ marginTop: '3rem', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '1.25rem', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Frequently Asked Questions</h2>
          {[
            ['Is this completely free?', 'Yes. No account, no limits, no watermarks.'],
            ['Is my image uploaded anywhere?', 'Never. Everything runs in your browser using WebAssembly.'],
            ['What format is best for the web?', 'WebP offers the best compression. JPEG for photos, PNG for images requiring transparency.'],
            ['What is the maximum file size?', '20MB per image.'],
          ].map(([q, a]) => (
            <div key={q} className="faq-item">
              <div style={{ fontWeight: 600, color: '#374151', marginBottom: '.3rem', fontSize: '.9rem' }}>{q}</div>
              <div style={{ color: '#64748b', fontSize: '.875rem' }}>{a}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem' }}><AdUnit slot="compress-bottom" /></div>
      </div>
    </div>
  );
}
