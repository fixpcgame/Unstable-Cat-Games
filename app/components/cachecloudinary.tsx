'use client';
import React, { useEffect, useState, useRef } from 'react';

interface CacheCloudinaryProps {
  assetUrl: string;
  type: 'video' | 'image';
  className?: string;
  alt?: string;
  onAnimationEnd?: () => void;
  loading?: 'lazy' | 'eager';
}

export default function CacheCloudinary({ 
  assetUrl, 
  type, 
  className = '', 
  alt, 
  onAnimationEnd,
  loading = 'lazy'
}: CacheCloudinaryProps) {
  const [localVideoUrl, setLocalVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const transformation = type === 'video' ? 'q_auto,f_auto,vc_auto' : 'q_auto,f_auto';
  const urlParts = assetUrl.split('/upload/');
  let transformedUrl = assetUrl;
  
  if (urlParts.length === 2) {
    transformedUrl = `${urlParts[0]}/upload/${transformation}/${urlParts[1]}`;
  }

  useEffect(() => {
    if (!assetUrl || type === 'image') return;
    
    setLocalVideoUrl(null);
    let isMounted = true;
    let newLocalUrl: string | null = null;

    fetch(transformedUrl, { cache: 'force-cache' })
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch failed for ${transformedUrl}`);
        return res.blob();
      })
      .then((blob) => {
        if (isMounted) {
          newLocalUrl = URL.createObjectURL(blob);
          setLocalVideoUrl(newLocalUrl);
        }
      })
      .catch((error) => console.error(error));

    return () => {
      isMounted = false;
      if (newLocalUrl) URL.revokeObjectURL(newLocalUrl);
    };
  }, [assetUrl, type, transformedUrl]);

  useEffect(() => {
    if (type === 'video' && videoRef.current && localVideoUrl) {
      const video = videoRef.current;
      const currentTime = video.currentTime;
      if (video.src !== localVideoUrl) {
        video.src = localVideoUrl;
        video.load();
        video.addEventListener('loadeddata', () => {
          video.currentTime = currentTime;
          video.play().catch(e => console.error(e));
        }, { once: true });
      }
    }
  }, [localVideoUrl, type]);

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
        src={localVideoUrl || transformedUrl}
      />
    );
  }

  return (
    <img
      src={transformedUrl}
      alt={alt || ''}
      className={className}
      loading={loading}
      onAnimationEnd={onAnimationEnd}
    />
  );
}