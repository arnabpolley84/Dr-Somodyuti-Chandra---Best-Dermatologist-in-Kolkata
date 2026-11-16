import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fallbackLabel?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = 'w-full h-full object-cover',
  loading = 'lazy',
  fallbackLabel,
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [failedAll, setFailedAll] = useState<boolean>(false);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setFailedAll(true);
    }
  };

  if (failedAll) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0F4C54] via-[#175B64] to-[#0B2E33] text-white p-6 text-center"
      >
        <Sparkles className="w-7 h-7 text-[#C49A5B] mb-2 opacity-90" aria-hidden="true" />
        <span className="text-xs font-medium tracking-wide text-white/90">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={loading}
      onError={handleError}
      className={className}
    />
  );
};
