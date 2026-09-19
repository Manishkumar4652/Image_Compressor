import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Privacy Policy',
  description:
    'Read our privacy policy. PixOptimize operates 100% in your browser. We do not store, record, or transmit your images to any external server.',
  canonicalUrl: '/privacy',
});

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center sm:text-left mb-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
          <span className="gradient-text">Privacy Policy</span>
        </h1>
        <p className="mt-2 text-xs text-slate-500">Last updated: September 17, 2026</p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        <section className="rounded-3xl border border-white/60 bg-white/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-indigo-500/5">
          <h2 className="text-xl font-extrabold text-slate-900 mb-3">1. Local Browser Processing Guarantee</h2>
          <p className="text-slate-600 leading-relaxed">
            PixOptimize is built with a zero-server privacy architecture. All image compression, resizing, metadata stripping, and format conversion occur locally within your web browser using HTML5 Canvas and client-side JavaScript/WebAssembly.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Your images and photos are <strong className="text-slate-900 font-bold">never uploaded</strong> to our servers, stored on cloud disks, or shared with any third party.
          </p>
        </section>

        <section className="rounded-3xl border border-white/60 bg-white/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-indigo-500/5">
          <h2 className="text-xl font-extrabold text-slate-900 mb-3">2. Data Collection</h2>
          <p className="text-slate-600 leading-relaxed">
            We do not collect personal identification data, email addresses, or phone numbers. We do not track image contents or metadata extracted from your files.
          </p>
        </section>

        <section className="rounded-3xl border border-white/60 bg-white/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-indigo-500/5">
          <h2 className="text-xl font-extrabold text-slate-900 mb-3">3. Cookies & Analytics</h2>
          <p className="text-slate-600 leading-relaxed">
            We may use minimal privacy-friendly web analytics to measure page visits and user traffic patterns to improve site performance and accessibility.
          </p>
        </section>

        <section className="rounded-3xl border border-white/60 bg-white/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-indigo-500/5">
          <h2 className="text-xl font-extrabold text-slate-900 mb-3">4. Contact Us</h2>
          <p className="text-slate-600 leading-relaxed">
            If you have any questions regarding this Privacy Policy, please visit our <a href="/contact" className="text-purple-600 font-bold hover:underline">Contact Page</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
