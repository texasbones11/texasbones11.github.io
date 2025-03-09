# Anatomy of a CDN website
## html
Code that displays what you see on the website. It contains different sections.

### Header
This contains information on the website but is not displayed

#### Google Analytics
This is a service Google provides to monitor website usage. It has a [Dashboard](https://analytics.google.com)
- Organization (company)
  - Analytics account (client company)
    - Analytics property (client website)

#### Partytown
This moves 3rd party scripts like google analytics off of the main thread in browsers for better performance.
1. 
```
<script src="https://cdn.jsdelivr.net/npm/@builder.io/partytown@latest/dist/partytown.js"></script>
```
2. Update the script in the html to refence partytown for the 3rd party apps only.
```
- <script>...</script>
+ <script type="text/partytown">...</script>
```
3. 
Steps:
1. Create a Google tag in Google Analytics. It is html.
2. Add in the header of each page of the website.

### Body
This contains the parts of the website that are displayed.
 
## CSS
Code that defines how the website looks on the browser. The code here is referenced in the html. 
