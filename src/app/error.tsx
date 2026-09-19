'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled PixOptimize Runtime Error:', error);
  }, [error]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20">
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
        Something Went Wrong
      </h1>
      <p className="mx-auto mt-3 max-w-md text-xs sm:text-sm text-slate-400 leading-relaxed">
        An unexpected error occurred while rendering or processing in your browser.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => reset()}
          className="rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 min-h-[44px] flex items-center justify-center"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 min-h-[44px] flex items-center justify-center"
        >
          Return to Homepage
        </Link>
      </div>
    </main>
  );
}
