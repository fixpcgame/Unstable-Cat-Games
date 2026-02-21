'use client';
import React, { useState, useRef, useEffect } from 'react';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeUrl = Array.isArray(assetUrl) ? assetUrl[currentIndex] : assetUrl;
  const transformation = type === 'video' ? 'q_auto,f_auto,vc_auto' : 'q_auto,f_auto';
  let transformedUrl = activeUrl || '';
  if (activeUrl && activeUrl.includes('/upload/')) {
    const urlParts = activeUrl.split('/upload/');
    if (!urlParts[1].startsWith(transformation)) {
      transformedUrl = `${urlParts[0]}/upload/${transformation}/${urlParts[1]}`;
    }
  }

  const handleVideoEnded = () => {
    if (Array.isArray(assetUrl) && assetUrl.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % assetUrl.length);
    }
  };

  useEffect(() => {
    if (type === 'video' && videoRef.current) {
      videoRef.current.play().catch(e => console.error("Autoplay prevented by browser:", e));
    }
  }, [transformedUrl, type]);

  if (!activeUrl) return null;

  if (type === 'video') {
    const isLooping = !Array.isArray(assetUrl) || assetUrl.length <= 1;
    return (
      <video
        ref={videoRef}
        key={transformedUrl}
        autoPlay
        loop={isLooping}
        muted
        playsInline
        preload="auto"
        className={className}
        src={transformedUrl}
        onEnded={isLooping ? undefined : handleVideoEnded}
      />
    );
  }

  return (
    <img
      key={transformedUrl}
      src={transformedUrl}
      alt={alt || ''}
      className={className}
      loading={loading}
      onAnimationEnd={onAnimationEnd}
      onLoad={onLoad}
    />
  );
}