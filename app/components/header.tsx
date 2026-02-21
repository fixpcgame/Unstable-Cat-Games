'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  startScrolled?: boolean;
}

const Header = ({ startScrolled = false }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(startScrolled);
  const [isHovered, setIsHovered] = useState(false);
  const [theme, setTheme] = useState(startScrolled ? 'light' : 'dark');

  useEffect(() => {
    if (startScrolled) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionTheme = entry.target.getAttribute('data-theme');
            setTheme(sectionTheme || 'dark');
          }
        });
      },
      { rootMargin: '-100px 0px -85% 0px' }
    );

    const sections = document.querySelectorAll('[data-theme]');
    sections.forEach((section) => observer.observe(section));

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [startScrolled]);

  const isActive = isScrolled || startScrolled || isHovered;

  const headerBaseClasses = 'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out';
  const paddingClasses = isActive ? 'py-4 sm:py-5' : 'py-8 sm:py-12';
  
  const themeClasses = theme === 'light' 
    ? 'bg-white/95 text-gray-900 shadow-md' 
    : 'bg-[#0a0a0a]/95 text-white shadow-lg';
    
  const backgroundClasses = isActive ? `${themeClasses} backdrop-blur-md` : 'bg-transparent text-white';
  
  const logoFilter = (theme === 'light' && isActive) ? 'invert' : 'invert-0';

  return (
    <header 
      className={`${headerBaseClasses} ${backgroundClasses} ${paddingClasses}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 -bottom-24 bg-transparent pointer-events-auto -z-10" />
      <div className="container mx-auto px-4 sm:px-12 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-4">
          <div className={`relative transition-all duration-500 ease-in-out ${isActive ? 'w-32 h-10 sm:w-40 sm:h-12' : 'w-48 h-16 sm:w-64 sm:h-20'}`}>
            <Image
              src="/logos/logo.png"
              alt="Unstable Cat Games Logo"
              fill
              className={`object-contain transition-all duration-500 ease-in-out ${logoFilter}`}
              priority
            />
          </div>
        </Link>

        <nav className={`transition-all duration-500 ease-in-out ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
          <ul className="flex items-center space-x-6 sm:space-x-10 text-lg sm:text-xl font-medium">
            <li>
              <Link href="/" className="hover:text-[#E46362] hover:scale-105 transition-all inline-block">
                Home
              </Link>
            </li>
            <li>
              <Link href="/#bundle" className="hover:text-[#E46362] hover:scale-105 transition-all inline-block">
                Bundles
              </Link>
            </li>
            <li>
              <Link href="/pcgames" className="hover:text-[#E46362] hover:scale-105 transition-all inline-block">
                PC Games
              </Link>
            </li>
            <li>
              <Link href="/mobilegames" className="hover:text-[#E46362] hover:scale-105 transition-all inline-block">
                Mobile Games
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;