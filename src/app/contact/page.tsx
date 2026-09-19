import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Contact Us',
  description: 'Get in touch with the PixOptimize team for inquiries, feature requests, or support.',
  canonicalUrl: '/contact',
});

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center sm:text-left mb-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
          <span className="gradient-text">Contact Us</span>
        </h1>
        <p className="mt-2 text-sm text-slate-500">We would love to hear your feedback and suggestions.</p>
      </div>

      <div className="rounded-3xl border border-white/60 bg-white/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-indigo-500/5">
        <form className="space-y-5 max-w-lg">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
            <textarea
              rows={4}
              placeholder="How can we help you?"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          <button
            type="button"
            className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-extrabold text-white shadow-md shadow-indigo-500/25 hover:opacity-95 transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
