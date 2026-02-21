'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

let hasAnimationPlayed = false;

interface StartupAnimationProps {
  canPlay: boolean;
}

const StartupAnimation = ({ canPlay }: StartupAnimationProps) => {
  const [shouldHide, setShouldHide] = useState(() => {
    if (typeof window === 'undefined') return !canPlay;
    return !canPlay || hasAnimationPlayed;
  });

  useEffect(() => {
    if (!hasAnimationPlayed) {
      hasAnimationPlayed = true;
    }

    if (canPlay && !shouldHide) {
      const timer = setTimeout(() => {
        setShouldHide(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [canPlay, shouldHide]);

  if (shouldHide) {
    return null;
  }

  return (
    <div className="intro-overlay-animate fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0a0a0a]">
      <div className="relative flex items-center justify-center w-full max-w-[800px] overflow-visible transform scale-[0.4] min-[400px]:scale-[0.5] sm:scale-75 md:scale-100">
        <Image
          src="/Assets/cat.png"
          alt="Unstable Cat"
          width={500}
          height={500}
          className="h-64 w-64 object-contain relative z-10 drop-shadow-2xl"
          priority
        />
        <div className="bouncing-ball"></div>
        <Image
          src="/logos/logo.png"
          alt="Unstable Cat Games Logo"
          width={240}
          height={240}
          className="h-32 w-auto object-contain brightness-0 invert relative z-10 ml-6 drop-shadow-2xl"
          priority
        />
      </div>
    </div>
  );
};

export default StartupAnimation;