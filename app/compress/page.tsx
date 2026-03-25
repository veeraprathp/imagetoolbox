'use client';
import { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import DropZone from '../../components/DropZone';
import DownloadButton from '../../components/DownloadButton';
import AdUnit from '../../components/AdUnit';
import BeforeAfter from '../../components/BeforeAfter';
import { useToast } from '../../components/Toast';

const MAX_FILE_MB = 20;
type OutputFormat = 'jpeg' | 'png' | 'webp';

export default function CompressPage() {
  const { toast } = useToast();
  const [original, setOriginal]     = useState<{ file: File; url: string } | null>(null);
  const [compressed, setCompressed] = useState<{ url: string; size: number } | null>(null);
  const [loading, setLoading]       = useState(false);
  const [quality, setQuality]       = useState(0.8);
  const [format, setFormat]         = useState<OutputFormat>('jpeg');

  // Revoke object URLs when they change to prevent memory leaks
  useEffect(() => () => { if (original?.url) URL.revokeObjectURL(original.url); }, [original?.url]);
  useEffect(() => () => { if (compressed?.url) URL.revokeObjectURL(compressed.url); }, [compressed?.url]);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast('Please upload an image file (JPEG, PNG, WebP, GIF)', 'error');
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      toast(`File too large. Maximum size is ${MAX_FILE_MB}MB.`, 'error');
      return;
    }

    setOriginal({ file, url: URL.createObjectURL(file) });
    setCompressed(null);
    setLoading(true);

    try {
      const result = await imageCompression(file, {
        maxSizeMB: 10,
        useWebWorker: true,
        initialQuality: quality,
        fileType: `image/${format}`,
      });
      setCompressed({ url: URL.createObjectURL(result), size: result.size });
      const saving = Math.round((1 - result.size / file.size) * 100);
      toast(`Compressed! ${saving > 0 ? `${saving}% smaller` : 'File already optimized'}`, 'success');
    } catch {
      toast('Compression failed. Try a different image.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const savings = original && compressed
    ? Math.round((1 - compressed.size / original.file.size) * 100)
    : 0;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Free Image Compressor — Compress JPEG, PNG, WebP Online</h1>
      <p className="text-gray-500 mb-6">Reduce image file size without losing quality. 100% in your browser — no upload needed.</p>

      <AdUnit slot="compress-top" />

      <div className="bg-gray-50 rounded-2xl p-5 mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Quality: <span className="text-blue-600 font-bold">{Math.round(quality * 100)}%</span>
          </label>
          <input
            type="range" min={0.1} max={1} step={0.05} value={quality}
            onChange={e => setQuality(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Smallest file</span><span>Best quality</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Output Format</label>
          <div className="flex gap-2">
            {(['jpeg', 'png', 'webp'] as OutputFormat[]).map(f => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${format === f ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'}`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <DropZone onFile={handleFile} label="Drop image here or click to upload (max 20MB)" />

      {loading && (
        <div className="mt-4 flex items-center justify-center gap-3 text-blue-600">
          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="font-medium">Compressing…</span>
        </div>
      )}

      {original && compressed && (
        <div className="mt-8 space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex flex-wrap items-center gap-4">
            <div className="flex-1 space-y-1 text-sm">
              <div className="flex gap-6">
                <span className="text-gray-600">Original: <strong>{(original.file.size / 1024).toFixed(1)} KB</strong></span>
                <span className="text-gray-600">Compressed: <strong>{(compressed.size / 1024).toFixed(1)} KB</strong></span>
              </div>
              <div className="text-green-700 font-semibold">
                {savings > 0 ? `Saved ${savings}% of file size` : 'File already well optimized'}
              </div>
            </div>
            <DownloadButton
              url={compressed.url}
              filename={`compressed_${original.file.name.replace(/\.[^.]+$/, '')}.${format}`}
              label="Download"
            />
          </div>

          <BeforeAfter
            before={original.url}
            after={compressed.url}
            beforeLabel={`Original (${(original.file.size / 1024).toFixed(0)}KB)`}
            afterLabel={`Compressed (${(compressed.size / 1024).toFixed(0)}KB)`}
          />
        </div>
      )}

      <AdUnit slot="compress-mid" format="rectangle" />

      <div className="mt-12 space-y-6 text-sm text-gray-600">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">How to compress an image</h2>
          <p>Adjust the quality slider and output format, then drop your image. The before/after slider lets you compare quality vs. file size at a glance. Supports JPEG, PNG, WebP, GIF, BMP.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">FAQ</h2>
          <div className="space-y-2">
            <p><strong>Is this free?</strong> Yes, completely free with no limits.</p>
            <p><strong>Is my image uploaded?</strong> No. Everything runs in your browser using WebAssembly.</p>
            <p><strong>What is the best format for web?</strong> WebP gives the best compression. JPEG for photos, PNG for graphics with transparency.</p>
            <p><strong>What is the maximum file size?</strong> 20MB per image.</p>
          </div>
        </div>
      </div>

      <AdUnit slot="compress-bottom" />
    </div>
  );
}
