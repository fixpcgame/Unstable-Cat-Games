'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BundleGallery from './bundlegallery';

interface BundleProps {
  bundleImages: string[][];
}

const Bundle = ({ bundleImages }: BundleProps) => {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const [animatingIndices, setAnimatingIndices] = useState<number[]>([]);
  const [activeMole, setActiveMole] = useState<number | null>(null);
  const [isTilted, setIsTilted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const galleryData = [
    { folder: 'Rocket Fuel', images: bundleImages[3], link: '/mobilegames#rocketfuel-section' },
    { folder: 'Elasticity', images: bundleImages[2], link: '/mobilegames#elasticity-section' },
    { folder: 'Feed', images: bundleImages[1], link: '/mobilegames#feed-section' },
    { folder: 'Link', images: bundleImages[4], link: '/mobilegames#link-section' },
    { folder: 'Spin Tycoon', images: bundleImages[0], link: '/mobilegames#spintycoon-section' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let timeoutId: NodeJS.Timeout;

    const triggerTease = () => {
      setIsTilted(true);
      setActiveMole(Math.floor(Math.random() * 3));

      setTimeout(() => {
        setIsTilted(false);
        setActiveMole(null);
      }, 1500);

      const nextTime = Math.floor(Math.random() * 4000) + 4000;
      timeoutId = setTimeout(triggerTease, nextTime);
    };

    timeoutId = setTimeout(triggerTease, 400);

    return () => clearTimeout(timeoutId);
  }, [isInView]);

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
    <section 
      ref={sectionRef} 
      id="bundle" 
      data-theme="light" 
      className="bg-gray-100 text-gray-900 min-h-screen w-full flex flex-col items-center justify-center py-24 px-4 sm:px-12"
    >
      <div className="w-full max-w-7xl">
        <h2 className="text-4xl lg:text-5xl font-bold mb-20 text-left">
          <span className="bg-gradient-to-r from-[#E46362] to-[#F9C462] text-transparent bg-clip-text">
            Explore the mobile bundle
          </span>
        </h2>
        <div className="grid grid-cols-3 grid-rows-3 gap-4" style={{ height: '70vh', maxHeight: '800px' }}>
          
          <div className="relative col-start-1 row-start-1 col-span-2 row-span-2 group cursor-pointer">
            
            <div className="absolute inset-0 z-0 opacity-100 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
              <div className={`absolute top-2 left-12 w-36 h-36 transition-all duration-500 ease-out origin-bottom ${activeMole === 0 && isTilted ? '-translate-y-24 rotate-12 scale-100 opacity-100' : 'translate-y-12 rotate-0 scale-75 opacity-0'}`}>
                <Image src="/Assets/cat.png" alt="Peeking Cat" fill className="object-contain drop-shadow-md" />
              </div>
              <div className={`absolute top-1/3 -left-2 w-36 h-36 transition-all duration-500 ease-out origin-right ${activeMole === 1 && isTilted ? '-translate-x-24 -rotate-[75deg] scale-100 opacity-100' : 'translate-x-12 -rotate-45 scale-75 opacity-0'}`}>
                <Image src="/Assets/cat.png" alt="Peeking Cat" fill className="object-contain drop-shadow-md" />
              </div>
              <div className={`absolute top-2 right-20 w-36 h-36 transition-all duration-500 ease-out origin-bottom ${activeMole === 2 && isTilted ? '-translate-y-24 -rotate-12 scale-100 opacity-100' : 'translate-y-12 rotate-0 scale-75 opacity-0'}`}>
                <Image src="/Assets/cat.png" alt="Peeking Cat" fill className="object-contain drop-shadow-md" />
              </div>
            </div>

            <Link href="/mobilegames" className={`block relative w-full h-full overflow-hidden rounded-xl shadow-2xl transition-all duration-500 border border-gray-200 z-10 bg-gradient-to-br from-white to-gray-50 origin-bottom-left group-hover:shadow-[0_20px_50px_rgba(228,99,98,0.25)] group-hover:rotate-0 ${isTilted ? '-rotate-[4deg]' : 'rotate-0'}`}>
              <Image 
                src="/Assets/bundle.png" 
                alt="The Unstable Cat Bundle" 
                fill
                className="object-cover z-20 transition-opacity duration-700 ease-in-out group-hover:opacity-0" 
                priority 
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
                <div className="relative w-32 h-32 mb-4 drop-shadow-lg transition-all duration-500 delay-75 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-110">
                  <Image 
                    src="/Assets/cat.png" 
                    alt="Unstable Cat" 
                    fill 
                    className="object-contain" 
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 transition-all duration-500 delay-100 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  Inside the Bundle
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed max-w-md transition-all duration-500 delay-150 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  Experience the full collection including 
                  <span className="font-bold text-[#E46362]"> Rocket Fuel</span>, 
                  <span className="font-bold text-[#F9C462]"> Elasticity</span>, 
                  <span className="font-bold text-[#4ECDC4]"> Feed</span>, 
                  <span className="font-bold text-[#6B66FF]"> Link</span>, and 
                  <span className="font-bold text-[#FF85A1]"> Spin Tycoon</span>.
                </p>
              </div>
            </Link>
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
                <Link href={item.link} className="block w-full h-full">
                  <BundleGallery
                    imageUrls={item.images}
                    alt={`${item.folder} game screenshot`}
                    className="rounded-lg h-full w-full"
                    isAllowedToAnimate={isCurrentlyAnimating}
                    onAnimationComplete={() => handleAnimationComplete(index)}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Bundle;