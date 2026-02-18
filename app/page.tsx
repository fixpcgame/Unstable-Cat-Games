'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Image from 'next/image';

export default function Page() {
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroVisible(false);
    }, 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {introVisible && (
        <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center p-8 intro-overlay-animate">
          <div className="relative w-full max-w-xl h-64 flex items-center justify-between intro-content-animate">
            <Image
              src="/Assets/cat.png"
              alt="Unstable Cat"
              width={500}
              height={500}
              className="h-64 w-64 object-contain relative z-10"
            />

            <div className="bouncing-ball"></div>

            <Image
              src="/logos/logo.png"
              alt="Unstable Cat Games Logo"
              width={240}
              height={240}
              className="h-32 w-auto object-contain brightness-0 invert relative z-10"
            />
          </div>
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