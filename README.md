# 🚀 Anatomy of an Optimized Astro Website

A guide to building a blazing-fast static website with Astro, Bun, and modern web optimizations.

## 🏁 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.0 or later)
- Git (for version control)

### Project Setup

```bash
# Create new Astro project with Bun
bun create astro@latest <project-name>
cd <project-name>
```

### Development Commands

| Command         | Description                            |
| --------------- | -------------------------------------- |
| `bun run dev`   | Start local development server         |
| `bun run build` | Build production-ready site to `dist/` |

### Deployment to GitHub Pages

1. Move build output to `docs` folder:

   ```bash
   mv dist docs
   touch docs/.nojekyll
   ```

2. Configure GitHub repository settings:
   - Go to Settings → Pages
   - Set "Source" to "Deploy from branch"
   - Set branch to `main` and folder to `/docs`

## 🏗️ Project Structure

```
src/
├── components/    # Reusable UI components
├── layouts/       # Page layout templates
├── pages/         # Route-based pages
├── assets/        # Optimized static assets
public/            # Static files served as-is
astro.config.mjs   # Astro configuration
```

## ✨ Astro File Anatomy

`.astro` files consist of three distinct sections:

1. **Frontmatter (JavaScript/TypeScript)**

   ```astro
   ---
   // Component logic, imports, props
   import Component from '../components/Component.astro';
   const title = "Hello World";
   ---
   ```

2. **HTML Template**

   ```astro
   <html>
     <body>
       <h1>{title}</h1>
       <Component />
     </body>
   </html>
   ```

3. **Style (CSS)**
   ```astro
   <style>
     h1 {
       color: var(--accent-color);
     }
   </style>
   ```

## 🧭 Routing System

Astro uses file-based routing:

- `src/pages/index.astro` → `/`
- `src/pages/about.astro` → `/about`
- `src/pages/blog/[slug].astro` → `/blog/:slug`

Linking between pages:

```astro
<a href="/about">About Us</a>
```

## 🖼️ Layout System

`src/layouts/Layout.astro` provides consistent page structure:

```astro
---
// Layout.astro
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
const { title } = Astro.props;
---
<html>
  <head>
    <title>{title}</title>
  </head>
  <body>
    <Header />
    <main>
      <slot /> <!-- Page content injected here -->
    </main>
    <Footer />
  </body>
</html>
```

Usage in pages:

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Homepage">
  <h1>Welcome!</h1>
</Layout>
```

## 🔍 SEO Optimization

### Essential Meta Tags

```astro
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width" />
  <meta name="description" content="Your website description" />
  <meta property="og:title" content="Your Page Title" />
  <meta property="og:description" content="Your page description" />
  <meta property="og:image" content="/social-image.webp" />
  <meta property="og:url" content="https://yourdomain.com" />
  <meta name="twitter:card" content="summary_large_image" />
</head>
```

## 🖼️ Image Optimization

### Best Practices

1. **Format Conversion** (WebP recommended)

   ```bash
   # Install webp tools
   bun add -g webp

   # Convert with quality 80 (0-100 scale)
   cwebp -q 80 input.jpg -o output.webp
   ```

2. **Astro Image Component**

   ```astro
   ---
   import { Image } from 'astro:assets';
   import heroImage from '../assets/hero.webp';
   ---
   <Image
     src={heroImage}
     alt="Descriptive text"
     loading="eager" // or "lazy" for below-fold
     formats={['avif', 'webp']}
     width={1200}
     height={630}
   />
   ```

3. **Responsive Images**
   ```astro
   <Image
     src={heroImage}
     alt="Responsive image"
     sizes="(max-width: 768px) 100vw, 50vw"
   />
   ```

## ✒️ Font Optimization

### Best Practices for Font Loading

1. **File Location**
   ```bash
   # Store fonts in public directory
   mkdir -p public/fonts
   ```
2. **Download font**

- Put the font link from [Google Fonts](https://fonts.google.com/) in your browser

  ```bash
  https://fonts.googleapis.com/css2?family=Outfit:wght@100..900

  ```

- Choose the Latin URL from the webpage and place that in your browser to download the font. Rename it after downloading.
  ```bash
  src: url(https://fonts.gstatic.com/s/outfit/v11/abcdefghijklmnopqrstuvwxyz.woff2) format('woff2');
  ```

3. **Font Face Definition**

```css
@font-face {
  font-family: "Outfit";
  src: url("/fonts/outfit-variable.woff2") format("woff2");
  font-weight: 100 900; /* Variable font range */
  font-display: swap; /* Prevent invisible text during load */
}
```

4. **Critical Font Preloading**
   Add to your layout's <head>:

```astro
<link
  rel="preload"
  href="/fonts/outfit-variable.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

#### Performance Tips

- Limit font weights: 2-3 weights max (e.g., 400 regular, 700 bold)

- Subset fonts: Use tools like Glyphhanger for language-specific subsets

- Variable fonts: Single file for all weights/styles (like Outfit example above)

#### Example Implementation

```astro
---
// src/layouts/Layout.astro
---
<html>
  <head>
    <!-- Preload critical font -->
    <link rel="preload" href="/fonts/outfit-variable.woff2" as="font" crossorigin>
  </head>
  <body>
    <slot />
  </body>
</html>
```

## ⚡ Performance Optimizations

### Critical CSS

```astro
<style is:global>
  /* Critical above-the-fold styles */
</style>
```

### Asset Bundling

```astro
---
import globalCSS from '../styles/global.css?inline';
---
<style is:global>{globalCSS}</style>
```

### Preloading

```astro
<link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin>
```

### Compression

Enable in `astro.config.mjs`:

```javascript
import { defineConfig } from "astro/config";
import compress from "astro-compress";

export default defineConfig({
  integrations: [compress()],
});
```

## 📊 Analytics & Tracking

### Google Analytics Setup

1. Create Google Tag in [Analytics Dashboard](https://analytics.google.com)
2. Install Partytown for off-main-thread execution:

   ```bash
   bun astro add partytown
   ```

3. Add to layout:

```astro
<script async src="https://cdn.jsdelivr.net/npm/@builder.io/partytown@latest/dist/partytown.js"></script>
<script type="text/partytown">
  // Your Google Analytics script here
</script>
```

## 🛠️ Useful Tools

| Tool                                                                 | Purpose                |
| -------------------------------------------------------------------- | ---------------------- |
| [Squoosh](https://squoosh.app/)                                      | Image compression      |
| [WebPageTest](https://www.webpagetest.org/)                          | Performance testing    |
| [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) | Built-in Chrome audits |
| [Bundlephobia](https://bundlephobia.com/)                            | Package size analysis  |

## 📚 Further Reading

- [Astro Documentation](https://docs.astro.build/)
- [Web Performance 101](https://web.dev/learn/)
- [HTTP/2 and HTTP/3 Benefits](https://www.cloudflare.com/learning/performance/http2-vs-http3/)

## 🎯 Conclusion

This optimized Astro setup provides:

- ⚡ Blazing-fast performance
- 📱 Responsive design
- 🔍 SEO-friendly structure
- 📊 Analytics integration
- 🛠️ Developer-friendly workflow
