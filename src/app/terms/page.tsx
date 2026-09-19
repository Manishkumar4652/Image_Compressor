import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Terms of Service',
  description:
    'Read the PixOptimize Terms of Service. Learn about acceptable use, browser-side file processing, and user responsibilities.',
  canonicalUrl: '/terms',
});

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center sm:text-left mb-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
          <span className="gradient-text">Terms of Service</span>
        </h1>
        <p className="mt-2 text-xs text-slate-500">Last updated: September 17, 2026</p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        <section className="rounded-3xl border border-white/60 bg-white/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-indigo-500/5">
          <h2 className="text-xl font-extrabold text-slate-900 mb-3">1. Acceptance of Terms</h2>
          <p className="text-slate-600 leading-relaxed">
            By accessing and using PixOptimize (&quot;the Service&quot;), you agree to comply with and be bound by these Terms of Service. PixOptimize provides free, browser-based image compression, resizing, and format conversion tools.
          </p>
        </section>

        <section className="rounded-3xl border border-white/60 bg-white/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-indigo-500/5">
          <h2 className="text-xl font-extrabold text-slate-900 mb-3">2. Local Browser Processing & Limitations</h2>
          <p className="text-slate-600 leading-relaxed">
            All image manipulation operations (compression, resizing, format conversion, and ZIP archiving) take place strictly within your web browser using client-side JavaScript and HTML5 Canvas APIs.
          </p>
          <ul className="mt-3 list-disc list-inside space-y-2 text-slate-600">
            <li>Your files are never transmitted to, uploaded to, or stored on any external server.</li>
            <li>Processing speed and memory limits depend directly on your device hardware and browser capabilities.</li>
            <li>PixOptimize does not create backup copies of your images; you are responsible for maintaining original copies of your files.</li>
          </ul>
        </section>

        <section className="rounded-3xl border border-white/60 bg-white/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-indigo-500/5">
          <h2 className="text-xl font-extrabold text-slate-900 mb-3">3. Acceptable Use & User Responsibility</h2>
          <p className="text-slate-600 leading-relaxed">
            You retain full ownership and intellectual property rights to all images you process using PixOptimize. You agree not to use the Service to process unlawful, infringing, or malicious content. You are solely responsible for ensuring you possess the legal rights to compress and modify any uploaded image files.
          </p>
        </section>

        <section className="rounded-3xl border border-white/60 bg-white/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-indigo-500/5">
          <h2 className="text-xl font-extrabold text-slate-900 mb-3">4. Disclaimer of Warranties & Limitation of Liability</h2>
          <p className="text-slate-600 leading-relaxed">
            PixOptimize is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, whether express or implied. In no event shall PixOptimize or its operators be liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use the Service.
          </p>
        </section>

        <section className="rounded-3xl border border-white/60 bg-white/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-indigo-500/5">
          <h2 className="text-xl font-extrabold text-slate-900 mb-3">5. Contact & Questions</h2>
          <p className="text-slate-600 leading-relaxed">
            If you have any questions regarding these Terms of Service, please reach out via our <a href="/contact" className="text-purple-600 font-bold hover:underline">Contact Page</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
