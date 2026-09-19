import React from 'react';
import Link from 'next/link';
import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { ScrollBackground } from '@/components/ui/ScrollBackground';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'PixOptimize - Compress, Resize & Optimize Images Online',
  description:
    'PixOptimize is a free online image compressor, resizer, and converter. Compress JPG, PNG, and WebP images online 100% in your browser with zero server uploads.',
  canonicalUrl: '/',
});

export default function HomePage() {
  const homeFaqs = [
    {
      question: 'How does PixOptimize process images without uploading to a server?',
      answer:
        'PixOptimize uses modern HTML5 WebAssembly and Canvas APIs directly inside your browser memory. Your images never leave your computer or smartphone.',
    },
    {
      question: 'Is PixOptimize completely free to use?',
      answer: 'Yes, 100% free with unlimited image compressions, conversions, and downloads.',
    },
    {
      question: 'Can I compress multiple images at once?',
      answer: 'Yes! You can upload up to 20 images at a time and download them individually or as a ZIP archive.',
    },
  ];

  const homeTools = TOOLS.filter(
    (tool) =>
      !['compress-image-to-100kb', 'compress-image-to-200kb', 'compress-image-to-500kb', 'compress-image-to-1mb'].includes(
        tool.slug
      )
  );

  return (
    <div className="relative min-h-screen">
      {/* Schema.org Structured Data for Google Traffic */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'PixOptimize',
            url: 'https://pixoptimize.vercel.app',
            applicationCategory: 'MultimediaApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires HTML5 and JavaScript support',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description:
              'Free online image compressor, resizer, and converter running 100% in your browser with zero server uploads.',
          }),
        }}
      />

      {/* Dynamic Scroll-Driven Background Animation */}
      <ScrollBackground />

      <main className="relative z-10 mx-auto max-w-7xl px-3.5 py-6 sm:px-6 lg:px-8 sm:py-8">
        {/* Flowe-inspired Hero Section */}
        <section className="relative pt-4 pb-12 sm:pt-8 sm:pb-16 lg:pt-16 lg:pb-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left">
              {/* Title with Flowe Serif Accent */}
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.15] sm:leading-[1.1]">
                Compress, Resize &amp; <br />
                <span className="font-accent gradient-text text-4xl sm:text-6xl lg:text-7xl font-normal">
                  Optimize
                </span>{' '}
                Images Online
              </h1>

              {/* Description text */}
              <p className="max-w-xl text-sm sm:text-lg leading-relaxed text-slate-600 font-medium">
                PixOptimize provides free online image optimization for JPG, PNG, and WebP. Reduce file sizes by up to 80% without sacrificing visual quality or privacy.
              </p>

              {/* Action Buttons: Full width stack on small mobile, row on tablet/desktop */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link href="/image-compressor" className="flowe-pill-btn justify-center text-xs font-bold py-3.5 px-6">
                  <span>Open Image Compressor</span>
                  <div className="flowe-arrow-badge">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </Link>

                <Link
                  href="/image-resizer"
                  className="rounded-full border border-slate-300 bg-white/80 px-6 py-3.5 text-xs font-bold text-slate-700 shadow-xs backdrop-blur-md transition-all hover:bg-white hover:border-purple-400 hover:text-purple-700 flex items-center justify-center space-x-2 min-h-[44px]"
                >
                  <span>Resize Images</span>
                  <svg className="h-3.5 w-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Graphic: Scaled down on small mobile screens */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-lg">
                {/* Soft Pastel Aura */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[260px] sm:h-[350px] w-[260px] sm:w-[350px] rounded-full bg-gradient-to-tr from-purple-300/50 via-sky-200/40 to-emerald-200/30 blur-3xl" />

                {/* Floating Glass Graphic */}
                <div className="relative flex items-center justify-center py-6 sm:py-10 animate-float-soft">
                  <div className="relative w-64 h-64 sm:w-96 sm:h-96">
                    {/* Layer 1: Glass Petal A */}
                    <div 
                      className="absolute inset-3 sm:inset-4 rounded-3xl border border-white/80 bg-gradient-to-tr from-purple-300/40 via-indigo-200/30 to-sky-200/20 backdrop-blur-md shadow-xl transition-all duration-700 hover:scale-105"
                    />
                    {/* Layer 2: Glass Petal B */}
                    <div 
                      className="absolute inset-6 sm:inset-8 rounded-3xl border border-white/90 bg-gradient-to-br from-emerald-200/40 via-teal-200/30 to-purple-200/30 backdrop-blur-lg shadow-2xl transition-all duration-700 rotate-12 hover:rotate-45"
                    />
                    {/* Layer 3: Glass Lens Overlay */}
                    <div className="absolute inset-12 sm:inset-16 rounded-full border border-white/95 bg-white/40 backdrop-blur-2xl shadow-inner flex items-center justify-center">
                      <div className="rounded-full bg-white/90 p-3.5 sm:p-5 shadow-lg border border-purple-100 text-center">
                        <div className="text-[9px] sm:text-[10px] tracking-widest text-purple-600 font-extrabold">Instant Flow</div>
                        <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">80% Size Saved ↗</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Highlight Bar */}
        <section className="my-6 sm:my-10 rounded-3xl border border-slate-200/80 bg-white/80 p-4 sm:p-8 backdrop-blur-xl shadow-xs">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            <div className="flex items-center space-x-3 sm:space-x-4 p-2 sm:p-0">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 font-extrabold text-sm sm:text-base">
                ⚡
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900">100%</div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-500">Browser Memory</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4 p-2 sm:p-0">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 font-extrabold text-sm sm:text-base">
                🚀
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900">80%</div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-500">Size Reduction</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4 p-2 sm:p-0">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 font-extrabold text-sm sm:text-base">
                🔒
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900">0 Uploads</div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-500">Total Privacy</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4 p-2 sm:p-0">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 font-extrabold text-sm sm:text-base">
                ✨
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900">Batch ZIP</div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-500">Single Click</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid Section */}
        <section className="my-12 sm:my-20">
          <div className="mb-6 sm:mb-10 space-y-1.5 sm:space-y-2 border-b border-slate-200/80 pb-4 sm:pb-6">
            <span className="text-xs font-extrabold tracking-wider text-purple-600">
              Optimization Tools
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              All Image Tools
            </h2>
            <p className="text-xs text-slate-500 max-w-xl">
              Select a specialized tool tailored for your specific image workflow.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-3">
            {homeTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="my-12 sm:my-28 rounded-3xl border border-slate-200/80 bg-white/80 p-4 sm:p-12 backdrop-blur-xl shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
            <span className="text-xs font-extrabold tracking-wider text-purple-600">
              Features
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Built for Speed &amp; Total Privacy
            </h2>
            <p className="text-xs text-slate-500">
              Why web developers, photographers, and professionals choose PixOptimize.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-8 lg:grid-cols-3">
            <FeatureCard
              title="Zero Cloud Uploads"
              description="Your images are processed directly in your browser memory. Data never touches remote cloud servers."
              iconType="privacy"
            />
            <FeatureCard
              title="Blazing Fast Execution"
              description="Instant compression powered by WebAssembly canvas routines with no queue waiting times."
              iconType="performance"
            />
            <FeatureCard
              title="Batch Processing &amp; ZIP"
              description="Optimize multiple images simultaneously and save them with a single click ZIP download."
              iconType="connectivity"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="my-12 sm:my-20 max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 space-y-2">
            <span className="text-xs font-extrabold tracking-wider text-purple-600">
              Support
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500">
              Everything you need to know about our browser-based image platform.
            </p>
          </div>

          <FAQAccordion faqs={homeFaqs} />
        </section>
      </main>
    </div>
  );
}
