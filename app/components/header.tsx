'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      if (scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.scrollY >= 100) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    if (window.location.hash) {
      setActiveSection(window.location.hash.substring(1));
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

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

  const isActive = isScrolled || isHovered || isMobileMenuOpen;
  const isContactPage = pathname === '/contactme';

  const headerBaseClasses = 'fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform-gpu';
  const paddingClasses = isActive ? 'py-3 sm:py-4' : 'py-2 sm:py-3';
  
  const backgroundClasses = isActive 
    ? 'bg-[#E46362]/95 backdrop-blur-xl text-white shadow-[0_10px_30px_rgba(228,99,98,0.25)] border-b border-white/20' 
    : 'bg-transparent text-white border-b border-transparent';
  
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const mobileNavLinks = [
    { name: 'Home', href: '/#home', id: 'home' },
    { name: 'Fix PC', href: '/#fixpc-hero', id: 'fixpc-hero' },
    { name: "Right That's It", href: '/#rightthatsit-hero', id: 'rightthatsit-hero' },
    { name: 'Mobile Games', href: '/#mobilegames', id: 'mobilegames' },
    { name: 'Contact', href: '/contactme', id: 'contact' },
  ];

  const isFixPcActive = activeSection === 'fixpc-hero' || activeSection === 'fixpc-gallery';
  const isRightThatsItActive = activeSection === 'rightthatsit-hero' || activeSection === 'rightthatsit-gallery';
  const isMobileGamesActive = ['mobilegames', 'rocketfuel-section', 'elasticity-section', 'feed-section', 'link-section', 'spintycoon-section'].includes(activeSection);
  const isHomeActive = activeSection === 'home' || (!isFixPcActive && !isRightThatsItActive && !isMobileGamesActive && !isContactPage);

  const getLogoFilter = () => {
    if (isContactPage && !isActive) return 'brightness(0)';
    return 'none';
  };

  return (
    <>
      <header 
        className={`${headerBaseClasses} ${backgroundClasses}`}
        style={{ zIndex: 100, backfaceVisibility: 'hidden' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 -bottom-24 bg-transparent pointer-events-auto -z-10 hidden md:block" />
        
        <div className={`w-full px-6 sm:px-12 flex items-center justify-between relative z-20 transition-all duration-500 ease-in-out ${paddingClasses}`}>
          <Link href="/#home" className="flex items-center gap-3 sm:gap-5 group" onClick={() => { closeMobileMenu(); setActiveSection('home'); }}>
            <div className={`relative transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:-rotate-3 ${isActive ? 'w-12 h-12 sm:w-16 sm:h-16' : 'w-20 h-20 sm:w-28 sm:h-28'}`}>
              <Image
                src="/Assets/cat.png"
                alt="Cat Icon"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div 
              className={`relative transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:rotate-1 ${isActive ? 'w-32 h-10 sm:w-40 sm:h-12' : 'w-40 h-12 sm:w-56 sm:h-16'}`}
              style={{ 
                filter: getLogoFilter(),
                transition: 'filter 0.5s ease-in-out, width 0.5s ease-in-out, height 0.5s ease-in-out',
                transform: 'translateZ(0)'
              }}
            >
              <Image
                src="/logos/logo.png"
                alt="Unstable Cat Games Logo"
                fill
                className="object-contain transition-all duration-500 ease-in-out"
                priority
              />
            </div>
          </Link>

          <button 
            className={`md:hidden p-2 focus:outline-none transition-colors duration-300 text-current ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${!isActive ? 'hidden' : ''}`}
            style={{ zIndex: 110 }}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <nav className={`hidden md:block transition-all duration-500 ease-in-out ${!isActive ? 'opacity-0 pointer-events-none translate-x-10' : 'opacity-100 translate-x-0'}`}>
            <ul className="flex items-center space-x-8 text-lg font-medium">
              <li>
                <Link 
                  href="/#home" 
                  onClick={() => setActiveSection('home')}
                  className={`relative transition-all duration-300 hover:-translate-y-0.5 inline-block group ${isHomeActive ? 'text-white font-semibold' : 'text-white/80 hover:text-white'}`}
                >
                  Home
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${isHomeActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/#fixpc-hero" 
                  onClick={() => setActiveSection('fixpc-hero')}
                  className={`relative transition-all duration-300 hover:-translate-y-0.5 inline-block group ${isFixPcActive ? 'text-white font-semibold' : 'text-white/80 hover:text-white'}`}
                >
                  Fix PC
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${isFixPcActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/#rightthatsit-hero" 
                  onClick={() => setActiveSection('rightthatsit-hero')}
                  className={`relative transition-all duration-300 hover:-translate-y-0.5 inline-block group ${isRightThatsItActive ? 'text-white font-semibold' : 'text-white/80 hover:text-white'}`}>
                  Right That's It
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${isRightThatsItActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/#mobilegames" 
                  onClick={() => setActiveSection('mobilegames')}
                  className={`relative transition-all duration-300 hover:-translate-y-0.5 inline-block group ${isMobileGamesActive ? 'text-white font-semibold' : 'text-white/80 hover:text-white'}`}>
                  Mobile Games
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${isMobileGamesActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/contactme" 
                  className={`relative transition-all duration-300 hover:-translate-y-0.5 inline-block group ${isContactPage ? 'text-white font-semibold' : 'text-white/80 hover:text-white'}`}>
                  Contact
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${isContactPage ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div 
        className={`fixed inset-0 bg-[#0a0a0a]/98 backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        style={{ zIndex: 105 }}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
          <Link href="/#home" className="flex items-center gap-3" onClick={() => { closeMobileMenu(); setActiveSection('home'); }}>
             <div className="relative w-14 h-14">
              <Image
                src="/Assets/cat.png"
                alt="Cat Icon"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="relative w-36 h-10 transform transition-transform duration-500 hover:scale-105">
              <Image
                src="/logos/logo.png"
                alt="Unstable Cat Games Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
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
          {mobileNavLinks.map((link, i) => {
            const isThisLinkActive = link.id === 'contact' ? isContactPage :
                                     link.id === 'fixpc-hero' ? isFixPcActive : 
                                     link.id === 'rightthatsit-hero' ? isRightThatsItActive :
                                     link.id === 'mobilegames' ? isMobileGamesActive : isHomeActive;
            
            return (
              <Link 
                key={link.name}
                href={link.href} 
                onClick={() => {
                  closeMobileMenu();
                  if (link.id) setActiveSection(link.id);
                }} 
                className={`text-4xl font-black transition-all duration-500 hover:scale-110 tracking-tight transform 
                  ${isThisLinkActive ? 'text-[#E46362]' : 'text-white/90 hover:text-[#E46362]'}
                  ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
                style={{ transitionDelay: `${100 + i * 75}ms` }}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  );
};

export default Header;