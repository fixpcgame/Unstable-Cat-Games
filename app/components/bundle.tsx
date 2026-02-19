'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import BundleGallery from './bundlegallery';

interface BundleProps {
  bundleImages: string[][];
}

const Bundle = ({ bundleImages }: BundleProps) => {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const [animatingIndices, setAnimatingIndices] = useState<number[]>([]);

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
      setAnimatingIndices(prev => Array.from(new Set([...prev, nextIndex])));
    }, 1200);
    
    return () => clearTimeout(timer);
  }, [activeGalleryIndex, galleryData.length]);

  const handleMouseEnter = (index: number) => {
    setActiveGalleryIndex(index);
    setAnimatingIndices(prev => Array.from(new Set([...prev, index])));
  };

  const handleAnimationComplete = (index: number) => {
    setAnimatingIndices(prev => prev.filter(i => i !== index));
    setActiveGalleryIndex(prev => (prev === index ? null : prev));
  };

  const galleryLayout = [
    'col-start-3 row-start-1',
    'col-start-3 row-start-2',
    'col-start-1 row-start-3',
    'col-start-2 row-start-3',
    'col-start-3 row-start-3',
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
          
          <div className="relative col-start-1 row-start-1 col-span-2 row-span-2 group cursor-pointer overflow-hidden rounded-xl shadow-2xl transition-all duration-500 border border-gray-200">
            <Image 
              src="/Assets/bundle.png" 
              alt="The Unstable Cat Bundle" 
              fill
              className="object-cover z-20 transition-opacity duration-700 ease-in-out group-hover:opacity-0" 
              priority 
            />

            <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-8 text-center z-10">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Inside the Bundle</h3>
              <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                Experience the full collection including 
                <span className="font-bold text-[#E46362]"> Rocket Fuel</span>, 
                <span className="font-bold text-[#F9C462]"> Elasticity</span>, 
                Feed, Link, and Spin Tycoon.
              </p>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
              <div className="bg-black/70 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wider flex items-center gap-2 shadow-xl animate-bounce">
                <span>HOVER FOR DETAILS</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm45.66-93.66a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32-11.32L148.69,136H88a8,8,0,0,1,0-16h60.69l-18.35-18.34a8,8,0,0,1,11.32-11.32Z"></path>
                </svg>
              </div>
            </div>
          </div>

          {galleryData.map((item, index) => {
            const isCurrentlyAnimating = animatingIndices.includes(index);
            return (
              <div
                key={item.folder}
                className={`transform transition-all duration-300 ${galleryLayout[index]} 
                  ${isCurrentlyAnimating ? 'scale-105 z-40 shadow-none' : 'shadow-2xl hover:scale-105 hover:shadow-none'}`}
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <BundleGallery
                  imageUrls={item.images}
                  alt={`${item.folder} game screenshot`}
                  className="rounded-lg h-full w-full"
                  isAllowedToAnimate={isCurrentlyAnimating}
                  onAnimationComplete={() => handleAnimationComplete(index)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Bundle;