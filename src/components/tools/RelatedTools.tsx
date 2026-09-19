import React from 'react';
import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';

interface RelatedToolsProps {
  currentSlug: string;
}

export function RelatedTools({ currentSlug }: RelatedToolsProps) {
  const currentTool = TOOLS.find((t) => t.slug === currentSlug);
  const related = TOOLS.filter((t) => t.slug !== currentSlug && (t.category === currentTool?.category || true)).slice(0, 3);

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
