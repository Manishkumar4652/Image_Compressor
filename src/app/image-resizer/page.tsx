import React from 'react';
import { notFound } from 'next/navigation';
import { getToolBySlug } from '@/config/tools';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { constructMetadata } from '@/lib/seo/metadata';

const slug = 'image-resizer';

export function generateMetadata() {
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  return constructMetadata({
    title: tool.seoTitle,
    description: tool.seoDescription,
    canonicalUrl: `/${tool.slug}`,
    keywords: tool.keywords,
  });
}

export default function ImageResizerPage() {
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  return <ToolPageLayout tool={tool} />;
}
