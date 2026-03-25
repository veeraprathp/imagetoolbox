'use client';
import { useState } from 'react';
import DropZone from '../../components/DropZone';
import DownloadButton from '../../components/DownloadButton';
import AdUnit from '../../components/AdUnit';
import BeforeAfter from '../../components/BeforeAfter';
import { useToast } from '../../components/Toast';

export default function RemoveBgPage() {
  const { toast } = useToast();
  const [result, setResult] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('');
  const [origName, setOrigName] = useState('image.png');

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast('Please upload an image file.', 'error');
      return;
    }

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
            const pct = Math.round((current / total) * 60) + 30;
            setProgress(Math.min(90, pct));
            if (key.includes('fetch')) setProgressLabel('Downloading AI model…');
            else setProgressLabel('Removing background…');
          }
        },
      });

      setProgress(100);
      setResult(URL.createObjectURL(blob));
      toast('Background removed successfully!', 'success');
    } catch (e) {
      toast('Background removal failed. Try a clearer image.', 'error');
      console.error(e);
    } finally {
      setLoading(false);
      setProgress(0);
      setProgressLabel('');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Remove Background from Image Free — No Upload Limit</h1>
      <p className="text-gray-500 mb-6">AI-powered background removal that runs entirely in your browser. Private, free, no limits.</p>

      <AdUnit slot="rmbg-top" />

      <DropZone onFile={handleFile} label="Drop image here to remove background" />

      {loading && (
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{progressLabel}</span>
            <span className="font-medium text-blue-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400">First run downloads the AI model (~40MB) and caches it. Subsequent uses are instant.</p>
        </div>
      )}

      {originalUrl && result && (
        <div className="mt-8 space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-green-800">Background removed — transparent PNG ready</span>
            <DownloadButton
              url={result}
              filename={`no-bg_${origName.replace(/\.[^.]+$/, '')}.png`}
              label="Download PNG"
            />
          </div>

          <BeforeAfter
            before={originalUrl}
            after={result}
            beforeLabel="Original"
            afterLabel="Background Removed"
          />

          {/* Transparent preview */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Transparency preview:</p>
            <div className="checkerboard inline-block rounded-xl overflow-hidden">
              <img src={result} alt="Background removed" className="max-h-48" />
            </div>
          </div>
        </div>
      )}

      <AdUnit slot="rmbg-mid" format="rectangle" />

      <div className="mt-12 space-y-6 text-sm text-gray-600">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">How to remove a background</h2>
          <p>Upload any photo. The AI model (ONNX/WebAssembly) runs entirely in your browser and automatically detects and removes the background. The result is a transparent PNG you can use anywhere.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">FAQ</h2>
          <div className="space-y-2">
            <p><strong>Is my image uploaded?</strong> No. The AI runs in your browser — your image never leaves your device.</p>
            <p><strong>Why does it take longer the first time?</strong> The AI model (~40MB) is downloaded once and cached in your browser. After that it is instant.</p>
            <p><strong>What works best?</strong> Photos with clear subjects (people, products, animals) on distinct backgrounds. Complex scenes may need a second pass.</p>
            <p><strong>What output format?</strong> PNG with transparent background.</p>
          </div>
        </div>
      </div>

      <AdUnit slot="rmbg-bottom" />
    </div>
  );
}
