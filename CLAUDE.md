# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A minimal personal homepage and blog built with Eleventy (11ty). The site uses Markdown for content, Nunjucks for layouts, and hand-written CSS. It is designed around a newspaper/editorial aesthetic with a focus on Chinese typography.

## Tech Stack

- **Static Site Generator**: [Eleventy (11ty)](https://www.11ty.dev/) v2.x
- **Templates**: Nunjucks (`.njk`)
- **Content**: Markdown (`.md`)
- **Styling**: Hand-written CSS in a single file (`src/styles.css`)
- **Code Highlighting**: Prism.js with Solarized Light (light theme) and Tomorrow (dark theme)
- **Fonts**: Custom subset fonts generated from source files via `scripts/build-fonts.js`
- **Deployment**: Cloudflare Pages

## Common Commands

```bash
# Install dependencies
npm install

# Start dev server with hot reload
npm run dev

# Build for production (cleans _site, builds fonts, runs eleventy)
npm run build

# Rebuild subset fonts from fonts-source/
npm run build:fonts

# Clean _site output
npm run clean
```

## Project Structure

```
.eleventy.js          # Eleventy configuration, filters, passthrough copies
src/
  _includes/
    base.njk          # Base layout: <html>, <head>, header/footer, scripts
    post.njk          # Article layout: title, meta, prose content, sidebar outline
    page.njk          # Generic page layout (e.g. about)
    outline.njk       # Reusable outline macro
  _data/site.json     # Site metadata used in templates
  blog/               # Markdown blog posts
  blog.njk            # Blog listing page
  index.njk           # Homepage
  about.md            # About page
  styles.css          # Single stylesheet for the entire site
  scripts/overlay-scrollbar.js  # Custom overlay scrollbar for body
  fonts/              # Generated subset fonts (do not edit, see fonts-source/)
fonts-source/         # Original font source files (tracked in git)
scripts/build-fonts.js # Font subsetting script
_site/                # Build output
```

## Architecture Notes

### Template Inheritance

Content flows through templates:

```
Markdown / Nunjucks page
    ↓
  post.njk / page.njk / index.njk / blog.njk
    ↓
  base.njk
```

- `base.njk` renders the HTML shell, site header, footer, theme toggle, Prism scripts, and custom scrollbar script.
- `post.njk` renders the article header, `.prose` content, and conditionally renders a sticky outline sidebar if `outline: true` is set in the post front matter.
- `page.njk` wraps content in `.page-content.container.prose`.

### Content Pipeline

- Eleventy reads files from `src/` and outputs to `_site/`.
- Markdown is processed with `markdown-it` plus `markdown-it-anchor`, which auto-generates `id` attributes for `h2/h3/h4` headings.
- The custom `outline` filter scans rendered HTML for headings and emits a nested `<ul>` for the sidebar.
- Static assets are copied via `addPassthroughCopy` in `.eleventy.js`.

### Styling

- All styles live in `src/styles.css`.
- CSS variables are defined on `:root` and overridden for dark mode via `:root[data-theme="dark"]`.
- The `.prose` class contains the bulk of typography styles for Markdown content.
- Dark mode is toggled by a button in `base.njk` which sets `data-theme` on `<html>` and swaps the active Prism stylesheet.

### Code Highlighting

- Prism.js is loaded from `node_modules/prismjs` and copied to `_site/` during build.
- Light theme uses `prism-solarizedlight.css`; dark theme uses `prism-tomorrow.css`.
- Code blocks are wrapped at runtime with a `.code-block` div, toolbar, copy button, and fullscreen button via the inline script in `base.njk`.

### Custom Overlay Scrollbar

- `src/scripts/overlay-scrollbar.js` hides the native body scrollbar and renders a thin overlay scrollbar on the right edge of the viewport.
- It supports dragging the thumb to scroll and clicking the track to jump.

### Font Subsetting

- `scripts/build-fonts.js` reads font source files from `fonts-source/`, collects all unique characters used under `src/`, and produces subset fonts into `src/fonts/`.
- `.ttf` files are subset with `fontmin` and compressed to `.woff2` with `wawoff2`.
- `.woff2` source files are copied as-is.
- The build command `npm run build` runs `build:fonts` before Eleventy.
- `src/fonts/` is generated and should not be manually edited.

## Important Files to Know

- `.eleventy.js` — Configuration, passthrough copies, custom filters (`readableDate`, `shortDate`, `excerpt`, `outline`).
- `src/_data/site.json` — Site title, author, navigation links, language.
- `src/_includes/base.njk` — Root layout containing theme toggle, Prism, and overlay scrollbar setup.
- `src/_includes/post.njk` — Article layout and outline sidebar rendering.
- `src/styles.css` — All visual styles.
- `scripts/build-fonts.js` — Font subsetting automation.

## Development Notes

- Adding a new blog post: create a new `.md` file in `src/blog/` with front matter including `title`, `date`, `description`, `tags`, and optionally `outline: true`.
- Changing styles: edit `src/styles.css` only. There is no CSS preprocessor.
- Changing layout: edit the Nunjucks files in `src/_includes/`.
- Adding a new page: create a Markdown or Nunjucks file in `src/` and use the `page.njk` layout if needed.
- Cloudflare Pages build command: `npm run build`. Output directory: `_site`.
- Original font files live in `fonts-source/` and are tracked in git so Cloudflare Pages can generate subsets during build.
