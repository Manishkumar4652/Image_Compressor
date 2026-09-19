import React from 'react';
import Link from 'next/link';
import { TOOLS } from '@/config/tools';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
        404 - Page Not Found
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-xs sm:text-sm text-slate-400 leading-relaxed">
        Sorry, the page or image tool you are looking for does not exist or has been moved. Explore our popular free image tools below.
      </p>

      <div className="mt-8 flex justify-center">
        <Link
          href="/"
          className="rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 min-h-[44px] flex items-center justify-center"
        >
          Back to Homepage
        </Link>
      </div>

      <div className="mt-16 text-left border-t border-slate-800/80 pt-10">
        <h2 className="text-lg font-bold text-white mb-4 text-center">Popular Image Tools</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.slice(0, 6).map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition-all hover:border-indigo-500/50 hover:bg-slate-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <h3 className="font-semibold text-white text-sm">{tool.name}</h3>
              <p className="mt-1 text-xs text-slate-400 line-clamp-2">{tool.shortDescription}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
