export type ImageFormat = 'jpeg' | 'jpg' | 'png' | 'webp' | 'avif';

export type ToolCategory = 'compression' | 'resize' | 'conversion' | 'optimization';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

export interface StepItem {
  stepNumber: number;
  title: string;
  description: string;
}

export interface ToolDefinition {
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: ToolCategory;
  supportedInputFormats: ImageFormat[];
  supportedOutputFormats: ImageFormat[];
  defaultQuality?: number;
  targetSizeBytes?: number; // e.g. 51200 for 50KB, 102400 for 100KB
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  features: FeatureItem[];
  howItWorks: StepItem[];
  faqs: FAQItem[];
}
