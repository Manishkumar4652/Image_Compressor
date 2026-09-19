'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ToolDefinition } from '@/types/tool';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { UploadDropzone } from '@/components/ui/UploadDropzone';
import { CompressorWorkspace } from '@/components/tools/CompressorWorkspace';
import { TargetSizeCompressor } from '@/components/tools/TargetSizeCompressor';
import { ImageResizerTool } from '@/components/tools/ImageResizerTool';
import { FormatConverterTool } from '@/components/tools/FormatConverterTool';
import { RelatedTools } from '@/components/tools/RelatedTools';
import { SoftwareAppJsonLd, BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd';
import { AdSlot } from '@/components/ui/AdSlot';
import { siteConfig } from '@/config/site';
import { trackToolOpen } from '@/lib/analytics';

interface ToolPageLayoutProps {
  tool: ToolDefinition;
}

export function ToolPageLayout({ tool }: ToolPageLayoutProps) {
  useEffect(() => {
    const path = typeof window !== 'undefined' ? window.location.pathname : `/${tool.slug}`;
    trackToolOpen(tool.slug, tool.category, path);
  }, [tool.slug, tool.category]);

  const canonicalUrl = `${siteConfig.domain}/${tool.slug}`;

  const breadcrumbItems = [
    { label: 'Tools', href: '/' },
    { label: tool.name },
  ];

  const isMainCompressorTool = tool.slug === 'image-compressor';
  const isTargetSizeTool = tool.slug === 'compress-image-to-50kb' || tool.slug === 'compress-image-to-100kb';
  const isResizerTool = tool.slug === 'image-resizer';
  const isConverterTool =
    tool.slug === 'jpg-to-webp' || tool.slug === 'png-to-webp' || tool.slug === 'webp-to-jpg' || tool.slug === 'image-converter';

  return (
    <>
      {/* Schema.org Structured Data */}
      <SoftwareAppJsonLd tool={tool} canonicalUrl={canonicalUrl} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: tool.name, url: `/${tool.slug}` },
        ]}
      />
      <FAQJsonLd faqs={tool.faqs} />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Section */}
        <div className="mb-8 text-center sm:mb-12">
          <h1 className="text-2xl font-extrabold sm:text-4xl lg:text-5xl leading-tight sm:leading-snug py-1">
            <span className="gradient-text pb-2 px-1">{tool.name}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {tool.fullDescription}
          </p>
        </div>

        {/* Interactive Tool Interface */}
        {isMainCompressorTool ? (
          <CompressorWorkspace tool={tool} />
        ) : isTargetSizeTool ? (
          <TargetSizeCompressor tool={tool} initialTargetBytes={tool.targetSizeBytes} />
        ) : isResizerTool ? (
          <ImageResizerTool tool={tool} />
        ) : isConverterTool ? (
          <FormatConverterTool tool={tool} />
        ) : (
          <UploadDropzone tool={tool} />
        )}

        {/* Monetization Placeholder */}
        <AdSlot className="my-10" />

        <section className="my-16 rounded-3xl border border-purple-200/70 bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-white/90 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-purple-500/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">Your Privacy is Fully Protected</h3>
              <p className="text-xs leading-relaxed text-slate-600 max-w-xl">
                Images are processed directly inside your web browser using HTML5 Canvas. Your photos are never transferred, stored, or processed on any remote server.
              </p>
            </div>
            <Link
              href="/privacy"
              className="shrink-0 rounded-xl bg-slate-900 border border-slate-800 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 min-h-[44px] flex items-center justify-center shadow-md"
            >
              Read Privacy Policy
            </Link>
          </div>
        </section>

        {/* Related Tools */}
        <RelatedTools currentSlug={tool.slug} />
      </main>
    </>
  );
}
