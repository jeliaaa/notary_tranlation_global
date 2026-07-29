'use client';

import { Share2 } from 'lucide-react';

interface Props {
  title: string;
  label: string;
  copiedLabel: string;
}

export default function BlogShareButton({ title, label, copiedLabel }: Props) {
  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, text: title, url });
        return;
      } catch {
        // user cancelled or share failed — fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      alert(copiedLabel);
    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center ml-auto text-primary-600 hover:text-primary-800"
      aria-label={label}
    >
      <Share2 className="w-5 h-5 mr-1" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
