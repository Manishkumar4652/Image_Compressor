import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex justify-center">
      <ol className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500">
        <li>
          <Link
            href="/"
            className="transition-colors hover:text-purple-700 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded px-1 py-0.5"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-1.5">
            <span className="text-slate-400">/</span>
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-purple-700 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded px-1 py-0.5"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-bold text-slate-800 px-1 py-0.5">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
