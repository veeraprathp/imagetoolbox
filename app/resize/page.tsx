'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import Pica from 'pica';
import DropZone from '../../components/DropZone';
import DownloadButton from '../../components/DownloadButton';
import AdUnit from '../../components/AdUnit';
import BeforeAfter from '../../components/BeforeAfter';
import { useToast } from '../../components/Toast';

const PRESETS = [
  { label: 'Instagram Post',    w: 1080, h: 1080 },
  { label: 'Instagram Story',   w: 1080, h: 1920 },
  { label: 'Twitter/X Post',    w: 1200, h: 675  },
  { label: 'Facebook Cover',    w: 820,  h: 312  },
  { label: 'LinkedIn Post',     w: 1200, h: 627  },
  { label: 'YouTube Thumbnail', w: 1280, h: 720  },
  { label: 'A4 Print (150dpi)', w: 1240, h: 1754 },
];

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

  // Keep latest width/height/lockRatio in refs so handleFile never captures stale state
  const widthRef     = useRef(width);
  const heightRef    = useRef(height);
  const lockRatioRef = useRef(lockRatio);
  useEffect(() => { widthRef.current = width; }, [width]);
  useEffect(() => { heightRef.current = height; }, [height]);
  useEffect(() => { lockRatioRef.current = lockRatio; }, [lockRatio]);

  // Revoke previous object URLs to prevent memory leaks
  useEffect(() => () => { if (originalUrl) URL.revokeObjectURL(originalUrl); }, [originalUrl]);
  useEffect(() => () => { if (result) URL.revokeObjectURL(result); }, [result]);

  const handleWidthChange = useCallback((val: number) => {
    setWidth(val);
    widthRef.current = val;
    if (lockRatioRef.current && originalRatio) {
      const newH = Math.round(val / originalRatio);
      setHeight(newH);
      heightRef.current = newH;
    }
  }, [originalRatio]);

  const handleHeightChange = useCallback((val: number) => {
    setHeight(val);
    heightRef.current = val;
    if (lockRatioRef.current && originalRatio) {
      const newW = Math.round(val * originalRatio);
      setWidth(newW);
      widthRef.current = newW;
    }
  }, [originalRatio]);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast('Please upload an image file.', 'error');
      return;
    }

    setOrigName(file.name);
    setResult(null);
    setOriginalUrl(URL.createObjectURL(file));

    const img = new Image();
    img.src = URL.createObjectURL(file);
    await new Promise<void>(r => { img.onload = () => r(); });

    const ratio = img.naturalWidth / img.naturalHeight;
    setOriginalRatio(ratio);

    // Calculate the actual output height — read from ref to get latest value, then
    // apply aspect ratio lock locally so the canvas uses the correct dimensions immediately
    const targetW = widthRef.current;
    let targetH = heightRef.current;
    if (lockRatioRef.current) {
      targetH = Math.round(targetW / ratio);
      setHeight(targetH);
      heightRef.current = targetH;
    }

    setLoading(true);
    try {
      const pica = new Pica();
      const from = document.createElement('canvas');
      from.width  = img.naturalWidth;
      from.height = img.naturalHeight;
      from.getContext('2d')!.drawImage(img, 0, 0);

      const to = document.createElement('canvas');
      to.width  = targetW;
      to.height = targetH;
      await pica.resize(from, to);

      setResult(to.toDataURL('image/png'));
      toast(`Resized to ${targetW}×${targetH}px`, 'success');
    } catch {
      toast('Resize failed. Try a different image.', 'error');
    } finally {
      setLoading(false);
      URL.revokeObjectURL(img.src);
    }
  };

  const applyPreset = (w: number, h: number) => {
    setWidth(w);  widthRef.current = w;
    setHeight(h); heightRef.current = h;
    setLockRatio(false); lockRatioRef.current = false;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Resize Image Online Free — Set Width &amp; Height Instantly</h1>
      <p className="text-gray-500 mb-6">Resize any image to exact dimensions. Aspect-ratio lock, social media presets. 100% browser-based.</p>

      <AdUnit slot="resize-top" />

      <div className="bg-gray-50 rounded-2xl p-5 mb-6 space-y-5">
        {/* Dimension inputs */}
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Width (px)</label>
            <input
              type="number" min={1} max={8000} value={width}
              onChange={e => handleWidthChange(Number(e.target.value))}
              className="border border-gray-300 rounded-lg px-3 py-2 w-28 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            onClick={() => { setLockRatio(v => { lockRatioRef.current = !v; return !v; }); }}
            className={`mb-0.5 p-2 rounded-lg border transition-colors ${lockRatio ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 border-gray-300'}`}
            title={lockRatio ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {lockRatio
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              }
            </svg>
          </button>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Height (px)</label>
            <input
              type="number" min={1} max={8000} value={height}
              onChange={e => handleHeightChange(Number(e.target.value))}
              className="border border-gray-300 rounded-lg px-3 py-2 w-28 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <span className="text-xs text-gray-400 mb-1">{lockRatio ? 'Ratio locked' : 'Ratio unlocked'}</span>
        </div>

        {/* Presets */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Social Media Presets</label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map(p => (
              <button
                key={p.label}
                onClick={() => applyPreset(p.w, p.h)}
                className="text-xs px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                {p.label}
                <span className="text-gray-400 ml-1">{p.w}×{p.h}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <DropZone onFile={handleFile} label={`Drop image here to resize to ${width}×${height}px`} />

      {loading && (
        <div className="mt-4 flex items-center justify-center gap-3 text-blue-600">
          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="font-medium">Resizing…</span>
        </div>
      )}

      {originalUrl && result && (
        <div className="mt-8 space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-green-800">Resized to {width}×{height}px</span>
            <DownloadButton url={result} filename={`resized_${origName.replace(/\.[^.]+$/, '')}.png`} label="Download PNG" />
          </div>
          <BeforeAfter before={originalUrl} after={result} beforeLabel="Original" afterLabel={`${width}×${height}`} />
        </div>
      )}

      <AdUnit slot="resize-mid" format="rectangle" />

      <div className="mt-12 space-y-6 text-sm text-gray-600">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">How to resize an image</h2>
          <p>Set your target width and height, or pick a social media preset. Enable the aspect ratio lock to resize proportionally. Drop your image and download the result.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">FAQ</h2>
          <div className="space-y-2">
            <p><strong>What does aspect ratio lock do?</strong> When locked, changing width automatically updates height to maintain the original proportions, and vice versa.</p>
            <p><strong>Is my image uploaded?</strong> No. Resize runs in your browser via Pica (WebGL/Canvas).</p>
            <p><strong>What is the output format?</strong> PNG. For smaller files, use our Image Compressor after resizing.</p>
          </div>
        </div>
      </div>

      <AdUnit slot="resize-bottom" />
    </div>
  );
}
