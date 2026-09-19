import { ToolDefinition } from '@/types/tool';

export const TOOLS: ToolDefinition[] = [
  {
    slug: 'image-compressor',
    name: 'Image Compressor',
    shortDescription: 'Compress JPG, PNG, and WebP images online with customizable quality settings.',
    fullDescription:
      'General-purpose online image compression platform. Reduce file size of photos, banners, and digital graphics while preserving visual quality with instant side-by-side comparison.',
    category: 'compression',
    supportedInputFormats: ['jpg', 'jpeg', 'png', 'webp'],
    supportedOutputFormats: ['jpg', 'jpeg', 'png', 'webp'],
    defaultQuality: 80,
    seoTitle: 'Free Online Image Compressor - Reduce Image File Size Privately',
    seoDescription:
      'Compress JPG, PNG, and WebP images online instantly with high visual quality. 100% free, private browser-based image compressor with batch ZIP support.',
    keywords: [
      'image compressor',
      'compress image online',
      'reduce image size',
      'photo compressor',
      'image size reducer',
      'compress photos online',
    ],
    features: [
      {
        title: 'Browser Memory Execution',
        description: 'Image compression runs 100% locally in your web browser memory using HTML5 Canvas. Photos are never uploaded to remote cloud servers.',
      },
      {
        title: 'Real-Time Quality Control',
        description: 'Adjust compression ratio from 1% to 100% with instant visual before/after comparison and exact byte savings calculation.',
      },
      {
        title: 'Batch Compression & ZIP',
        description: 'Upload up to 20 images simultaneously, compress them sequentially, and download all compressed files in a single ZIP archive.',
      },
      {
        title: 'Smart Format Conversion',
        description: 'Keep your original image format or convert to modern WebP for maximum bandwidth savings.',
      },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Upload Images', description: 'Drag and drop your photos into the dropzone or tap to browse files from your device.' },
      { stepNumber: 2, title: 'Adjust Settings', description: 'Use the quality slider or choose your preferred output format and target mode.' },
      { stepNumber: 3, title: 'Download Output', description: 'Save compressed photos individually or download all as a single ZIP package.' },
    ],
    faqs: [
      {
        question: 'Are my images uploaded to any external server during compression?',
        answer: 'No. All image compression occurs locally inside your web browser using HTML5 Canvas APIs. Your photos never leave your device.',
      },
      {
        question: 'Which image file formats are supported?',
        answer: 'Our main image compressor supports JPG, JPEG, PNG, and WebP input and output formats.',
      },
      {
        question: 'What is the maximum file size limit for image uploads?',
        answer: 'You can process individual images up to 50MB in size and compress up to 20 images per batch.',
      },
      {
        question: 'Does compressing an image reduce visual quality?',
        answer: 'JPG and WebP use lossy compression algorithms. Setting quality between 75% and 85% typically reduces file weight by 60% to 80% without noticeable visual loss.',
      },
    ],
  },
  {
    slug: 'jpg-compressor',
    name: 'JPG Compressor',
    shortDescription: 'Compress JPG and JPEG photos online without visible quality loss.',
    fullDescription:
      'Specialized JPEG photo optimizer tailored for digital cameras, web banners, and eCommerce photos. Fine-tune quantization to shrink file size while preserving color fidelity.',
    category: 'compression',
    supportedInputFormats: ['jpg', 'jpeg'],
    supportedOutputFormats: ['jpg', 'jpeg'],
    defaultQuality: 75,
    seoTitle: 'JPG Compressor - Reduce JPG & JPEG Photo File Size Online',
    seoDescription:
      'Compress JPG images online without visible quality loss. Optimize JPEG photos for websites, emails, and forms 100% inside your browser.',
    keywords: [
      'jpg compressor',
      'compress jpeg file',
      'reduce jpg size',
      'jpeg optimizer',
      'compress jpg photo',
      'jpg size reducer',
    ],
    features: [
      {
        title: 'JPEG Quantization Optimization',
        description: 'Optimizes discrete cosine transform (DCT) coefficient matrices for maximum byte reduction on photographic images.',
      },
      {
        title: '100% Private Client-Side',
        description: 'Processed strictly in local browser RAM. Ideal for confidential documents, personal portraits, and photography portfolios.',
      },
      {
        title: 'Batch JPG Optimization',
        description: 'Optimize multiple JPG files simultaneously with one-click ZIP download.',
      },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Select JPG Photos', description: 'Upload JPG or JPEG images from your computer or phone.' },
      { stepNumber: 2, title: 'Fine-Tune Quality', description: 'Adjust the compression slider to reach your optimal balance of quality and file size.' },
      { stepNumber: 3, title: 'Download JPG', description: 'Save optimized JPEG files directly to your device.' },
    ],
    faqs: [
      {
        question: 'How does JPG compression work?',
        answer: 'JPG compression reduces image weight by removing high-frequency color detail that the human eye cannot easily perceive.',
      },
      {
        question: 'What is the recommended quality setting for JPG photos?',
        answer: 'For web publishing, a quality setting between 70% and 80% offers optimal loading speed with high visual fidelity.',
      },
      {
        question: 'Can I convert JPG to WebP for even smaller sizes?',
        answer: 'Yes! Use our dedicated JPG to WebP converter tool to achieve up to 80% extra payload savings.',
      },
    ],
  },
  {
    slug: 'png-compressor',
    name: 'PNG Compressor',
    shortDescription: 'Shrink PNG graphics and transparent images without losing alpha transparency.',
    fullDescription:
      'Optimization tool for PNG graphics, logos, icons, and transparent illustrations. Reduce file size using lossless and lossy palette color quantization.',
    category: 'compression',
    supportedInputFormats: ['png'],
    supportedOutputFormats: ['png'],
    defaultQuality: 80,
    seoTitle: 'PNG Compressor - Shrink PNG Graphics & Transparent Images',
    seoDescription:
      'Compress PNG images online without losing transparency. High-performance PNG shrink tool running 100% in your browser.',
    keywords: [
      'png compressor',
      'shrink png',
      'compress png transparency',
      'png size reducer',
      'optimize png online',
    ],
    features: [
      {
        title: 'Alpha Channel Transparency',
        description: 'Preserves 100% of transparent background layers (alpha channels) for logos, icons, and web overlays.',
      },
      {
        title: 'Color Index Quantization',
        description: 'Intelligently reduces unnecessary color palette depth to cut PNG payload size by up to 70%.',
      },
      {
        title: 'Zero Server Risk',
        description: 'Local canvas processing guarantees corporate logos and vector PNG exports remain private.',
      },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Upload PNGs', description: 'Drag and drop PNG graphics, icons, or transparent logos into the workspace.' },
      { stepNumber: 2, title: 'Optimize PNG', description: 'Adjust target quality parameters to compress palette depth.' },
      { stepNumber: 3, title: 'Download PNG', description: 'Download your compressed transparent PNG image.' },
    ],
    faqs: [
      {
        question: 'Will PNG compression ruin transparent backgrounds?',
        answer: 'No. Our PNG optimizer explicitly preserves the 8-bit alpha channel so transparent background areas remain completely crisp.',
      },
      {
        question: 'Why are PNG files larger than JPG files?',
        answer: 'PNG uses lossless pixel encoding designed for sharp graphic edges and transparency, whereas JPG uses lossy photographic compression.',
      },
    ],
  },
  {
    slug: 'webp-compressor',
    name: 'WebP Compressor',
    shortDescription: 'Compress next-gen WebP images to ultra-small file sizes for web performance.',
    fullDescription:
      'High-efficiency compression tool for modern WebP images. Reduce file payload sizes to achieve 90+ Google Lighthouse performance scores.',
    category: 'compression',
    supportedInputFormats: ['webp'],
    supportedOutputFormats: ['webp'],
    defaultQuality: 80,
    seoTitle: 'WebP Compressor - Compress Next-Gen WebP Images Online',
    seoDescription:
      'Compress WebP images online for ultra-fast web loading speed. Free browser-side WebP compressor with batch ZIP downloads.',
    keywords: [
      'webp compressor',
      'compress webp',
      'reduce webp size',
      'webp optimizer',
      'shrink webp file',
    ],
    features: [
      {
        title: 'Next-Gen Compression Standard',
        description: 'WebP provides superior predictive spatial encoding compared to traditional JPEG and PNG formats.',
      },
      {
        title: 'Lighthouse Score Boost',
        description: 'Optimized WebP payloads improve Largest Contentful Paint (LCP) and Core Web Vitals.',
      },
      {
        title: 'Client-Side WebAssembly',
        description: 'Instant processing powered by WebAssembly canvas routines with zero server latency.',
      },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Upload WebP Files', description: 'Add your .webp images to the browser compressor.' },
      { stepNumber: 2, title: 'Set Quality', description: 'Select desired quality factor for web deployment.' },
      { stepNumber: 3, title: 'Save WebP', description: 'Download compressed WebP output files instantly.' },
    ],
    faqs: [
      {
        question: 'What are the benefits of WebP image compression?',
        answer: 'WebP images are typically 25% to 35% smaller than comparable JPEGs and PNGs at identical visual quality.',
      },
      {
        question: 'Are WebP images supported on all web browsers?',
        answer: 'Yes. All modern browsers including Chrome, Safari, Firefox, Edge, and iOS/Android mobile browsers fully support WebP.',
      },
    ],
  },
  {
    slug: 'image-resizer',
    name: 'Image Resizer',
    shortDescription: 'Resize image dimensions by pixels or percentages with aspect ratio lock.',
    fullDescription:
      'Change pixel width and height of JPG, PNG, and WebP photos. Scale images down by exact pixels or percentage presets (25%, 50%, 75%) for web banners, social media, and mobile apps.',
    category: 'resize',
    supportedInputFormats: ['jpg', 'jpeg', 'png', 'webp'],
    supportedOutputFormats: ['jpg', 'jpeg', 'png', 'webp'],
    seoTitle: 'Free Online Image Resizer - Scale Photo Width & Height Pixels',
    seoDescription:
      'Resize image dimensions online by pixels or percentage. Fast, free, and private photo resizer supporting JPG, PNG, and WebP.',
    keywords: [
      'image resizer',
      'resize image online',
      'resize photo',
      'change image dimensions',
      'pixel resizer',
      'reduce photo dimensions',
    ],
    features: [
      {
        title: 'Aspect Ratio Lock',
        description: 'Locks original height/width proportion automatically, or unlock for custom dimension stretching.',
      },
      {
        title: '1-Click Scale Presets',
        description: 'Instantly scale photos to 25%, 50%, 75%, 100%, 150%, or 200% of original pixel resolution.',
      },
      {
        title: 'Bicubic Canvas Interpolation',
        description: 'High-quality image resampling algorithms prevent pixelation and stair-stepping artifacts.',
      },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Select Photo', description: 'Upload your photo into the image resizer tool.' },
      { stepNumber: 2, title: 'Enter Dimensions', description: 'Input target width and height in pixels or select a scale preset.' },
      { stepNumber: 3, title: 'Download Resized Image', description: 'Save your perfectly dimensioned photo instantly.' },
    ],
    faqs: [
      {
        question: 'Does changing image dimensions reduce file size?',
        answer: 'Yes! Reducing pixel resolution (e.g. from 4000px to 1920px) reduces total pixel count by over 75%, resulting in a massive file size drop.',
      },
      {
        question: 'Will unlocking aspect ratio distort my image?',
        answer: 'Unlocking aspect ratio allows independent width and height input, which can stretch or compress image proportions if not calculated carefully.',
      },
    ],
  },
  {
    slug: 'jpg-to-webp',
    name: 'JPG to WebP Converter',
    shortDescription: 'Convert JPG photos to modern WebP format for faster page load speed.',
    fullDescription:
      'Transform traditional JPEG images into Google WebP format. Reduce payload sizes by up to 80% to accelerate website page loading times.',
    category: 'conversion',
    supportedInputFormats: ['jpg', 'jpeg'],
    supportedOutputFormats: ['webp'],
    defaultQuality: 80,
    seoTitle: 'JPG to WebP Converter - Convert JPEG Photos to WebP Format',
    seoDescription:
      'Convert JPG images to WebP online for free. Boost website load speed with modern WebP format conversion 100% in your browser.',
    keywords: [
      'jpg to webp',
      'convert jpeg to webp',
      'jpg to webp converter',
      'convert jpg to webp online',
    ],
    features: [
      {
        title: 'Up to 80% Payload Reduction',
        description: 'Modern WebP encoding shrinks JPEG image weight significantly while preserving sharpness.',
      },
      {
        title: 'Batch JPG Conversion',
        description: 'Convert multiple JPEG files to WebP simultaneously with instant ZIP archive download.',
      },
      {
        title: 'Local Browser Conversion',
        description: 'Conversion is performed entirely in browser memory. Your images remain 100% private.',
      },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Add JPG Photos', description: 'Select JPEG photos from your device.' },
      { stepNumber: 2, title: 'Convert', description: 'Our browser converter transforms JPEG streams into WebP format.' },
      { stepNumber: 3, title: 'Download WebP', description: 'Save optimized WebP files ready for web publishing.' },
    ],
    faqs: [
      {
        question: 'Why should I convert JPG to WebP?',
        answer: 'WebP images load faster on websites, consume less mobile data, and improve SEO performance scores in Google PageSpeed Insights.',
      },
      {
        question: 'Is WebP conversion free on PixOptimize?',
        answer: 'Yes, 100% free with unlimited image conversions and zero registration requirements.',
      },
    ],
  },
  {
    slug: 'png-to-webp',
    name: 'PNG to WebP Converter',
    shortDescription: 'Convert PNG images to WebP while preserving crisp alpha transparency.',
    fullDescription:
      'Convert heavy PNG graphics, logos, and UI elements to lightweight WebP files with 100% alpha transparency preservation.',
    category: 'conversion',
    supportedInputFormats: ['png'],
    supportedOutputFormats: ['webp'],
    defaultQuality: 80,
    seoTitle: 'PNG to WebP Converter - Convert PNG to WebP with Alpha Transparency',
    seoDescription:
      'Convert PNG to WebP online for free while preserving transparent backgrounds. Fast, private browser-based converter.',
    keywords: [
      'png to webp',
      'convert png to webp',
      'png to webp converter',
      'transparent png to webp',
    ],
    features: [
      {
        title: 'Full Alpha Transparency',
        description: 'Transparent background channels carry over cleanly from PNG to WebP without black borders.',
      },
      {
        title: 'Dramatic Size Savings',
        description: 'Reduce large transparent PNG files by 60% to 80% without losing graphic edge quality.',
      },
      {
        title: 'Client-Side Execution',
        description: 'Converts graphics locally in your browser memory without cloud server transfers.',
      },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Upload PNGs', description: 'Add your transparent PNG images or web graphics.' },
      { stepNumber: 2, title: 'Convert to WebP', description: 'Convert PNG pixels to alpha-capable WebP structure.' },
      { stepNumber: 3, title: 'Download WebP', description: 'Save lightweight WebP files with full transparent backgrounds.' },
    ],
    faqs: [
      {
        question: 'Will PNG to WebP conversion remove my transparent background?',
        answer: 'No. WebP natively supports 8-bit alpha transparency, preserving transparent regions perfectly.',
      },
    ],
  },
  {
    slug: 'webp-to-jpg',
    name: 'WebP to JPG Converter',
    shortDescription: 'Convert WebP files back to standard JPG format for universal software compatibility.',
    fullDescription:
      'Convert modern WebP images to standard JPEG format. Ensures compatibility with legacy photo editors, desktop applications, and print services.',
    category: 'conversion',
    supportedInputFormats: ['webp'],
    supportedOutputFormats: ['jpg'],
    defaultQuality: 85,
    seoTitle: 'WebP to JPG Converter - Convert WebP Images to Standard JPEG',
    seoDescription:
      'Convert WebP images to JPG online for free. Turn WebP files into standard JPEG photos in your browser with zero uploads.',
    keywords: [
      'webp to jpg',
      'convert webp to jpeg',
      'webp to jpg converter',
      'change webp to jpg',
    ],
    features: [
      {
        title: 'Universal Compatibility',
        description: 'JPEG files open on all operating systems, smart TVs, legacy desktop apps, and printing kiosks.',
      },
      {
        title: 'Clean Background Mapping',
        description: 'Transparent background areas in WebP are automatically mapped to clean white JPEG fill.',
      },
      {
        title: 'Instant Local Conversion',
        description: 'Runs entirely in local browser RAM with zero waiting queues or upload delays.',
      },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Upload WebP Files', description: 'Select WebP images from your phone or PC.' },
      { stepNumber: 2, title: 'Convert to JPG', description: 'Convert WebP data into standard JPEG image format.' },
      { stepNumber: 3, title: 'Download JPG', description: 'Save universal JPG photos to your device.' },
    ],
    faqs: [
      {
        question: 'What happens to WebP transparent backgrounds when converting to JPG?',
        answer: 'Because JPEG does not support transparency, transparent regions are filled with a clean white background during conversion.',
      },
    ],
  },
  {
    slug: 'compress-image-to-50kb',
    name: 'Compress Image to 50KB',
    shortDescription: 'Compress images under 50KB for online application forms, signatures, and ID uploads.',
    fullDescription:
      'Target-size photo compressor that reduces file size strictly below 50 Kilobytes. Ideal for passport photos, exam registration forms, signature uploads, job portals, and official document submissions.',
    category: 'compression',
    supportedInputFormats: ['jpg', 'jpeg', 'png', 'webp'],
    supportedOutputFormats: ['jpg', 'jpeg', 'webp'],
    targetSizeBytes: 51200, // 50 * 1024
    seoTitle: 'Compress Image to 50KB Online - Free Passport & Signature Photo Tool',
    seoDescription:
      'Compress images under 50KB online for official forms, passport photos, and signature uploads. 100% private, free browser-based target size reducer.',
    keywords: [
      'compress image to 50kb',
      'reduce image size under 50kb',
      '50kb photo compressor',
      'passport photo 50kb',
      'signature compressor 50kb',
    ],
    features: [
      {
        title: 'Strict 50KB Upper Cap',
        description: 'Bounded search algorithm guarantees output file size stays strictly under the 50 Kilobyte threshold.',
      },
      {
        title: 'Form & Portal Compliance',
        description: 'Ensures scanned signatures and passport ID photos meet official upload limits on government and exam portals.',
      },
      {
        title: 'Private Document Security',
        description: 'Scanned ID cards and passport photos are processed locally in RAM and never saved to cloud servers.',
      },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Upload Document/Photo', description: 'Select your photo or scanned signature document.' },
      { stepNumber: 2, title: 'Auto 50KB Search', description: 'Smart search engine calculates the exact quality needed to stay below 50KB.' },
      { stepNumber: 3, title: 'Download 50KB File', description: 'Save your form-ready 50KB image.' },
    ],
    faqs: [
      {
        question: 'How does the 50KB target size compressor work?',
        answer: 'The tool uses a bounded binary search algorithm to iterate compression quality factors until the file size is strictly under 50 Kilobytes.',
      },
      {
        question: 'Is it safe to compress official ID photos and certificates here?',
        answer: 'Yes. PixOptimize processes all files locally in your web browser memory. Your private documents are never sent over the internet.',
      },
    ],
  },
  {
    slug: 'compress-image-to-100kb',
    name: 'Compress Image to 100KB',
    shortDescription: 'Compress images strictly under 100KB for job application portals and resume photos.',
    fullDescription:
      'Reduce image file weight strictly under 100 Kilobytes. Designed for online application portals, resume photos, university admission forms, and web uploads.',
    category: 'compression',
    supportedInputFormats: ['jpg', 'jpeg', 'png', 'webp'],
    supportedOutputFormats: ['jpg', 'jpeg', 'webp'],
    targetSizeBytes: 102400, // 100 * 1024
    seoTitle: 'Compress Image to 100KB Online - Free Resume & Portal Photo Reducer',
    seoDescription:
      'Compress images to 100KB or less for online job applications, university admission forms, and document portals. 100% private client-side tool.',
    keywords: [
      'compress image to 100kb',
      'reduce photo size to 100kb',
      '100kb image compressor',
      'compress image under 100kb',
      'resume photo 100kb',
    ],
    features: [
      {
        title: 'Guaranteed 100KB Limit',
        description: 'Engineers file payload size to remain strictly below 100 Kilobytes.',
      },
      {
        title: 'Maximized Detail Preservation',
        description: 'Calculates the highest possible quality level that still satisfies the 100KB restriction.',
      },
      {
        title: 'Zero Upload Latency',
        description: 'Instant local browser processing with no queue waiting times.',
      },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Upload Image', description: 'Choose your picture or document file.' },
      { stepNumber: 2, title: 'Target Search', description: 'System computes optimal quality parameters under 100KB.' },
      { stepNumber: 3, title: 'Download 100KB Image', description: 'Download your document ready for submission.' },
    ],
    faqs: [
      {
        question: 'Why do application portals enforce 100KB image limits?',
        answer: 'Upload portals cap image sizes to reduce server storage overhead and ensure fast form processing for thousands of applicants.',
      },
    ],
  },
  {
    slug: 'compress-image-to-200kb',
    name: 'Compress Image to 200KB',
    shortDescription: 'Compress photos and documents under 200KB for government portals and job forms.',
    fullDescription:
      'Target-size compressor engineered to reduce image weight strictly below 200 Kilobytes. Ideal for government recruitment portals (SSC, IBPS), university registrations, email attachments, and web graphics.',
    category: 'compression',
    supportedInputFormats: ['jpg', 'jpeg', 'png', 'webp'],
    supportedOutputFormats: ['jpg', 'jpeg', 'webp'],
    targetSizeBytes: 204800, // 200 * 1024
    seoTitle: 'Compress Image to 200KB Online - Free Application Portal Optimizer',
    seoDescription:
      'Compress images strictly under 200KB for online exam forms, government job applications, and portal uploads. Fast, free, and private.',
    keywords: [
      'compress image to 200kb',
      'reduce photo size to 200kb',
      '200kb image compressor',
      'compress image under 200kb',
      'government portal image 200kb',
    ],
    features: [
      {
        title: 'Strict 200KB Upper Limit',
        description: 'Guarantees output payload size stays strictly below 200 Kilobytes for portal compliance.',
      },
      {
        title: 'High Clarity Retention',
        description: 'Finds maximum visual quality factor possible under 200KB.',
      },
      {
        title: '100% Private Processing',
        description: 'Executed in local browser memory without cloud server uploads.',
      },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Upload Image', description: 'Add your photo or document.' },
      { stepNumber: 2, title: 'Target 200KB Search', description: 'Engine iterates parameters until file weight is <= 200KB.' },
      { stepNumber: 3, title: 'Download File', description: 'Save your compliant 200KB image.' },
    ],
    faqs: [
      {
        question: 'How do I compress an image to less than 200KB?',
        answer: 'Upload your photo to our 200KB tool. The browser-side engine will automatically calculate the best quality level to keep the file under 200KB.',
      },
    ],
  },
  {
    slug: 'compress-image-to-500kb',
    name: 'Compress Image to 500KB',
    shortDescription: 'Reduce high-res photos under 500KB for web publishing, blogs, and email uploads.',
    fullDescription:
      'Shrink large camera photos and graphic designs to under 500 Kilobytes. Perfect for blog post headers, eCommerce product listings, real estate photos, and email attachments.',
    category: 'compression',
    supportedInputFormats: ['jpg', 'jpeg', 'png', 'webp'],
    supportedOutputFormats: ['jpg', 'jpeg', 'webp'],
    targetSizeBytes: 512000, // 500 * 1024
    seoTitle: 'Compress Image to 500KB Online - Free Web & Blog Photo Optimizer',
    seoDescription:
      'Compress high-resolution photos under 500KB for website hero banners, eCommerce listings, and blog posts. Free browser-side optimization.',
    keywords: [
      'compress image to 500kb',
      'reduce photo size to 500kb',
      '500kb image compressor',
      'compress photo under 500kb',
      'ecommerce photo optimizer 500kb',
    ],
    features: [
      {
        title: 'Target 500KB Size Cap',
        description: 'Scales compression quality to fit high-resolution photos strictly under 500 Kilobytes.',
      },
      {
        title: 'eCommerce & Blog Ready',
        description: 'Ideal balance of sharp visual quality and fast website loading speed.',
      },
      {
        title: 'Client-Side Security',
        description: 'Local canvas execution protects commercial product photos.',
      },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Select High-Res Photo', description: 'Upload your camera picture or graphic.' },
      { stepNumber: 2, title: 'Optimize for 500KB', description: 'Smart engine compresses file data to fit under 500KB.' },
      { stepNumber: 3, title: 'Download Image', description: 'Save lightweight 500KB output.' },
    ],
    faqs: [
      {
        question: 'Is 500KB a good file size for website images?',
        answer: 'Yes! Keeping website hero images and product photos under 500KB ensures fast page loading without sacrificing visual clarity.',
      },
    ],
  },
  {
    slug: 'compress-image-to-1mb',
    name: 'Compress Image to 1MB',
    shortDescription: 'Compress large camera photos under 1MB for fast web sharing and photography portfolios.',
    fullDescription:
      'Reduce heavy multi-megabyte camera photos to under 1 Megabyte. Designed for photography portfolios, email attachments, real estate listings, and cloud storage optimization.',
    category: 'compression',
    supportedInputFormats: ['jpg', 'jpeg', 'png', 'webp'],
    supportedOutputFormats: ['jpg', 'jpeg', 'webp'],
    targetSizeBytes: 1048576, // 1 * 1024 * 1024
    seoTitle: 'Compress Image to 1MB Online - Free Camera Photo Size Reducer',
    seoDescription:
      'Shrink multi-megabyte camera photos under 1MB for email attachments, photography portfolios, and web sharing. 100% local RAM execution.',
    keywords: [
      'compress image to 1mb',
      'reduce photo size to 1mb',
      '1mb image compressor',
      'compress photo under 1mb',
      'shrink 10mb photo to 1mb',
    ],
    features: [
      {
        title: 'Strict 1MB Threshold',
        description: 'Reduces 10MB+ camera RAW exports strictly under 1 Megabyte.',
      },
      {
        title: 'Retains Fine Photo Details',
        description: 'Keeps high pixel sharpness for desktop display and printing.',
      },
      {
        title: 'Zero Cloud Storage Risk',
        description: 'All processing occurs locally on your phone or computer.',
      },
    ],
    howItWorks: [
      { stepNumber: 1, title: 'Upload Large Photo', description: 'Add your multi-megabyte image file.' },
      { stepNumber: 2, title: '1MB Compression', description: 'Engine iterates parameters to cap weight at 1MB.' },
      { stepNumber: 3, title: 'Download Output', description: 'Download your optimized 1MB photo.' },
    ],
    faqs: [
      {
        question: 'How do I reduce a 10MB photo to 1MB?',
        answer: 'Upload your 10MB photo to our 1MB tool. The browser-side engine will optimize compression quality to bring file weight under 1MB.',
      },
    ],
  },
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): ToolDefinition[] {
  return TOOLS.filter((t) => t.category === category);
}
