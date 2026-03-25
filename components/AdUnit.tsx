'use client';
interface AdUnitProps {
  slot: string;
  format?: 'banner' | 'rectangle';
}

export default function AdUnit({ slot, format = 'banner' }: AdUnitProps) {
  const dims = format === 'rectangle' ? 'w-[300px] h-[250px]' : 'w-full h-[90px]';
  return (
    <div className={`${dims} bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-xs mx-auto my-4`}>
      Ad — slot {slot}
    </div>
  );
}
