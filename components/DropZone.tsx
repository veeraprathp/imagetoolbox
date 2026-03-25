'use client';
import { useCallback, useState } from 'react';

interface DropZoneProps {
  onFile: (file: File) => void;
  accept?: string;
  label?: string;
}

export default function DropZone({ onFile, accept = 'image/*', label = 'Drop image here or click to upload' }: DropZoneProps) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  }, [onFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
    e.target.value = '';
  };

  return (
    <label
      onDrop={handleDrop}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: 200,
        border: `2px dashed ${dragging ? '#4f46e5' : '#cbd5e1'}`,
        borderRadius: '1.25rem',
        background: dragging ? '#f5f3ff' : '#f8fafc',
        cursor: 'pointer',
        padding: '2.5rem 1.5rem',
        textAlign: 'center',
        transition: 'border-color .2s, background .2s',
        userSelect: 'none',
      }}
    >
      {/* Icon circle — explicit width/height to prevent SVG sizing bugs */}
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: dragging ? '#ede9fe' : '#e0e7ff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1rem', flexShrink: 0,
        transition: 'background .2s',
      }}>
        <svg
          width="28" height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke={dragging ? '#4f46e5' : '#6366f1'}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 16 12 12 8 16"/>
          <line x1="12" y1="12" x2="12" y2="21"/>
          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
        </svg>
      </div>

      <p style={{ fontWeight: 600, fontSize: '1rem', color: '#374151', margin: '0 0 .35rem' }}>
        {label}
      </p>
      <p style={{ fontSize: '.825rem', color: '#9ca3af', margin: '0 0 1rem' }}>
        Drag &amp; drop or click to browse
      </p>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '.4rem',
        background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 9999,
        padding: '.3rem .9rem', fontSize: '.78rem', color: '#64748b', fontWeight: 500,
      }}>
        JPEG · PNG · WebP · GIF
      </div>

      <input type="file" accept={accept} style={{ display: 'none' }} onChange={handleChange} />
    </label>
  );
}
