# Red Mesa Development

Source for [redmesa.dev](https://redmesa.dev), built with plain HTML, CSS, and JavaScript — no frameworks, build tools, or dependencies.

## Project structure

```
.
├── index.html          # Home page
├── solutions.html       # Solutions page
├── websites.html        # Websites page
├── end-to-end.html      # End-to-end page
├── blog.html            # Blog index
├── blog/                # Individual blog posts
├── css/style.css        # Site styles
├── js/                  # Site scripts (icons, main, package builder, signatures)
├── assets/               # Images, favicons, and manifest icons
├── CNAME                 # Custom domain for GitHub Pages
├── robots.txt
└── sitemap.xml
```

## Development

There's nothing to install or build. Open any `.html` file directly in a browser, or serve the directory locally so relative paths resolve the same way they will in production:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment

The site is static and deploys as-is to GitHub Pages from this repository.
