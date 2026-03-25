'use client';
import { useState, useRef, useEffect } from 'react';
import QRCodeStyling from 'qr-code-styling';
import AdUnit from '../../components/AdUnit';
import { useToast } from '../../components/Toast';

type DotType = 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';

const DOT_STYLES: { value: DotType; label: string }[] = [
  { value: 'rounded', label: 'Rounded' },
  { value: 'dots', label: 'Dots' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy+' },
  { value: 'square', label: 'Square' },
  { value: 'extra-rounded', label: 'Soft' },
];

export default function QRPage() {
  const { toast } = useToast();
  const [text, setText] = useState('https://example.com');
  const [dotColor, setDotColor] = useState('#1d4ed8');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [dotStyle, setDotStyle] = useState<DotType>('rounded');
  const [size, setSize] = useState(300);
  const ref = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    qrRef.current = new QRCodeStyling({
      width: size, height: size,
      data: text || ' ',
      dotsOptions: { color: dotColor, type: dotStyle },
      backgroundOptions: { color: bgColor },
      qrOptions: { errorCorrectionLevel: 'M' },
    });
    if (ref.current) {
      ref.current.innerHTML = '';
      qrRef.current.append(ref.current);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    qrRef.current?.update({
      data: text || ' ',
      width: size,
      height: size,
      dotsOptions: { color: dotColor, type: dotStyle },
      backgroundOptions: { color: bgColor },
    });
  }, [text, dotColor, bgColor, dotStyle, size]);

  const download = (ext: 'png' | 'svg') => {
    if (!text.trim()) { toast('Enter text or URL first.', 'error'); return; }
    qrRef.current?.download({ name: 'qrcode', extension: ext });
    toast(`Downloading QR code as ${ext.toUpperCase()}`, 'success');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Free QR Code Generator — Custom Colors &amp; Styles</h1>
      <p className="text-gray-500 mb-6">Generate custom QR codes with colors, dot styles, and backgrounds. Download as PNG or SVG.</p>

      <AdUnit slot="qr-top" />

      <div className="grid md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">URL or Text</label>
            <input
              type="text" value={text}
              onChange={e => setText(e.target.value)}
              placeholder="https://example.com"
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Dot Style</label>
            <div className="flex flex-wrap gap-2">
              {DOT_STYLES.map(d => (
                <button
                  key={d.value}
                  onClick={() => setDotStyle(d.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${dotStyle === d.value ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'}`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Dot Color</label>
              <div className="flex items-center gap-2">
                <input type="color" value={dotColor} onChange={e => setDotColor(e.target.value)}
                  className="h-9 w-12 rounded cursor-pointer border border-gray-300" />
                <input type="text" value={dotColor} onChange={e => setDotColor(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm w-24 font-mono" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Background</label>
              <div className="flex items-center gap-2">
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}
                  className="h-9 w-12 rounded cursor-pointer border border-gray-300" />
                <input type="text" value={bgColor} onChange={e => setBgColor(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm w-24 font-mono" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Size: <span className="text-blue-600 font-bold">{size}×{size}px</span>
            </label>
            <input
              type="range" min={150} max={600} step={50} value={size}
              onChange={e => setSize(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>150px</span><span>600px</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => download('png')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm"
            >
              Download PNG
            </button>
            <button
              onClick={() => download('svg')}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-4 py-2.5 rounded-lg transition-colors border border-gray-300 text-sm"
            >
              Download SVG
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center justify-center">
          <div className="border-2 border-gray-100 rounded-2xl p-4 shadow-sm">
            <div ref={ref} />
          </div>
          <p className="text-xs text-gray-400 mt-2">Live preview</p>
        </div>
      </div>

      <AdUnit slot="qr-mid" format="rectangle" />

      <div className="mt-12 space-y-6 text-sm text-gray-600">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">How to generate a QR code</h2>
          <p>Enter any URL or text, choose your dot style and colors, adjust the size, then download as PNG or SVG. SVG format is infinitely scalable — ideal for print and logos.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">FAQ</h2>
          <div className="space-y-2">
            <p><strong>Can I use these QR codes commercially?</strong> Yes, no restrictions.</p>
            <p><strong>What is the difference between PNG and SVG?</strong> PNG is a raster format (best for web). SVG is vector — it stays sharp at any size (best for print, logos).</p>
            <p><strong>How large should the QR code be for scanning?</strong> At least 2cm×2cm in print. For screen, 200px+ is fine.</p>
            <p><strong>Do QR codes expire?</strong> Static QR codes (like this one) never expire.</p>
          </div>
        </div>
      </div>

      <AdUnit slot="qr-bottom" />
    </div>
  );
}
