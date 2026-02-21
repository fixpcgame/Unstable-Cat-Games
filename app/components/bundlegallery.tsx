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

export default function BundleGallery({ 
  imageUrls, 
  className = '', 
  alt, 
  isAllowedToAnimate, 
  onAnimationComplete 
}: BundleGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (isAllowedToAnimate && imageUrls.length > 1 && !isFlipping && !isResetting) {
      setIsFlipping(true);
    }
  }, [isAllowedToAnimate, imageUrls.length, isFlipping, isResetting]);

  useEffect(() => {
    if (!isResetting) return;
    
    const timeoutId = setTimeout(() => {
      setIsResetting(false);
      onAnimationComplete();
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [isResetting, onAnimationComplete]);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;

    if (isFlipping && !isResetting) {
      setIsFlipping(false);
      setIsResetting(true);
      setCurrentIndex(prev => (prev + 1) % imageUrls.length);
    }
  };

  if (imageUrls.length === 0) return null;

  const nextIndex = (currentIndex + 1) % imageUrls.length;
  
  const flipperClasses = [
    'flipper',
    isFlipping ? 'is-flipped' : '',
    isResetting ? 'no-transition' : ''
  ].filter(Boolean).join(' ').trim();

  return (
    <div className={`flip-card w-full h-full ${className}`}>
      <div className={flipperClasses} onTransitionEnd={handleTransitionEnd}>
        
        <div className="front bg-transparent rounded-lg">
          <CacheCloudinary
            assetUrl={imageUrls[currentIndex]}
            type="image"
            className="w-full h-full object-contain sm:object-cover rounded-lg"
            alt={alt}
            loading="eager"
          />
        </div>

        <div className="back bg-transparent rounded-lg">
          <CacheCloudinary
            assetUrl={imageUrls[nextIndex]}
            type="image"
            className="w-full h-full object-contain sm:object-cover rounded-lg"
            alt={alt}
            loading="eager"
          />
        </div>

      </div>
    </div>
  );
}