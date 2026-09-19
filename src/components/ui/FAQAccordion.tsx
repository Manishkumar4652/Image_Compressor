'use client';

import React, { useState } from 'react';
import { FAQItem } from '@/types/tool';

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`rounded-2xl border transition-all duration-300 backdrop-blur-xl ${
              isOpen
                ? 'border-purple-300 bg-white/95 shadow-md shadow-purple-500/5'
                : 'border-slate-200/80 bg-white/70 hover:border-purple-200 hover:bg-white/90'
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between p-5 text-left font-semibold text-slate-900 hover:text-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-2xl min-h-[44px]"
              aria-expanded={isOpen}
            >
              <span className="text-base font-bold pr-3">{faq.question}</span>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-500'}`}>
                <svg
                  className={`h-4 w-4 transform transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            {isOpen && (
              <div className="border-t border-slate-200/60 px-5 pb-5 pt-3 text-xs leading-relaxed text-slate-600">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
