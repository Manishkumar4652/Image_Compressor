export const siteConfig = {
  name: 'PixOptimize',
  shortName: 'PixOptimize',
  tagline: 'Compress, Resize & Optimize Images Online',
  domain: process.env.NEXT_PUBLIC_SITE_URL || 'https://pixoptimize.vercel.app',
  description:
    'Free, fast, and secure browser-side image compression, resizer, and converter tool. Compress, Resize & Optimize Images Online without uploading to external servers.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://pixoptimize.vercel.app',
  ogImage: '/og-image.png',
  creator: 'PixOptimize Team',
  links: {
    github: 'https://github.com/Manishkumar4652',
    twitter: 'https://twitter.com',
  },
  supportedFormats: ['jpeg', 'jpg', 'png', 'webp'] as const,
  maxFileSizeBytes: 50 * 1024 * 1024, // 50MB limit
  maxBatchCount: 20,
};

export type SiteConfig = typeof siteConfig;
