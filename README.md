# EQ1024 · Frontend Engineer — V2.0

Personal homepage and blog. V2.0 "Field Manual" redesign — technical schematic aesthetics inspired by engineering drawings. Cold gunmetal grey + industrial safety orange, hard edges, zero rounding.

**Live at:** [your-domain.pages.dev](https://your-domain.pages.dev)

## Tech Stack

- **[Eleventy (11ty)](https://www.11ty.dev/)** v2 — static site generator
- **Nunjucks** — templating (`src/_includes/`)
- **Markdown** — content authoring (`src/blog/`)
- **Hand-written CSS** — single file, no preprocessor (`src/styles.css`)
- **Prism.js** — code syntax highlighting (Solarized Light / Tomorrow dark)
- **Custom subset fonts** — Anton + OPPO Sans + Maple Mono, self-hosted
- **Cloudflare Pages** — hosting + CI/CD

## Quick Start

```bash
# Install dependencies
npm install

# Dev server with hot reload
npm run dev

# Production build
npm run build
```

`npm run build` cleans `_site/`, rebuilds subset fonts, then runs Eleventy.

## Project Structure

```
.eleventy.js            # Eleventy config, filters, passthrough copies
src/
  _includes/
    base.njk            # Root layout: HTML shell, nav, footer, scripts
    post.njk            # Article layout with optional outline sidebar
    page.njk            # Generic page layout
  _data/site.json       # Site metadata (title, author, nav, lang)
  blog/
    blog.json           # Default front matter for all posts
    tags.njk            # Tag archive page
    *.md                # Blog posts (33 total)
  blog.njk              # Blog listing with pagination + tag filtering
  index.njk             # Homepage (hero, ledger, profile, record, systems, inventory)
  about.md              # About page
  styles.css            # All styles — CSS variables, prose, layout, dark mode
  scripts/
    hero-wireframe.js   # 4D hypercube wireframe on <canvas>
  fonts/                # Generated subset fonts (do not edit)
fonts-source/           # Original font source files
scripts/build-fonts.js  # Font subsetting automation
_site/                  # Build output (gitignored)
```

## Writing a Blog Post

Create a `.md` file in `src/blog/` with front matter:

```markdown
---
title: 文章标题
date: 2026-07-30
description: 文章摘要
tags:
  - 架构
  - 工程化
outline: true    # optional: enables sticky outline sidebar
---

正文内容。
```

Posts are automatically collected via the `posts` tag. Tags are used for filtering on `/blog/`.

## Deployment

Configured for Cloudflare Pages:

- **Build command:** `npm run build`
- **Output directory:** `_site`

Push to `main` and Cloudflare Pages deploys automatically.

## License

MIT
