'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface StartupAnimationProps {
  // Prop to decide if the animation should be considered.
  // This maintains the original logic of tying it to the video.
  canPlay: boolean;
}

const StartupAnimation = ({ canPlay }: StartupAnimationProps) => {
  const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    // If the animation shouldn't play at all (e.g., no video),
    // or if it has already played in this session, hide the component immediately.
    if (!canPlay || sessionStorage.getItem('startupAnimationPlayed')) {
      setShouldHide(true);
    } else {
      // If it can play and this is the first time, set the flag in session storage
      // so it doesn't play again on subsequent navigations.
      sessionStorage.setItem('startupAnimationPlayed', 'true');
    }
  }, [canPlay]); // This effect runs once when the component is first mounted.

  // If the component should be hidden, render nothing.
  if (shouldHide) {
    return null;
  }

  // Otherwise, render the animation. The CSS class `intro-overlay-animate`
  // contains the fade-out animation that will automatically hide it after playing.
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