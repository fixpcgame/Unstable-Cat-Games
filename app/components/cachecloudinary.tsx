'use client';

import React, { useEffect, useState, useRef } from 'react';

interface CacheCloudinaryProps {
  assetUrl: string;
  type: 'video' | 'image';
  className?: string;
  alt?: string;
  onAnimationEnd?: () => void;
}

export default function CacheCloudinary({ assetUrl, type, className = '', alt, onAnimationEnd }: CacheCloudinaryProps) {
  const [localUrl, setLocalUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!assetUrl) return;

    let isMounted = true;
    let newLocalUrl: string | null = null;

    const transformation = type === 'video' ? 'q_auto,f_auto,vc_auto' : 'q_auto,f_auto';
    const urlParts = assetUrl.split('/upload/');
    let transformedUrl = assetUrl;
    if (urlParts.length === 2) {
      transformedUrl = `${urlParts[0]}/upload/${transformation}/${urlParts[1]}`;
    }

    fetch(transformedUrl, { cache: 'force-cache' })
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch failed for ${transformedUrl} with status ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        if (isMounted) {
          newLocalUrl = URL.createObjectURL(blob);
          setLocalUrl(newLocalUrl);
        }
      })
      .catch((error) => console.error("CacheCloudinary error:", error));

    return () => {
      isMounted = false;
      if (newLocalUrl) URL.revokeObjectURL(newLocalUrl);
    };
  }, [assetUrl, type]);

  useEffect(() => {
    if (type === 'video' && videoRef.current && localUrl) {
      const video = videoRef.current;
      const currentTime = video.currentTime;
      if (video.src !== localUrl) {
        video.src = localUrl;
        video.load();
        video.addEventListener('loadeddata', () => {
          video.currentTime = currentTime;
          video.play().catch(e => console.error("Video play failed:", e));
        }, { once: true });
      }
    }
  }, [localUrl, type]);

  const srcToRender = localUrl || assetUrl;

  if (type === 'video') {
    return (
      <video
        ref={videoRef}
        key={assetUrl}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`w-full h-full object-cover ${className}`}
        src={srcToRender}
      />
    );
  }

  return (
    <img
      src={srcToRender}
      alt={alt || ''}
      className={className}
      loading="lazy"
      onAnimationEnd={onAnimationEnd}
    />
  );
}