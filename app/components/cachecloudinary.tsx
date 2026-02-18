'use client';

import React, { useEffect, useState, useRef } from 'react';

interface CacheCloudinaryProps {
  assetUrl: string;
  type: 'video' | 'image';
  className?: string;
  alt?: string;
}

// So basically it will download a image or vid from cloudinary and put it in ur local memory cache to save number of calls
export default function CacheCloudinary({ assetUrl, type, className = '', alt }: CacheCloudinaryProps) {
  const [highQualityLocalUrl, setHighQualityLocalUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const highQualityUrl = assetUrl.replace('/upload/', '/upload/q_100,f_auto,vc_auto/');

  useEffect(() => {
    if (!assetUrl) return;

    let isMounted = true;

    fetch(highQualityUrl, { cache: 'force-cache' })
      .then((res) => {
        if (!res.ok) throw new Error('HQ fetch failed');
        return res.blob();
      })
      .then((blob) => {
        if (isMounted) {
          const localUrl = URL.createObjectURL(blob);
          setHighQualityLocalUrl(localUrl);

          if (type === 'video' && videoRef.current) {
            const currentTime = videoRef.current.currentTime;
            const wasPlaying = !videoRef.current.paused;
            videoRef.current.src = localUrl;
            videoRef.current.load();
            videoRef.current.currentTime = currentTime;
            if (wasPlaying) videoRef.current.play().catch(() => {});
          }
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
      if (highQualityLocalUrl) URL.revokeObjectURL(highQualityLocalUrl);
    };
  }, [assetUrl, highQualityUrl, type]);

  if (type === 'video') {
    return (
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`w-full h-full object-cover ${className}`}
        src={highQualityLocalUrl || assetUrl}
      />
    );
  }

  return (
    <img
      src={highQualityLocalUrl || assetUrl}
      alt={alt || ''}
      className={className}
      loading="lazy"
    />
  );
}
