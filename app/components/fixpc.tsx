'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CacheCloudinary from './cachecloudinary';

interface FixPCProps {
  imageUrls: string[];
}

export default function FixPC({ imageUrls }: FixPCProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryPage, setGalleryPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [aspectRatios, setAspectRatios] = useState<Record<string, number>>({});
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeThumbRef = useRef<HTMLButtonElement>(null);

  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.ceil(imageUrls.length / ITEMS_PER_PAGE);

  useEffect(() => {
    imageUrls.forEach((url) => {
      const transformedUrl = url.includes('/upload/') 
        ? url.replace('/upload/', '/upload/q_auto,f_auto/') 
        : url;
        
      const img = new window.Image();
      img.onload = () => {
        setAspectRatios((prev) => ({ 
          ...prev, 
          [url]: img.naturalWidth / img.naturalHeight 
        }));
      };
      img.src = transformedUrl;
    });
  }, [imageUrls]);

  useEffect(() => {
    if (imageUrls.length <= 1 || isHovered) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentIndex, isHovered, imageUrls.length]);

  useEffect(() => {
    if (imageUrls.length > 0) {
      setGalleryPage(Math.floor(currentIndex / ITEMS_PER_PAGE));
    }
  }, [currentIndex, imageUrls.length]);

  useEffect(() => {
    if (activeThumbRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const thumb = activeThumbRef.current;
      const scrollLeft = thumb.offsetLeft - container.offsetWidth / 2 + thumb.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [currentIndex]);

  if (imageUrls.length === 0) return null;

  const renderImages = () => {
    const targetIndex = currentIndex;
    const prevTargetIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;

    return imageUrls.map((url, index) => {
      if (index !== targetIndex && index !== prevTargetIndex) return null;

      const isActive = index === targetIndex;
      const ratio = aspectRatios[url];
      const isSuitableForCover = ratio ? (ratio >= 1.45 && ratio <= 2.1) : false;

      return (
        <div
          key={`${url}-${index}`}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out flex items-center justify-center overflow-hidden ${
            isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {!isSuitableForCover && (
            <div className="absolute inset-0 z-0 scale-125 blur-2xl opacity-80 mix-blend-multiply">
              <CacheCloudinary
                assetUrl={url}
                type="image"
                className="w-full h-full object-cover"
                loading={isActive ? 'eager' : 'lazy'}
              />
            </div>
          )}

          <div className={`relative z-10 w-full h-full ${isSuitableForCover ? '' : 'p-2'} transition-transform duration-1000 ${isActive ? 'scale-100' : 'scale-105'}`}>
            <CacheCloudinary
              assetUrl={url}
              type="image"
              className={`w-full h-full ${isSuitableForCover ? 'object-cover' : 'object-contain drop-shadow-2xl'}`}
              loading={isActive ? 'eager' : 'lazy'}
            />
          </div>
        </div>
      );
    });
  };

  const scrollGallery = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="fixpc-gallery"
      data-theme="light"
      className="scroll-mt-24 sm:scroll-mt-32 bg-white text-gray-900 w-full flex flex-col items-center justify-center py-24 px-4 sm:px-12 relative z-10 overflow-hidden"
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes peek-cat-fixpc {
          0%, 20% { transform: translate(0px, 20px) rotate(0deg) scale(0.8); opacity: 0; }
          25%, 35% { transform: translate(40px, -80px) rotate(25deg) scale(1.2); opacity: 1; }
          40%, 60% { transform: translate(0px, 20px) rotate(0deg) scale(0.8); opacity: 0; }
          65%, 75% { transform: translate(60px, -100px) rotate(45deg) scale(1.2); opacity: 1; }
          80%, 100% { transform: translate(0px, 20px) rotate(0deg) scale(0.8); opacity: 0; }
        }
        .animate-peek-cat-fixpc {
          animation: peek-cat-fixpc 10s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
        }
      `}} />

      <div className="w-full max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative">
        <div 
          className="lg:col-span-5 w-full flex flex-col justify-center text-left space-y-6 relative order-2 lg:order-1 z-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute -top-16 left-[85%] sm:left-80 -translate-x-1/2 sm:translate-x-0 w-32 h-32 opacity-90 -rotate-12 hover:-rotate-6 hover:scale-110 transition-all duration-300 z-0 pointer-events-none">
            <Image 
              src="/Assets/fixpc.png" 
              alt="Fix PC Sticker" 
              fill 
              className="object-contain drop-shadow-2xl" 
            />
          </div>

          <div className="relative z-10">
            <div className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-black tracking-widest text-white uppercase w-fit shadow-md mb-6">
              Work In Progress
            </div>
            
            <h2 className="text-5xl sm:text-6xl font-black leading-tight mb-6 tracking-tight text-gray-900">
              Dive into the <br />
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text">
                Mechanics
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 font-medium leading-relaxed mb-8 border-l-4 border-cyan-500 pl-6">
              From navigating satellites in the open cosmos of space to spinning decks above a theatre production, your abilities will be put to the test as you battle through every cinematic mission in this first-person puzzle game.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <button className="px-8 py-4 bg-gray-900 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                Wishlist on Steam
              </button>
            </div>

            {imageUrls.length > 1 && (
              <div className="w-full max-w-[400px]">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Gameplay Gallery</p>
                
                <div className="relative group/gallery flex items-center mb-4">
                  <button 
                    onClick={() => scrollGallery('left')}
                    className="absolute left-0 z-20 bg-white shadow-md rounded-full p-2 text-gray-800 opacity-0 group-hover/gallery:opacity-100 transition-opacity -translate-x-4"
                  >
                    <FaChevronLeft size={12} />
                  </button>

                  <div 
                    ref={scrollContainerRef}
                    className="relative flex gap-3 overflow-x-auto py-2 px-1 scrollbar-hide w-full" 
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {imageUrls.map((url, idx) => {
                      const isActive = idx === currentIndex;
                      return (
                        <button
                          key={url}
                          ref={isActive ? activeThumbRef : null}
                          onClick={() => setCurrentIndex(idx)}
                          className={`relative w-24 sm:w-28 aspect-video rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 ${
                            isActive
                              ? 'ring-4 ring-cyan-500 scale-105 shadow-md z-10'
                              : 'opacity-60 hover:opacity-100 hover:scale-105 bg-gray-100'
                          }`}
                        >
                          <CacheCloudinary assetUrl={url} type="image" className="w-full h-full object-cover" />
                        </button>
                      );
                    })}
                  </div>

                  <button 
                    onClick={() => scrollGallery('right')}
                    className="absolute right-0 z-20 bg-white shadow-md rounded-full p-2 text-gray-800 opacity-0 group-hover/gallery:opacity-100 transition-opacity translate-x-4"
                  >
                    <FaChevronRight size={12} />
                  </button>
                </div>

                {totalPages > 1 && (
                  <div className="flex gap-2 items-center flex-wrap">
                    {Array.from({ length: totalPages }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setGalleryPage(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === galleryPage 
                            ? 'w-8 bg-cyan-500' 
                            : 'w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div 
          className="lg:col-span-7 w-full flex flex-col items-center relative order-1 lg:order-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute top-0 right-0 sm:right-10 w-24 h-24 sm:w-32 sm:h-32 z-0 pointer-events-none">
            <div className="w-full h-full animate-peek-cat-fixpc">
              <Image 
                src="/Assets/cat.png" 
                alt="Unstable Cat" 
                fill 
                className="object-contain drop-shadow-2xl" 
              />
            </div>
          </div>

          <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-50 z-10 group">
            <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            {renderImages()}
          </div>
        </div>
      </div>
    </section>
  );
}