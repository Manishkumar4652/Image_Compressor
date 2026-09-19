'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TOOLS } from '@/config/tools';

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsToolsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const getNavLinkClass = (href: string) =>
    `text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${isActive(href)
      ? 'font-extrabold text-purple-700 bg-purple-100/80 px-3 py-1 rounded-full border border-purple-200/80'
      : 'font-semibold text-slate-600 hover:text-slate-900'
    }`;

  const isAnyToolActive = TOOLS.some((t) => pathname.startsWith(`/${t.slug}`));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-[#f8f7fd]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-sky-400 font-extrabold text-white shadow-md shadow-purple-500/20">
            P
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Pix<span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Optimize</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center space-x-6 md:flex" aria-label="Main Navigation">
          <Link href="/" className={getNavLinkClass('/')}>
            Home
          </Link>

          {/* Tools Dropdown */}
          <div className="relative">
            <button
              suppressHydrationWarning
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              aria-expanded={isToolsOpen}
              aria-haspopup="true"
              aria-label="All Tools Menu"
              className={`flex items-center space-x-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${isAnyToolActive
                  ? 'font-extrabold text-purple-700 bg-purple-100/80 px-3 py-1 rounded-full border border-purple-200/80'
                  : 'font-semibold text-slate-600 hover:text-slate-900'
                }`}
            >
              <span>All Tools</span>
              <svg
                className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isToolsOpen && (
              <div
                className="absolute left-0 mt-3 w-64 rounded-2xl border border-slate-200/80 bg-white/95 p-3 shadow-xl backdrop-blur-2xl z-50"
                role="menu"
              >
                <div className="text-[10px] font-extrabold tracking-wider text-purple-600 px-3 py-1.5">
                  Popular Tools
                </div>
                {TOOLS.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/${tool.slug}`}
                    onClick={() => setIsToolsOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-all hover:bg-purple-50 hover:text-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${pathname === `/${tool.slug}`
                        ? 'font-extrabold text-purple-700 bg-purple-50'
                        : 'font-semibold text-slate-700'
                      }`}
                    role="menuitem"
                  >
                    <span>{tool.name}</span>
                    <span className="text-xs text-slate-400 font-mono">↗</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/about" className={getNavLinkClass('/about')}>
            About
          </Link>
          <Link href="/privacy" className={getNavLinkClass('/privacy')}>
            Privacy
          </Link>
          <Link href="/contact" className={getNavLinkClass('/contact')}>
            Contact
          </Link>
        </nav>

        {/* Header Action Button */}
        <div className="hidden md:block">
          <Link
            href="/image-compressor"
            className={
              pathname === '/image-compressor'
                ? 'rounded-full border border-purple-200 bg-purple-50/80 px-4 py-2 text-xs font-extrabold text-purple-700 transition-all hover:bg-purple-100 flex items-center space-x-1.5 shadow-xs'
                : 'flowe-pill-btn text-xs font-bold'
            }
          >
            <span>Compress Images Now</span>
            <div className={pathname === '/image-compressor' ? 'text-purple-600 font-extrabold' : 'flowe-arrow-badge'}>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          suppressHydrationWarning
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          className="rounded-xl p-2 text-slate-700 hover:bg-slate-200/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center border border-slate-200/80 bg-white/70"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Navigation - Exact text preserved */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="border-b border-slate-200/80 bg-white/95 px-5 pt-3 pb-6 md:hidden max-h-[85vh] overflow-y-auto backdrop-blur-2xl"
        >
          <div className="space-y-1.5">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex min-h-[44px] items-center rounded-xl px-4 py-2 text-base font-semibold text-slate-800 hover:bg-purple-50 hover:text-purple-700"
            >
              Home
            </Link>
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-purple-600 px-4 pt-3 pb-1">
              Tools
            </div>
            {TOOLS.map((t) => (
              <Link
                key={t.slug}
                href={`/${t.slug}`}
                onClick={() => setIsOpen(false)}
                className="flex min-h-[44px] items-center justify-between rounded-xl px-4 py-2 text-sm text-slate-600 hover:bg-purple-50 hover:text-purple-700"
              >
                <span>{t.name}</span>
                <span className="text-xs text-purple-500">↗</span>
              </Link>
            ))}
            <div className="border-t border-slate-200/80 pt-4 mt-3 space-y-1">
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="flex min-h-[44px] items-center rounded-xl px-4 py-2 text-sm text-slate-600 hover:bg-purple-50"
              >
                About Us
              </Link>
              <Link
                href="/privacy"
                onClick={() => setIsOpen(false)}
                className="flex min-h-[44px] items-center rounded-xl px-4 py-2 text-sm text-slate-600 hover:bg-purple-50"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                onClick={() => setIsOpen(false)}
                className="flex min-h-[44px] items-center rounded-xl px-4 py-2 text-sm text-slate-600 hover:bg-purple-50"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex min-h-[44px] items-center rounded-xl px-4 py-2 text-sm text-slate-600 hover:bg-purple-50"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
