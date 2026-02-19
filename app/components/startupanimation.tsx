'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

let hasAnimationPlayed = false;

interface StartupAnimationProps {
  canPlay: boolean;
}

const StartupAnimation = ({ canPlay }: StartupAnimationProps) => {
  const [shouldHide, setShouldHide] = useState(() => {
    return !canPlay || hasAnimationPlayed;
  });

  useEffect(() => {
    if (canPlay && !hasAnimationPlayed) {
      hasAnimationPlayed = true;
    }
  }, [canPlay]);

  if (shouldHide) {
    return null;
  }

  return (
    <div
      className="intro-overlay-animate fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      <div className="relative flex items-center justify-center">
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
  );
};

export default StartupAnimation;