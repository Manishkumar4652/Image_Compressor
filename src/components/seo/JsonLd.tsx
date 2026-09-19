import React from 'react';
import { siteConfig } from '@/config/site';
import { ToolDefinition } from '@/types/tool';

interface WebSiteJsonLdProps {
  url?: string;
}

export function WebSiteJsonLd({ url = siteConfig.domain }: WebSiteJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface SoftwareAppJsonLdProps {
  tool: ToolDefinition;
  canonicalUrl: string;
}

export function SoftwareAppJsonLd({ tool, canonicalUrl }: SoftwareAppJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    operatingSystem: 'Any',
    applicationCategory: 'MultimediaApplication',
    url: canonicalUrl,
    description: tool.seoDescription,
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
    featureList: tool.features.map((f) => f.title).join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQJsonLdProps {
  faqs: { question: string; answer: string }[];
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteConfig.domain}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
