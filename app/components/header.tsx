'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  startScrolled?: boolean;
}

const Header = ({ startScrolled = false }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(startScrolled);
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

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [startScrolled]);

  const handleHomepageLinkClick = (e: React.MouseEvent, selector: string) => {
    if (startScrolled) return;
    
    e.preventDefault();
    const element = document.querySelector(selector) as HTMLElement | null;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const headerBaseClasses = 'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out';
  const scrolledClasses = isScrolled ? 'py-4 shadow-lg' : 'py-12 bg-transparent';
  const themeClasses = theme === 'light' ? 'bg-white/80 text-neutral-800' : 'bg-black/50 text-white';
  const combinedScrollThemeClasses = isScrolled ? `${themeClasses} backdrop-blur-lg` : 'text-white';
  const logoFilter = theme === 'light' ? 'invert' : 'invert-0';

  return (
    <header className={`${headerBaseClasses} ${combinedScrollThemeClasses} ${scrolledClasses}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          href="/" 
          onClick={(e) => handleHomepageLinkClick(e, 'main')}
          className="flex items-center gap-4"
        >
          <Image
            src="/logos/logo.png"
            alt="Unstable Cat Games Logo"
            width={isScrolled ? 120 : 240}
            height={isScrolled ? 120 : 240}
            className={`transition-all duration-500 ease-in-out ${logoFilter}`}
            priority
          />
        </Link>

        <nav className={`transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <ul className="flex items-center space-x-10 text-xl font-medium">
            <li>
              <Link 
                href="/" 
                onClick={(e) => handleHomepageLinkClick(e, 'main')} 
                className="hover:text-[#E46362] hover:scale-105 transition-all"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/#bundle" 
                onClick={(e) => handleHomepageLinkClick(e, '#bundle')} 
                className="hover:text-[#E46362] hover:scale-105 transition-all"
              >
                Bundles
              </Link>
            </li>
            <li>
              <Link href="/pcgames" className="hover:text-[#E46362] hover:scale-105 transition-all">
                PC Games
              </Link>
            </li>
            <li>
              <Link href="/mobilegames" className="hover:text-[#E46362] hover:scale-105 transition-all">
                Mobile Games
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#E46362] hover:scale-105 transition-all">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;