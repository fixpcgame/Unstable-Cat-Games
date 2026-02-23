'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutMe() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section data-theme="light" className="relative text-[#0f172a] w-full h-[800px] flex flex-col justify-center overflow-hidden z-10">
      
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-end">
        <div className="relative w-full h-[100vh] min-h-[1080px] max-w-[2500px] top-1/2 -translate-y-1/2">
          <Image 
            src="/Assets/aboutme.png" 
            alt="About Me Background" 
            fill
            className="object-cover lg:object-contain object-[80%_center] lg:object-right opacity-100" 
            priority
          />
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-12 relative z-10 flex justify-start">
        <div className="w-full max-w-2xl flex flex-col items-start text-left">
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-12 tracking-tight leading-tight text-[#0f172a]">
            Discover our dream to
            <br/>get the whole world playing.
          </h2>
          
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={`absolute -top-12 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 w-24 h-24 z-0 transition-all duration-500 pointer-events-none ${isHovered ? '-translate-y-6 scale-110' : 'translate-y-8 scale-90 opacity-0'}`}>
              <Image src="/Assets/cat.png" alt="Peeking Cat" fill className="object-contain" />
            </div>

            <Link href="/#mobilegames" className="group relative p-8 rounded-[2rem] bg-white border-4 border-white hover:border-[#E46362] transition-all duration-500 overflow-hidden shadow-xl hover:shadow-[0_20px_40px_rgba(228,99,98,0.2)] hover:-translate-y-2 z-10">
              <div className="relative z-10 flex flex-col items-center transform group-hover:scale-110 transition-transform duration-500">
                <span className="text-6xl font-black text-[#E46362] mb-3">
                  5
                </span>
                <h3 className="text-lg font-bold text-gray-500 uppercase tracking-widest group-hover:text-gray-900 transition-colors duration-300">Mobile Games</h3>
              </div>
            </Link>
            
            <Link href="/#pcgames" className="group relative p-8 rounded-[2rem] bg-white border-4 border-white hover:border-[#8B5CF6] transition-all duration-500 overflow-hidden shadow-xl hover:shadow-[0_20px_40px_rgba(139,92,246,0.2)] hover:-translate-y-2 z-10">
              <div className="relative z-10 flex flex-col items-center transform group-hover:scale-110 transition-transform duration-500">
                <span className="text-6xl font-black text-[#8B5CF6] mb-3">
                  3
                </span>
                <h3 className="text-lg font-bold text-gray-500 uppercase tracking-widest group-hover:text-gray-900 transition-colors duration-300">PC Games</h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}