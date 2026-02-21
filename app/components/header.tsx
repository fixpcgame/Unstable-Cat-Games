'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  startScrolled?: boolean;
}

const Header = ({ startScrolled = false }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(startScrolled);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const pathname = usePathname();

  useEffect(() => {
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

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    if (startScrolled) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    const timeout = setTimeout(handleScroll, 50);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, [startScrolled]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = isScrolled || startScrolled || isHovered || isMobileMenuOpen;

  const headerBaseClasses = 'fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out';
  const paddingClasses = isActive ? 'py-4 sm:py-5' : 'py-6 sm:py-10';
  
  const themeClasses = theme === 'light' 
    ? 'bg-white/90 text-gray-900 shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-b border-gray-200/50' 
    : 'bg-[#0a0a0a]/90 text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-b border-white/10';
    
  const backgroundClasses = isActive ? `${themeClasses} backdrop-blur-xl` : 'bg-transparent text-white border-b border-transparent';
  
  const logoFilter = (theme === 'light' && isActive) ? 'invert' : 'invert-0';

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const mobileNavLinks = [
    { name: 'Home', href: '/', color: 'hover:text-[#E46362]' },
    { name: 'Bundles', href: '/#bundle', color: 'hover:text-[#F9C462]' },
    { name: 'PC Games', href: '/pcgames', color: 'hover:text-[#8B5CF6]' },
    { name: 'Mobile Games', href: '/mobilegames', color: 'hover:text-[#4ECDC4]' },
  ];

  return (
    <>
      <header 
        className={`${headerBaseClasses} ${backgroundClasses}`}
        style={{ zIndex: 100 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 -bottom-24 bg-transparent pointer-events-auto -z-10 hidden md:block" />
        
        <div className={`container mx-auto px-6 sm:px-12 flex items-center justify-between relative z-20 transition-all duration-500 ease-in-out ${paddingClasses}`}>
          <Link href="/" className="flex items-center gap-4 group" onClick={closeMobileMenu}>
            <div className={`relative transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:rotate-1 ${isActive ? 'w-32 h-10 sm:w-40 sm:h-12' : 'w-40 h-12 sm:w-56 sm:h-16'}`}>
              <Image
                src="/logos/logo.png"
                alt="Unstable Cat Games Logo"
                fill
                className={`object-contain transition-all duration-500 ease-in-out ${logoFilter}`}
                priority
              />
            </div>
          </Link>

          <button 
            className={`md:hidden p-2 focus:outline-none transition-colors duration-300 text-current ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            style={{ zIndex: 110 }}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <nav className="hidden md:block transition-all duration-500 ease-in-out">
            <ul className="flex items-center space-x-10 text-xl font-medium">
              <li>
                <Link href="/" className={`relative transition-all duration-300 hover:text-[#E46362] hover:-translate-y-0.5 inline-block ${pathname === '/' ? 'text-[#E46362]' : ''}`}>
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E46362] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/#bundle" className="relative transition-all duration-300 hover:text-[#F9C462] hover:-translate-y-0.5 inline-block">
                  Bundles
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F9C462] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/pcgames" className={`relative transition-all duration-300 hover:text-[#8B5CF6] hover:-translate-y-0.5 inline-block ${pathname === '/pcgames' ? 'text-[#8B5CF6]' : ''}`}>
                  PC Games
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8B5CF6] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/mobilegames" className={`relative transition-all duration-300 hover:text-[#4ECDC4] hover:-translate-y-0.5 inline-block ${pathname === '/mobilegames' ? 'text-[#4ECDC4]' : ''}`}>
                  Mobile Games
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4ECDC4] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div 
        className={`fixed inset-0 bg-[#050505]/98 backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        style={{ zIndex: 105 }}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
          <Link href="/" className="relative w-36 h-10 transform transition-transform duration-500 hover:scale-105" onClick={closeMobileMenu}>
            <Image
              src="/logos/logo.png"
              alt="Unstable Cat Games Logo"
              fill
              className="object-contain invert-0"
              priority
            />
          </Link>
          <button 
            className="p-2 text-white hover:text-[#E46362] transition-transform duration-500 hover:rotate-90 focus:outline-none"
            onClick={closeMobileMenu}
            aria-label="Close mobile menu"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 flex flex-col items-center justify-center space-y-8 pb-10">
          {mobileNavLinks.map((link, i) => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={closeMobileMenu} 
              className={`text-4xl font-black text-white ${link.color} transition-all duration-500 hover:scale-110 tracking-tight transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
              style={{ transitionDelay: `${100 + i * 75}ms` }}
            >
              {link.name}
            </Link>
          ))}

          <div className={`mt-10 transform transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100 delay-500' : 'translate-y-16 opacity-0'}`}>
            <a 
              href="https://discord.gg/XwgbrfYd" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className="group relative px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-full transition-all duration-300 shadow-[0_10px_30px_rgba(88,101,242,0.3)] hover:shadow-[0_15px_40px_rgba(88,101,242,0.5)] flex items-center gap-3 text-lg"
            >
              <svg className="w-6 h-6 fill-current transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" viewBox="0 0 127.14 96.36">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.1,46,96,53,91.08,65.69,84.69,65.69Z"/>
              </svg>
              Join Discord
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;