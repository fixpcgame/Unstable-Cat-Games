'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CacheCloudinary from './cachecloudinary';

interface FeedProps {
  imageUrls: string[];
}

export default function Feed({ imageUrls }: FeedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryPage, setGalleryPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeThumbRef = useRef<HTMLButtonElement>(null);

  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.ceil(imageUrls.length / ITEMS_PER_PAGE);

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

  const getIndex = (offset: number) => (currentIndex + offset) % imageUrls.length;

  const renderPhoneImages = (offset: number) => {
    const targetIndex = getIndex(offset);

    return imageUrls.map((url, index) => {
      const isActive = index === targetIndex;
      return (
        <div
          key={`${url}-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <CacheCloudinary
            assetUrl={url}
            type="image"
            className="w-full h-full object-cover"
            loading={isActive ? 'eager' : 'lazy'}
          />
        </div>
      );
    });
  };

  const scrollGallery = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 150;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="feed-section"
      data-theme="light"
      className="scroll-mt-24 sm:scroll-mt-32 bg-white text-gray-900 w-full flex flex-col items-center justify-center py-24 px-4 sm:px-12 relative z-10 overflow-hidden"
    >
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative">
        
        <div 
          className="lg:col-span-5 w-full flex flex-col justify-center text-left space-y-8 relative order-2 lg:order-1 z-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative">
            <div className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-[#fdbf00] to-[#ffda66] text-sm font-black tracking-widest text-white uppercase w-fit shadow-md mb-6">
              Out Now
            </div>
            
            <h2 className="text-6xl sm:text-7xl font-black leading-none mb-6 text-gray-900 tracking-tight">
              <span className="text-[#fdbf00]">Feed</span>
            </h2>
            
            <p className="text-xl text-gray-600 font-medium leading-relaxed mb-8 border-l-4 border-[#fdbf00] pl-6">
              Be quick to fill a hungry monster's belly! Use belts, rails and bridges to transport food from farms to factories. Hurry up! It's keen to eat!
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <button className="px-8 py-4 bg-[#fdbf00] text-white font-bold rounded-full shadow-[0_10px_20px_rgba(253,191,0,0.3)] hover:shadow-[0_15px_30px_rgba(253,191,0,0.5)] hover:-translate-y-1 transition-all duration-300">
                Get it on iOS
              </button>
              <button className="px-8 py-4 bg-gray-900 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                Get it on Android
              </button>
            </div>

            {imageUrls.length > 1 && (
              <div className="w-full max-w-[500px]">
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
                    className="flex gap-3 overflow-x-auto py-2 px-1 scrollbar-hide snap-x snap-mandatory w-full" 
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {imageUrls.map((url, idx) => {
                      const isActive = idx === currentIndex;
                      return (
                        <button
                          key={url}
                          ref={isActive ? activeThumbRef : null}
                          onClick={() => setCurrentIndex(idx)}
                          className={`relative w-32 sm:w-44 aspect-[19.5/9] rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 snap-center ${
                            isActive
                              ? 'ring-4 ring-[#fdbf00] scale-105 shadow-md z-10 mx-1'
                              : 'opacity-60 hover:opacity-100 hover:scale-105 hover:z-10 bg-gray-200'
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
                  <div className="flex gap-2 items-center h-4">
                    {Array.from({ length: totalPages }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setGalleryPage(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === galleryPage 
                            ? 'w-8 bg-[#fdbf00]' 
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
          className="lg:col-span-7 lg:col-start-6 w-full flex justify-center items-center relative order-1 lg:order-2 h-[500px] sm:h-[650px] group cursor-pointer" 
          style={{ perspective: '1200px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] sm:w-[80%] h-[90%] sm:h-[100%] bg-[#fdbf00] rounded-[3rem] sm:rounded-[4rem] rotate-6 group-hover:rotate-12 group-hover:scale-105 transition-all duration-700 ease-out z-0 shadow-2xl"></div>

          <div className="absolute top-[-25px] left-[30%] -translate-x-1/2 w-32 h-32 z-40 transition-all duration-500 group-hover:-translate-y-8 group-hover:scale-110 pointer-events-none drop-shadow-xl">
            <Image 
              src="/Assets/cat.png" 
              alt="Peeking Cat" 
              fill 
              className="object-contain" 
            />
          </div>

          <div className="relative w-full h-full flex justify-center items-center z-20">
            <div className="absolute w-[300px] sm:w-[420px] aspect-[19.5/9] rounded-[2.5rem] border-8 border-white shadow-2xl bg-white overflow-hidden z-10 -translate-y-20 -rotate-[12deg] scale-90 group-hover:-translate-y-48 sm:group-hover:-translate-y-56 group-hover:-rotate-[18deg] transition-all duration-500 ease-out">
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-6 sm:w-7 h-24 sm:h-32 bg-white rounded-r-2xl z-30" />
              {renderPhoneImages(1)}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-20 pointer-events-none" />
            </div>

            <div className="absolute w-[300px] sm:w-[420px] aspect-[19.5/9] rounded-[2.5rem] border-8 border-white shadow-2xl bg-white overflow-hidden z-10 translate-y-20 rotate-[12deg] scale-90 group-hover:translate-y-48 sm:group-hover:translate-y-56 group-hover:rotate-[18deg] transition-all duration-500 ease-out">
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-6 sm:w-7 h-24 sm:h-32 bg-white rounded-r-2xl z-30" />
              {renderPhoneImages(2)}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-20 pointer-events-none" />
            </div>

            <div className="absolute w-[350px] sm:w-[500px] aspect-[19.5/9] rounded-[2.5rem] sm:rounded-[3rem] border-[12px] border-white shadow-[0_40px_80px_rgba(0,0,0,0.4)] bg-white overflow-hidden z-30 group-hover:-translate-y-6 group-hover:scale-105 transition-all duration-500 ease-out">
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-7 sm:w-8 h-28 sm:h-36 bg-white rounded-r-2xl z-30 shadow-sm" />
              {renderPhoneImages(0)}
              <div className="absolute -inset-full top-0 z-20 w-[200%] h-[150%] bg-gradient-to-tr from-transparent via-white/20 to-transparent -rotate-45 pointer-events-none" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}