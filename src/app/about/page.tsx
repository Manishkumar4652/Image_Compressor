import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'About Us',
  description:
    'Learn about PixOptimize - dedicated to providing fast, free, and completely private browser-side image processing tools for web developers and creators.',
  canonicalUrl: '/about',
});

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center sm:text-left mb-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
          <span className="gradient-text">About PixOptimize</span>
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Engineered for speed, simplicity, and absolute privacy.
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        <section className="rounded-3xl border border-white/60 bg-white/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-indigo-500/5">
          <h2 className="text-xl font-extrabold text-slate-900 mb-3">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed">
            PixOptimize was built to solve a fundamental problem in web tools: slow upload times and privacy concerns when editing images online. By bringing high-performance compression, resizing, and format conversion directly into the browser, users get instant results without waiting for cloud uploads.
          </p>
        </section>

        <section className="rounded-3xl border border-white/60 bg-white/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-indigo-500/5">
          <h2 className="text-xl font-extrabold text-slate-900 mb-3">Why Client-Side Processing?</h2>
          <ul className="list-disc list-inside space-y-3 text-slate-600">
            <li>
              <strong className="text-slate-900 font-bold">Speed:</strong> Processing image bytes in browser RAM is 10x faster than uploading to remote servers.
            </li>
            <li>
              <strong className="text-slate-900 font-bold">Security:</strong> Sensitive documents, personal photos, and logos never leave your device.
            </li>
            <li>
              <strong className="text-slate-900 font-bold">Offline Ready:</strong> Once loaded, processing works seamlessly even without an active internet connection.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
