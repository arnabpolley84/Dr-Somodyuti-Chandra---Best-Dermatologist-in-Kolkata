import React, { useEffect, useState } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { CLINIC_INFO, NAV_ITEMS } from '../data/clinicData';
import { TypedText } from './TypedText';

interface HeaderProps {
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookClick }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-200 border-b border-[#DCE5E5] bg-white/95 backdrop-blur-md pt-[env(safe-area-inset-top)] ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 xl:gap-8">
        {/* Zone 1: Brand Wordmark (Single line, zero wrap) */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="font-display text-lg sm:text-xl font-semibold tracking-tight text-[#0B2E33] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F4C54]"
        >
          <TypedText text={CLINIC_INFO.doctorName} immediate singleLine showCursor={false} />
        </a>

        {/* Zone 2: Desktop Navigation Links (All single line) */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-4 xl:gap-6 text-[13px] xl:text-sm font-medium text-[#35494C]"
        >
          {NAV_ITEMS.map((item, idx) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="whitespace-nowrap shrink-0 py-1 hover:text-[#0F4C54] transition-colors border-b-2 border-transparent hover:border-[#C49A5B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F4C54]"
            >
              <TypedText
                text={item.label}
                immediate
                singleLine
                delay={idx * 45}
                showCursor={false}
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action + Mobile Hamburger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onBookClick}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs xl:text-sm font-semibold text-white bg-[#0F4C54] hover:bg-[#0B393F] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C54]"
          >
            <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <TypedText text="Book Appointment" immediate singleLine showCursor={false} />
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-[#0B2E33] hover:bg-[#EDF3F3] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C54]"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#DCE5E5] bg-white px-4 py-4 shadow-lg max-h-[calc(100dvh-4rem)] overflow-y-auto">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="min-h-[44px] px-3 flex items-center text-sm font-medium text-[#132325] hover:bg-[#F6F8F8] hover:text-[#0F4C54] rounded-md whitespace-nowrap transition-colors"
              >
                <TypedText text={item.label} immediate singleLine showCursor={false} />
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-[#EDF3F3]">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onBookClick();
                }}
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#0F4C54] hover:bg-[#0B393F] rounded-md whitespace-nowrap transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                <TypedText text="Book Appointment" immediate singleLine showCursor={false} />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
