# Anatomy of an optimized website

## Start project

### Build astro project with bun

Start with a basic install with dependencies.

```
bun create astro@latest <project-name>
```

### run a local web server

```
bun run dev
```

### build

Creates a static version of the site in the `dist` folder

```
bun run build
```

#### Github pages

Move the dist directory over to docs. Also disable jekyll, which will ignore special case directories if not.

```
mv dist docs
touch docs/.nojekyll
```

## Astro Structure

A `.astro` file contains three sections.

1. the top section is the code section where you can write Typescript.
2. The second section, divided by `---` is the HTML section.
3. The third section is the `<style>` section which contains CSS

### Index

The `src/pages/index.astro` file contains references to the layout and components.

### Layout

The `src/layouts/Layout.astro` file contains the header, body and footer sections. This is referenced and wraps the content in the `index.astro` file in the `<body>` section.

#### Header

This contains information on the website but is not displayed.

##### Google Analytics

This is a service Google provides to monitor website usage. It has a [Dashboard](https://analytics.google.com)

- Organization (company)
  - Analytics account (client company)
    - Analytics property (client website)

Steps:

1. Create a Google tag in Google Analytics. It is html.
2. Add in the header of each page of the website.

##### Partytown

This moves 3rd party scripts like google analytics off of the main thread in browsers for better performance.

1. Install partytown module

```
bun astro add partytown
```

2. run in async

```
  <script async src="https://cdn.jsdelivr.net/npm/@builder.io/partytown@latest/dist/partytown.js"></script>
```

3. Update the script in the html to refence partytown for the 3rd party apps only. Put it in the Google Analytics script.

```
- <script>...</script>
+ <script type="text/partytown">...</script>
```

#### Body

This contains the parts of the website that are displayed. In astro, you display a series of components.

##### Components

These files are located in `src./components/*.astro`. They are different sections of the webpage.

## Typescript

This is type checking javascript.

## HTML

This is the text that browsers interpret.

## CSS

Code that defines how the website looks on the browser. The code here is referenced in the html.

## Optimizations

### Images

1. convert image to webp

- This command converts, at a quality of 50 (0 is the worst; 100 is the best)

```
cwebp -q 50 images/flower1.jpg -o images/flower1.webp
```

2. Use the <image> tag for webp images. Images in the /public directory do not get compressed. Try to always put them in assets instead.

```
---
import { Image } from 'astro:assets';
import stars from '~/assets/nightsky.webp';
---
<Image src={stars} alt="A starry night sky." />
```

3. Images on the page that can bee see when it loads should be `eager`. Images not yet seen below should be `lazy`

```
<Image
  src={stars}
  alt="A starry night sky." />
  loading={"eager"}
/>
```
