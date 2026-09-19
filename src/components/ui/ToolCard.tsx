import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ToolDefinition } from '@/types/tool';

interface ToolCardProps {
  tool: ToolDefinition;
}

export function ToolCard({ tool }: ToolCardProps) {
  // Unique per-tool image & badge details
  const getToolMeta = () => {
    switch (tool.slug) {
      case 'image-compressor':
        return { image: '/images/tools/compress.jpg', badge: '⚡ SMART ENGINE' };
      case 'jpg-compressor':
        return { image: '/images/tools/compress.jpg', badge: '📷 JPEG OPTIMIZER' };
      case 'png-compressor':
        return { image: '/images/tools/png.jpg', badge: '🎨 PNG TRANSPARENCY' };
      case 'webp-compressor':
        return { image: '/images/tools/convert.jpg', badge: '✨ NEXT-GEN WEBP' };
      case 'image-resizer':
        return { image: '/images/tools/resize.jpg', badge: '📐 ASPECT RESIZE' };
      case 'jpg-to-webp':
        return { image: '/images/tools/convert.jpg', badge: '🔄 JPG ➔ WEBP' };
      case 'png-to-webp':
        return { image: '/images/tools/png.jpg', badge: '🔄 PNG ➔ WEBP' };
      case 'webp-to-jpg':
        return { image: '/images/tools/convert.jpg', badge: '🔄 WEBP ➔ JPG' };
      case 'image-converter':
        return { image: '/images/tools/convert.jpg', badge: '🔄 ALL-IN-ONE CONVERTER' };
      case 'compress-image-to-50kb':
        return { image: '/images/tools/target_size.jpg', badge: '🎯 STRICT 50 KB' };
      case 'compress-image-to-100kb':
        return { image: '/images/tools/target_size.jpg', badge: '🎯 STRICT 100 KB' };
      case 'compress-image-to-200kb':
        return { image: '/images/tools/target_size.jpg', badge: '🎯 STRICT 200 KB' };
      case 'compress-image-to-500kb':
        return { image: '/images/tools/target_size.jpg', badge: '🎯 STRICT 500 KB' };
      case 'compress-image-to-1mb':
        return { image: '/images/tools/target_size.jpg', badge: '🎯 STRICT 1 MB' };
      default:
        return { image: '/images/tools/compress.jpg', badge: '✨ TOOL' };
    }
  };

  const meta = getToolMeta();

  return (
    <Link
      href={`/${tool.slug}`}
      className="flowe-card group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl p-3 sm:p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 overflow-hidden active:scale-[0.98] transition-transform"
    >
      <div>
        {/* Top Unique Image Preview Banner */}
        <div className="relative mb-3 sm:mb-5 h-28 sm:h-44 w-full overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/80 bg-slate-100 shadow-inner">
          <Image
            src={meta.image}
            alt={tool.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
          
          {/* Format Badges Overlay on Image */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex space-x-1 sm:space-x-1.5 z-10">
            {tool.supportedInputFormats.slice(0, 2).map((fmt) => (
              <span
                key={fmt}
                className="uppercase bg-white/95 text-slate-900 border border-slate-200 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider font-extrabold shadow-xs backdrop-blur-md"
              >
                {fmt}
              </span>
            ))}
          </div>
        </div>

        <h3 className="text-sm sm:text-xl font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors leading-snug">
          {tool.name}
        </h3>
        <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-xs leading-relaxed text-slate-600 line-clamp-2 hidden sm:block">
          {tool.shortDescription}
        </p>
      </div>

      {/* Bottom Action Footer */}
      <div className="mt-3 sm:mt-5 flex items-center justify-between rounded-xl sm:rounded-2xl border border-purple-100 bg-purple-50/60 px-2.5 py-1.5 sm:px-4 sm:py-3 text-[10px] sm:text-xs font-bold text-slate-800 transition-all group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 shadow-2xs">
        <span className="font-extrabold tracking-wide">
          Open Tool
        </span>
        <div className="flex h-5 w-5 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm group-hover:bg-white group-hover:text-purple-700 group-hover:scale-110 group-hover:rotate-45 transition-all duration-300">
          <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}



