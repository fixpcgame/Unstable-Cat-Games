'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CacheCloudinary from './cachecloudinary';

interface FixPCProps {
  imageUrls: string[];
}

export default function FixPC({ imageUrls }: FixPCProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [aspectRatios, setAspectRatios] = useState<Record<string, number>>({});

  useEffect(() => {
    if (imageUrls.length <= 1 || isHovered) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentIndex, isHovered, imageUrls.length]);

  const handleImageLoad = (url: string, e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (target.naturalWidth && target.naturalHeight) {
      const ratio = target.naturalWidth / target.naturalHeight;
      setAspectRatios((prev) => ({ ...prev, [url]: ratio }));
    }
  };

  if (imageUrls.length === 0) return null;

  return (
    <section
      id="fixpc-gallery"
      className="bg-[#0a0a0a] text-white w-full flex flex-col items-center justify-center py-24 px-4 sm:px-12 relative z-10 overflow-hidden"
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes peek-cat {
          0%, 20% { transform: translate(20px, 20px) rotate(0deg) scale(0.8); opacity: 0; }
          25%, 35% { transform: translate(-110px, -90px) rotate(-25deg) scale(1.2); opacity: 1; }
          40%, 60% { transform: translate(20px, 20px) rotate(0deg) scale(0.8); opacity: 0; }
          65%, 75% { transform: translate(-120px, 150px) rotate(-50deg) scale(1.1); opacity: 1; }
          80%, 100% { transform: translate(20px, 20px) rotate(0deg) scale(0.8); opacity: 0; }
        }
        .animate-peek-cat {
          animation: peek-cat 10s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
        }
      `}} />

      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-12 items-center relative">
        
        <div 
          className="xl:col-span-8 w-full flex flex-col items-center relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute top-0 left-0 w-48 h-48 z-0 animate-peek-cat pointer-events-none">
            <Image 
              src="/Assets/cat.png" 
              alt="Unstable Cat" 
              fill 
              className="object-contain drop-shadow-2xl" 
            />
          </div>

          <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-gray-800 bg-[#050505] z-10">
            {imageUrls.map((url, index) => {
              const isActive = index === currentIndex;
              const ratio = aspectRatios[url];
              
              const isSuitableForCover = ratio ? (ratio >= 1.55 && ratio <= 1.95) : false;

              return (
                <div
                  key={url}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out flex items-center justify-center overflow-hidden ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  {!isSuitableForCover && (
                    <div className="absolute inset-0 z-0 scale-110 blur-xl opacity-40">
                      <CacheCloudinary
                        assetUrl={url}
                        type="image"
                        className="w-full h-full object-cover"
                        alt=""
                        loading={index < 2 ? "eager" : "lazy"}
                      />
                    </div>
                  )}

                  <div className={`relative z-10 w-full h-full ${isSuitableForCover ? '' : 'p-2'} transition-transform duration-1000 ${isActive ? 'scale-100' : 'scale-105'}`}>
                    <CacheCloudinary
                      assetUrl={url}
                      type="image"
                      className={`w-full h-full ${isSuitableForCover ? 'object-cover' : 'object-contain drop-shadow-2xl'}`}
                      alt={`Fix PC Gameplay ${index + 1}`}
                      loading={index < 2 ? "eager" : "lazy"}
                      onLoad={(e) => handleImageLoad(url, e)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          
          {imageUrls.length > 1 && (
            <div className="flex gap-4 mt-8 w-full max-w-lg z-10">
              {imageUrls.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="relative h-2 flex-1 rounded-full bg-gray-800 overflow-hidden cursor-pointer"
                  aria-label={`Show image ${index + 1}`}
                >
                  <div 
                    className={`absolute top-0 left-0 h-full bg-gradient-to-r from-[#E46362] to-[#F9C462] ease-linear ${
                      index === currentIndex && !isHovered
                        ? 'w-full transition-[width] duration-[4000ms]' 
                        : index < currentIndex 
                          ? 'w-full transition-none' 
                          : 'w-0 transition-none'
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="xl:col-span-4 w-full flex flex-col justify-center text-left space-y-8 relative">
          
          <div className="absolute -top-12 right-0 w-32 h-32 opacity-90 rotate-12 hover:rotate-6 hover:scale-110 transition-all duration-300 z-0 pointer-events-none">
            <Image 
              src="/Assets/fixpc.png" 
              alt="Fix PC Sticker" 
              fill 
              className="object-contain drop-shadow-2xl" 
            />
          </div>

          <div className="relative z-10">
            <div className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 via-[#E46362] to-[#F9C462] text-sm font-black tracking-widest text-white uppercase w-fit shadow-[0_0_20px_rgba(228,99,98,0.4)] mb-6">
              Work In Progress
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              Dive into the <br />
              <span className="bg-gradient-to-r from-[#E46362] to-[#F9C462] text-transparent bg-clip-text">
                Mechanics
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 font-light leading-relaxed mb-8">
              This is the big one! A ground-up VR puzzle game designed to test your limits. Immerse yourself in highly detailed environments and complex logic systems.
            </p>

            <p className="text-xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse">
              Coming to Steam soon...
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}