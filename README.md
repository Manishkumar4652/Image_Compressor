# PicShrink - Online Image Compressor, Resizer & Converter

A modern, fast, and privacy-first web application for image compression, resizing, and format conversion. All processing happens 100% in your browser using HTML5 Canvas—your images are never uploaded to any server.

## ✨ Key Features

- ⚡ **Smart Image Compressor**: Reduce image file sizes up to 90% without losing quality.
- 🎯 **Compress to Specific Target Sizes**: Easily compress images to exact target sizes (50KB, 100KB, 200KB, 500KB, 1MB).
- 📐 **Image Resizer**: Resize images by custom dimensions (Width x Height in pixels) or percentage scale while preserving aspect ratio.
- 🔄 **Format Converter**: Convert between PNG, JPG, and WebP instantly.
- 📦 **Batch Processing**: Upload and process multiple images at once, download as a single ZIP file.
- 🔒 **100% Privacy & Security**: Browser-side client processing. Zero server uploads.
- 📱 **Mobile & Desktop Optimized**: Seamless responsive interface tailored for smartphones and desktops.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Utilities**: JSZip (for multi-file compression downloads)

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📦 Production Build & Vercel Deployment

To test the production build locally:

```bash
npm run build
npm run start
```

### Deploying to Vercel

1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Framework Preset: **Next.js**.
5. Click **Deploy**.

