'use client';
import React, { useEffect, useState, useRef } from 'react';

interface CacheCloudinaryProps {
  assetUrl: string | string[];
  type: 'video' | 'image';
  className?: string;
  alt?: string;
  onAnimationEnd?: () => void;
  loading?: 'lazy' | 'eager';
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export default function CacheCloudinary({ 
  assetUrl, 
  type, 
  className = '', 
  alt, 
  onAnimationEnd,
  loading = 'lazy',
  onLoad
}: CacheCloudinaryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localMediaUrl, setLocalMediaUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeUrl = Array.isArray(assetUrl) ? assetUrl[currentIndex] : assetUrl;
  const transformation = type === 'video' ? 'q_auto,f_auto,vc_auto' : 'q_auto,f_auto';
  
  let transformedUrl = activeUrl || '';
  if (activeUrl) {
    const urlParts = activeUrl.split('/upload/');
    if (urlParts.length === 2) {
      transformedUrl = `${urlParts[0]}/upload/${transformation}/${urlParts[1]}`;
    }
  }

  useEffect(() => {
    if (!activeUrl || type === 'image') return;
    
    setLocalMediaUrl(null);
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
          setLocalMediaUrl(newLocalUrl);
        }
      })
      .catch((error) => console.error(error));

    return () => {
      isMounted = false;
      if (newLocalUrl) URL.revokeObjectURL(newLocalUrl);
    };
  }, [activeUrl, type, transformedUrl]);

  useEffect(() => {
    if (type === 'video' && videoRef.current && localMediaUrl) {
      const video = videoRef.current;
      if (video.src !== localMediaUrl) {
        video.src = localMediaUrl;
        video.load();
        video.addEventListener('loadeddata', () => {
          video.play().catch(e => console.error(e));
        }, { once: true });
      }
    }
  }, [localMediaUrl, type]);

  const handleVideoEnded = () => {
    if (Array.isArray(assetUrl) && assetUrl.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % assetUrl.length);
    }
  };

  if (!activeUrl) return null;

  if (type === 'video') {
    const isLooping = !Array.isArray(assetUrl) || assetUrl.length === 1;
    return (
      <video
        ref={videoRef}
        key={activeUrl}
        autoPlay
        loop={isLooping}
        muted
        playsInline
        preload="auto"
        className={`w-full h-full object-cover ${className}`}
        src={localMediaUrl || transformedUrl}
        onEnded={isLooping ? undefined : handleVideoEnded}
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
      onLoad={onLoad}
    />
  );
}
