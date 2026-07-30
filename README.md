# Personal Site

A minimal personal homepage and blog inspired by newspaper editorial design.

## Tech Stack

- [Eleventy (11ty)](https://www.11ty.dev/) — static site generator
- Markdown — content format
- Hand-written CSS — no UI frameworks
- GitHub + Cloudflare Pages — source control and hosting

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Writing

Add a new Markdown file to `src/posts/` with front matter:

```markdown
---
title: 文章标题
date: 2026-07-20
description: 文章摘要
tags:
  - 前端
  - 性能
---

正文从这里开始。
```

Then commit and push to GitHub. Cloudflare Pages will build and deploy automatically.

## Deployment

This site is configured for Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `_site`
