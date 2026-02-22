'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  const [isMobileActive, setIsMobileActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const galleryData = [
    { folder: 'Rocket Fuel', images: bundleImages[3], link: '/#rocketfuel-section' },
    { folder: 'Elasticity', images: bundleImages[2], link: '/#elasticity-section' },
    { folder: 'Feed', images: bundleImages[1], link: '/#feed-section' },
    { folder: 'Link', images: bundleImages[4], link: '/#link-section' },
    { folder: 'Spin Tycoon', images: bundleImages[0], link: '/#spintycoon-section' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
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

  const handleMobileClick = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      if (!isMobileActive) {
        e.preventDefault();
        setIsMobileActive(true);
      } else {
        router.push('/#mobilegames');
      }
    }
  };

  const galleryLayout = [
    'sm:col-start-3 sm:row-start-1',
    'sm:col-start-3 sm:row-start-2',
    'sm:col-start-1 sm:row-start-3',
    'sm:col-start-2 sm:row-start-3',
    'sm:col-start-3 sm:row-start-3',
  ];

  return (
    <section
      ref={sectionRef}
      id="bundle"
      className="relative bg-white text-gray-900 w-full flex flex-col items-center justify-center pt-24 pb-32 sm:pt-32 sm:pb-48 px-4 sm:px-12 z-10"
    >
      <div className="w-full max-w-7xl relative z-30">
        <h2 className="text-4xl lg:text-7xl font-black mb-6 text-left tracking-tighter">
          <span className="inline-block px-2 -ml-2 bg-gradient-to-r from-[#E46362] to-[#F9C462] text-transparent bg-clip-text">
            Explore the mobile bundle
          </span>
        </h2>
        
        <p className="text-xl sm:text-2xl text-gray-600 font-medium leading-relaxed mb-12 sm:mb-16 border-l-4 border-[#F9C462] pl-6 max-w-4xl">
          Elastic chaos, cosmic nonsense and calm, curious puzzles - (an unstable cat in full experimental play! Pack includes: Rocket Fuel, Elasticity, link, feed and spin tycoon)
        </p>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-3 sm:grid-rows-3 sm:h-[70vh] sm:max-h-[800px]">
          <div className="relative col-span-1 sm:col-start-1 sm:row-start-1 sm:col-span-2 sm:row-span-2 group cursor-pointer">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className={`absolute top-2 left-12 w-28 h-28 sm:w-36 sm:h-36 transition-all duration-500 ease-out origin-bottom ${activeMole === 0 && isTilted ? '-translate-y-24 rotate-12 scale-100 opacity-100' : 'translate-y-12 rotate-0 scale-75 opacity-0'}`}>
                <Image src="/Assets/cat.png" alt="Peeking Cat" fill className="object-contain drop-shadow-md" />
              </div>
              <div className={`absolute top-1/3 -left-2 w-28 h-28 sm:w-36 sm:h-36 transition-all duration-500 ease-out origin-right ${activeMole === 1 && isTilted ? '-translate-x-24 -rotate-[75deg] scale-100 opacity-100' : 'translate-x-12 -rotate-45 scale-75 opacity-0'}`}>
                <Image src="/Assets/cat.png" alt="Peeking Cat" fill className="object-contain drop-shadow-md" />
              </div>
              <div className={`absolute top-2 right-20 w-28 h-28 sm:w-36 sm:h-36 transition-all duration-500 ease-out origin-bottom ${activeMole === 2 && isTilted ? '-translate-y-24 -rotate-12 scale-100 opacity-100' : 'translate-y-12 rotate-0 scale-75 opacity-0'}`}>
                <Image src="/Assets/cat.png" alt="Peeking Cat" fill className="object-contain drop-shadow-md" />
              </div>
            </div>

            <Link href="/#mobilegames" onClick={handleMobileClick} className={`block relative w-full h-[60vw] sm:h-full overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 border border-black/10 z-10 bg-gradient-to-br from-gray-50 to-gray-200 origin-bottom-left group-hover:shadow-[0_20px_50px_rgba(228,99,98,0.25)] ${isTilted ? '-rotate-[4deg]' : ''}`}>
              <Image src="/Assets/bundle.png" alt="The Unstable Cat Bundle" fill className={`object-cover transition-opacity duration-700 ease-in-out ${(isMobileActive ? 'opacity-0' : 'opacity-100')} sm:group-hover:opacity-0`} priority />
              <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8 text-center transition-all duration-500 ${(isMobileActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')} sm:opacity-0 sm:translate-y-4 sm:group-hover:opacity-100 sm:group-hover:translate-y-0`}>
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-4 drop-shadow-lg transition-all duration-500 delay-75">
                  <Image src="/Assets/cat.png" alt="Unstable Cat" fill className="object-contain" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4 text-gray-900">Inside the Bundle</h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-md">
                  Experience the full collection including
                  <span className="font-bold text-[#E46362]"> Rocket Fuel</span>,
                  <span className="font-bold text-[#FF85A1]"> Elasticity</span>,
                  <span className="font-bold text-[#4ECDC4]"> Link</span> and
                  <span className="font-bold text-[#F9C462]"> Feed</span>.
                </p>
              </div>
            </Link>
          </div>

          {galleryData.map((item, index) => {
            const isCurrentlyAnimating = animatingIndices.includes(index);
            return (
              <div key={item.folder} className={`relative h-[60vw] sm:h-full ${galleryLayout[index]}`} onMouseEnter={() => handleMouseEnter(index)}>
                <div className={`w-full h-full transform-gpu transition-transform duration-300 origin-center ${isCurrentlyAnimating ? 'scale-[1.06]' : 'hover:scale-[1.06]'}`}>
                  <Link href={item.link} className="block w-full h-full">
                    <BundleGallery imageUrls={item.images} alt={`${item.folder} game screenshot`} className="rounded-xl h-full w-full" isAllowedToAnimate={isCurrentlyAnimating} onAnimationComplete={() => handleAnimationComplete(index)} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[120px] fill-[#0e172a]">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0H0Z" />
        </svg>
      </div>
    </section>
  );
};

export default Bundle;