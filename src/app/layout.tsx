import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { constructMetadata } from '@/lib/seo/metadata';
import { WebSiteJsonLd } from '@/components/seo/JsonLd';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' });
const serif = Instrument_Serif({ weight: ['400'], subsets: ['latin'], variable: '--font-serif', style: ['normal', 'italic'] });

export const metadata: Metadata = constructMetadata();

export const viewport: Viewport = {
  themeColor: '#f8f7fd',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light scroll-smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${jakarta.variable} ${serif.variable} min-h-screen bg-[#f8f7fd] font-sans text-slate-900 antialiased flex flex-col justify-between selection:bg-purple-200 selection:text-slate-900`}
      >
        <WebSiteJsonLd />
        <Navbar />
        <div className="flex-1 relative z-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

