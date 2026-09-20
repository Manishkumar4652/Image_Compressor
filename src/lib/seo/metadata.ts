import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

interface MetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
  keywords?: string[];
}

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
  canonicalUrl,
  keywords = ['image compressor', 'online photo resizer', 'webp converter', 'browser image tool', 'pixoptimize'],
}: MetadataOptions = {}): Metadata {
  const formattedTitle =
    title === siteConfig.name
      ? `${siteConfig.name} - ${siteConfig.tagline}`
      : `${title} | ${siteConfig.name}`;
  const absoluteCanonical = canonicalUrl
    ? canonicalUrl.startsWith('http')
      ? canonicalUrl
      : `${siteConfig.domain}${canonicalUrl}`
    : siteConfig.domain;

  return {
    title: formattedTitle,
    description,
    keywords,
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.domain),
    verification: {
      google: 't7XTQ2dp23yqvM6Ep270LR3LtPTzyXcwKle-j_Nnp6c',
    },
    alternates: {
      canonical: absoluteCanonical,
    },
    openGraph: {
      title: formattedTitle,
      description,
      url: absoluteCanonical,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: formattedTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: formattedTitle,
      description,
      images: [image],
      creator: '@pixoptimize',
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.png', type: 'image/png', sizes: '512x512' },
      ],
      shortcut: '/favicon.ico',
      apple: [
        { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
