'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { TOOLS } from '@/config/tools';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const compressionTools = TOOLS.filter((t) => t.category === 'compression');
  const conversionTools = TOOLS.filter((t) => t.category === 'conversion');
  const resizeTools = TOOLS.filter((t) => t.category === 'resize');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="border-t border-slate-200/80 bg-white/80 text-slate-600 backdrop-blur-xl relative z-10">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 sm:py-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Info & Social Icons */}
          <div className="col-span-2 space-y-3 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center space-x-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-sky-400 font-extrabold text-white shadow-md shadow-purple-500/20 text-sm">
                P
              </div>
              <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                Pix<span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Optimize</span>
              </span>
            </Link>

            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Fast, free, and secure online image optimization. Process 100% inside your web browser.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-2.5 pt-1 text-slate-400">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-purple-600 hover:text-white transition-colors"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-purple-600 hover:text-white transition-colors"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
              <a
                href="/contact"
                aria-label="Email Support"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-purple-600 hover:text-white transition-colors"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Compress Tools */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Compress
            </h3>
            <ul className="mt-2.5 space-y-1.5 text-xs">
              {compressionTools.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/${t.slug}`}
                    className="inline-block font-medium text-slate-600 transition-colors hover:text-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Converters & Resize */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Converters
            </h3>
            <ul className="mt-2.5 space-y-1.5 text-xs">
              {conversionTools.concat(resizeTools).map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/${t.slug}`}
                    className="inline-block font-medium text-slate-600 transition-colors hover:text-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Company
            </h3>
            <ul className="mt-2.5 space-y-1.5 text-xs">
              <li>
                <Link href="/about" className="inline-block font-medium text-slate-600 hover:text-purple-700">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="inline-block font-medium text-slate-600 hover:text-purple-700">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="inline-block font-medium text-slate-600 hover:text-purple-700">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="inline-block font-medium text-slate-600 hover:text-purple-700">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1 space-y-2 text-left">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Newsletter
            </h3>
            <p className="text-xs text-slate-500 leading-normal">
              Stay updated with new features &amp; tools.
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-1.5 w-full">
              <input
                suppressHydrationWarning
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 pr-10 text-xs text-slate-800 placeholder-slate-400 shadow-xs focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
              <button
                suppressHydrationWarning
                type="submit"
                aria-label="Subscribe to newsletter"
                className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-white transition-transform hover:scale-105 min-h-[28px] min-w-[28px]"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>

            {subscribed && (
              <div className="text-[11px] font-semibold text-emerald-600">
                ✓ Subscribed!
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between border-t border-slate-200/80 pt-5 text-xs text-slate-500 sm:flex-row gap-2">
          <p suppressHydrationWarning>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="/terms" className="hover:text-purple-700 transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-purple-700 transition-colors">
              Privacy
            </Link>
            <Link href="/sitemap.xml" className="hover:text-purple-700 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


