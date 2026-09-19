import React from 'react';
import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';

interface RelatedToolsProps {
  currentSlug: string;
}

export function RelatedTools({ currentSlug }: RelatedToolsProps) {
  const getRelatedSlugs = (slug: string): string[] => {
    switch (slug) {
      case 'image-compressor':
        return ['jpg-compressor', 'png-compressor', 'webp-compressor'];
      case 'jpg-compressor':
        return ['jpg-to-webp', 'compress-image-to-100kb', 'image-resizer'];
      case 'png-compressor':
        return ['png-to-webp', 'compress-image-to-100kb', 'image-resizer'];
      case 'webp-compressor':
        return ['webp-to-jpg', 'image-compressor', 'image-resizer'];
      case 'image-resizer':
        return ['image-compressor', 'jpg-compressor', 'png-compressor'];
      case 'image-converter':
        return ['jpg-to-webp', 'png-to-webp', 'webp-to-jpg'];
      case 'jpg-to-webp':
        return ['png-to-webp', 'webp-to-jpg', 'jpg-compressor'];
      case 'png-to-webp':
        return ['jpg-to-webp', 'png-compressor', 'image-converter'];
      case 'webp-to-jpg':
        return ['jpg-to-webp', 'webp-compressor', 'image-converter'];
      case 'compress-image-to-50kb':
        return ['compress-image-to-100kb', 'compress-image-to-200kb', 'image-compressor'];
      case 'compress-image-to-100kb':
        return ['compress-image-to-50kb', 'compress-image-to-200kb', 'image-compressor'];
      case 'compress-image-to-200kb':
        return ['compress-image-to-100kb', 'compress-image-to-500kb', 'image-compressor'];
      case 'compress-image-to-500kb':
        return ['compress-image-to-200kb', 'compress-image-to-1mb', 'image-compressor'];
      case 'compress-image-to-1mb':
        return ['compress-image-to-500kb', 'compress-image-to-200kb', 'image-compressor'];
      default:
        return TOOLS.filter((t) => t.slug !== slug).slice(0, 3).map((t) => t.slug);
    }
  };

  const relatedSlugs = getRelatedSlugs(currentSlug);
  const related = TOOLS.filter((t) => relatedSlugs.includes(t.slug));

  return (
    <section className="my-16 border-t border-slate-200/80 pt-12">
      <div className="mb-8">
        <span className="text-xs font-extrabold uppercase tracking-widest text-purple-600">
          EXPLORE MORE
        </span>
        <h2 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl tracking-tight">
          Related Image Tools
        </h2>
        <p className="mt-1.5 text-xs text-slate-500">
          Explore more free browser-side optimization and conversion utilities.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-3">
        {related.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}
