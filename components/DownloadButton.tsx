interface DownloadButtonProps {
  url: string;
  filename: string;
  label?: string;
}

export default function DownloadButton({ url, filename, label = 'Download' }: DownloadButtonProps) {
  return (
    <a
      href={url}
      download={filename}
      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
    >
      {label}
    </a>
  );
}
