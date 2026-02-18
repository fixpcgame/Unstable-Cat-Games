'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/header';

export default function Page() {
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {introVisible && (
        <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center intro-overlay-animate">
          <h1 className="text-5xl md:text-7xl font-bold text-white intro-text-animate">
            Unstable Cat Games
          </h1>
        </div>
      )}

      <main className="bg-black">
        <Header />
        <section data-theme="dark" className="relative h-screen w-full">
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              src="/video_placeholder.mp4"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        </section>

        <section data-theme="light" className="bg-gray-100 text-gray-900 min-h-screen flex items-center justify-center text-4xl font-bold p-8">
          <div>Light Theme Section</div>
        </section>

        <section data-theme="dark" className="bg-gray-900 text-white min-h-screen flex items-center justify-center text-4xl font-bold p-8">
          <div>Dark Theme Section</div>
        </section>
      </main>
    </>
  );
}