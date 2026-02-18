'use client';

import React, { useState, useEffect } from 'react';
import CacheCloudinary from './cachecloudinary';

interface BundleGalleryProps {
  imageUrls: string[];
  className?: string;
  alt?: string;
  isAllowedToAnimate: boolean;
  onAnimationComplete: () => void;
}

export default function BundleGallery({ imageUrls, className = '', alt, isAllowedToAnimate, onAnimationComplete }: BundleGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (isAllowedToAnimate && imageUrls.length > 1) {
      setIsFlipping(true);
    }
  }, [isAllowedToAnimate, imageUrls.length]);

  useEffect(() => {
    if (!isResetting) return;
    const performReset = () => {
      setIsFlipping(false);
      const timeoutId = setTimeout(() => {
        setIsResetting(false);
        onAnimationComplete();
      }, 50);

      return () => clearTimeout(timeoutId);
    };

    return performReset();
  }, [isResetting, onAnimationComplete]);

  const handleTransitionEnd = () => {
    if (isFlipping && !isResetting) {
      setCurrentIndex(prev => (prev + 1) % imageUrls.length);
      setIsResetting(true);
    }
  };

  if (imageUrls.length === 0) return null;
  const nextIndex = (currentIndex + 1) % imageUrls.length;
  const flipperClasses = [
    'flipper',
    isFlipping ? 'is-flipped' : '',
    isResetting ? 'no-transition' : ''
  ].join(' ').trim();

  return (
    <div className="w-full h-full flip-card">
      <div
        className={flipperClasses}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className={`front ${className}`}>
          <CacheCloudinary
            assetUrl={imageUrls[currentIndex]}
            type="image"
            className="w-full h-full object-cover"
            alt={alt}
          />
        </div>
        <div className={`back ${className}`}>
          <CacheCloudinary
            assetUrl={imageUrls[nextIndex]}
            type="image"
            className="w-full h-full object-cover"
            alt={alt}
          />
        </div>
      </div>
    </div>
  );
}