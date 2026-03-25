'use client';
import { useRef, useState, useCallback } from 'react';

interface BeforeAfterProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfter({
  before,
  after,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (dragging.current) updatePosition(e.clientX);
  };
  const onMouseUp = () => { dragging.current = false; };
  const onTouchMove = (e: React.TouchEvent) => updatePosition(e.touches[0].clientX);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-2xl mx-auto select-none overflow-hidden rounded-xl border cursor-col-resize"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
      onTouchEnd={() => { dragging.current = false; }}
    >
      {/* After image — sets container height */}
      <img src={after} alt={afterLabel} className="block w-full h-auto" draggable={false} />

      {/* Before image — absolutely fills container, clipped by clip-path */}
      <img
        src={before}
        alt={beforeLabel}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        draggable={false}
      />

      {/* Divider handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg cursor-col-resize"
        style={{ left: `${position}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={() => { dragging.current = true; }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded pointer-events-none">
        {beforeLabel}
      </span>
      <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded pointer-events-none">
        {afterLabel}
      </span>
    </div>
  );
}
