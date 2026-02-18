'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import BundleGallery from './bundlegallery';

interface BundleProps {
  bundleImages: string[][];
}

const Bundle = ({ bundleImages }: BundleProps) => {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);

  const galleryData = [
    { folder: 'Rocket Fuel', images: bundleImages[3] },
    { folder: 'Elasticity', images: bundleImages[2] },
    { folder: 'Feed', images: bundleImages[1] },
    { folder: 'Link', images: bundleImages[4] },
    { folder: 'Spin Tycoon', images: bundleImages[0] },
  ];

  useEffect(() => {
    if (activeGalleryIndex !== null) return;
    const timer = setTimeout(() => {
      const nextIndex = Math.floor(Math.random() * galleryData.length);
      setActiveGalleryIndex(nextIndex);
    }, 1200);
    return () => clearTimeout(timer);
  }, [activeGalleryIndex, galleryData.length]);

  const handleAnimationComplete = () => {
    setActiveGalleryIndex(null);
  };

  const galleryLayout = [
    'col-start-3 row-start-1', 'col-start-3 row-start-2', 'col-start-1 row-start-3',
    'col-start-2 row-start-3', 'col-start-3 row-start-3',
  ];

  return (
    <section data-theme="light" className="bg-gray-100 text-gray-900 min-h-screen w-full flex flex-col items-center justify-center py-24 px-4 sm:px-12">
      <div className="w-full max-w-7xl">
        <h2 className="text-4xl lg:text-5xl font-bold mb-10 text-left">
          <span className="bg-gradient-to-r from-[#E46362] to-[#F9C462] text-transparent bg-clip-text">
            The Unstable Cat Bundle
          </span>
        </h2>
        <div className="grid grid-cols-3 grid-rows-3 gap-4" style={{ height: '70vh', maxHeight: '800px' }}>
          <div className="col-span-2 row-span-2 rounded-lg shadow-2xl overflow-hidden">
            <Image src="/Assets/bundle.png" alt="The Unstable Cat Bundle" width={800} height={800} className="w-full h-full object-cover" priority />
          </div>
          {galleryData.map((item, index) => (
            <div
              key={item.folder}
              className={`transform transition-transform duration-300 hover:scale-105 ${galleryLayout[index]} ${activeGalleryIndex === index ? '' : 'shadow-2xl'}`}
            >
              <BundleGallery
                imageUrls={item.images}
                alt={`${item.folder} game screenshot`}
                className="rounded-lg"
                isAllowedToAnimate={activeGalleryIndex === index}
                onAnimationComplete={handleAnimationComplete}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bundle;