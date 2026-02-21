'use client';
import React from 'react';
import Image from 'next/image';

export default function Community() {
  return (
    <section data-theme="light" className="relative w-full bg-gradient-to-b from-gray-100 to-white flex flex-col z-10 pt-12 sm:pt-24">
      
      <div className="w-full relative aspect-[3114/930] flex flex-col items-center justify-center">
        
        <Image 
          src="/Assets/community.png" 
          alt="Unstable Cat Community Banner" 
          fill 
          className="object-cover opacity-100" 
          priority
        />
        
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-12 w-full max-w-5xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-6 tracking-tight leading-tight text-white drop-shadow-lg">
            Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5865F2] to-[#a3aef5]">Community</span>
          </h2>
          
          <p className="text-sm sm:text-lg lg:text-xl text-gray-200 font-medium max-w-2xl mx-auto mb-6 sm:mb-8 drop-shadow-md">
            Connect with players, share strategies, and chat directly with the creators. Don't miss out on the chaos.
          </p>

          <a 
            href="https://discord.gg/XwgbrfYd" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group/btn relative px-5 py-2.5 sm:px-8 sm:py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-full transition-all duration-300 shadow-[0_10px_30px_rgba(88,101,242,0.4)] hover:shadow-[0_15px_40px_rgba(88,101,242,0.6)] hover:-translate-y-1 z-20 flex items-center gap-3 text-sm sm:text-lg"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-6" viewBox="0 0 127.14 96.36">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.1,46,96,53,91.08,65.69,84.69,65.69Z"/>
            </svg>
            Join our Discord
          </a>
        </div>
      </div>
      
    </section>
  );
}