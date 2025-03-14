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

## html
Located in the `src/layouts/Layout.astro` file. This code displays what you see on the website. It contains different sections.

### Header
This contains information on the website but is not displayed

#### Google Analytics
This is a service Google provides to monitor website usage. It has a [Dashboard](https://analytics.google.com)
- Organization (company)
  - Analytics account (client company)
    - Analytics property (client website)

Steps:
1. Create a Google tag in Google Analytics. It is html.
2. Add in the header of each page of the website.

#### Partytown
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

### Body
This contains the parts of the website that are displayed.
 
## CSS
Code that defines how the website looks on the browser. The code here is referenced in the html. 

## Optimizations
### Images
1. convert image to webp
  - This command converts, at a quality of 50 (0 is the worst; 100 is the best)
```
cwebp -q 50 images/flower1.jpg -o images/flower1.webp
```
2. Use the <picture> tag for webp images. this maintains support for old browsers
```
<picture>
  <source type="image/webp" srcset="images/flower1.webp">
  <source type="image/jpeg" srcset="images/flower1.jpg">
  <img src="images/flower1.jpg">
</picture>
```
