# What is hx-weaver.js

**hx-weaver.js** is a lightweight template system based on HTMX. (open `hx-weaver.js` and read the code)

It applyes the same template (header, menu, footer) to basic HTML content pages without the need for a static site builder or server scripting language.

It should be considered as an alternative to static site builders and should work with almost any web-host.

## How to use

1. Clone or download this repo:

   - it contains a basic two page website (index.html and /page/about.html)

2. Start a local web-server if needed or place repo in your existing webserver root:

   - You can use the server.py localy if needed. Start it with `python3 server.py`
   - You'll need python3 installed, but can use anything else like apache, nginx, caddy, etc.

3. Modify the content pages (index.html and /page/about.html):

   - Content pages are designed to be barebones. The focus here is on the content alone.
   - Everything inside the `<body>` tag of content pages will be loaded in our template's `<div id="content"></div>`
   - The only thing needed for these to work is the hx-weaver.js script loaded in the header.

4. Modify the files inside /theme:

   - The actual template being applied by hx-weaver.js exists inside the /theme folder.
   - Modify the template.html, menu.html, style.css, etc. to suite your needs.

5. Modify hx-weaver.js:
   - I you need more javascript interactivity (dark theme support for example) modify hx-weaver.js directly.

## How it works

1. User directly accesses a page (e.g., `/pages/about.html`) or `index.html`
2. The page loads with just its content and hx-weaver.js
3. hx-weaver.js loads HTMX if needed, then fetches and parses template.html (this is why we need a web-server locally as well or we'll run into CORS restrictions)
4. It replaces the current document with the template structure
5. It injects the content into the location `<div id="content"></div>`
6. HTMX processes all attributes, loading header, menu and footer components

This approach gives you the best of both worlds - a consistent template for all pages
while allowing direct access to any page in the site without the need for a scripting language or static site builder.

## Advantages

1. No need for a static site builder
2. All you need to know is HTML and how to put the files on a server (ssh, git, sftp, web-host UI interface)
3. Can use any web-host to host your website (from godaddy to github pages or the free tier on netlify)

## Drawbacks

1. You still need a local web server locally if you want to see how your site looks before pushing to your web-host.
2. Accesing any page on your website without javascript will not show the header, menu, footer or apply any css styles. Just the basic content of your page.
3. All your content pages like `index.html` or `/page/about.html` have to include `hx-weaver.js` in order to apply the same template in case someone arrives on them from an external link.

## FAQ

**I can't see changes made to my content and even though I have saved them**

Most likely your browser cached the requests and is serving that version of the files. Clear your browser cache.

**I can't make it work. I installed it in a sub-folder on my server**

This version doesn't work in a sub-folder, only in the root of the server, due to relative paths for loading the files.

**How can I have pretty links, like `example.com/my-sample-article/` instead of `example.com/my-sample-article.html`?**

Many web servers are configured to serve an index.html file when a user accesses the root of a directory (or any subdirectory) on the server.
This behavior is common for web servers like Apache, Nginx, and others. So you can have a folder structure like so: `/server-root/my-sample-article/index.html`.
You should now be able to access that nicer looking URL.
Alternativly you can also setup rewrites for your web-server (replacing the request `my-sample-article` with `my-sample-article.html`) however these are besides the point of this library.

**How can I make all my pages discoverable for people who navigate without javascript.**

You can always include a link to your menu or an archive page in all your content pages. Similar to the hx-weaver.js file, this link will have to be included in ALL your content files like `/page/about.html`.
