# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server with increased memory allocation (NODE_OPTIONS='--max-old-space-size=4096')
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint code checking

### Content Management
All content is managed through Markdown files in the `content/` directory:
- `content/pages/` - Static page content
- `content/projects/personal/` - Personal projects
- `content/projects/starred/` - Featured projects
- `content/blogs/` - Blog posts

### Deployment
- `./deploy.sh` - Automated deployment script
- `npm run build:export` - Generate static files for GitHub Pages

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 16.1.0 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Content**: Markdown with gray-matter frontmatter parsing
- **MDX**: next-mdx-remote for dynamic content rendering
- **Deployment**: Static export for GitHub Pages

### Core Architecture
This is a static site generator using Next.js App Router with content-driven architecture:

1. **Content Layer**: `src/lib/content.ts` handles all Markdown file operations, frontmatter parsing, and reading time calculations
2. **Routing Structure**: Dynamic routes for blogs (`/blogs/[slug]`) and projects (`/projects/[slug]`)
3. **Component Architecture**: Modular React components with TypeScript interfaces
4. **Static Generation**: Configured for static export (`output: "export"`) with trailing slashes

### Key Files and Patterns

#### Content Management (`src/lib/content.ts`)
- `getAllContentSlugs(type)` - Returns all slugs for a content type
- `getContentBySlug(slug, type)` - Parses frontmatter and content
- `getMDXContentBySlug(slug, type)` - Serializes MDX for dynamic rendering
- `getAllProjects()` and `getAllBlogs()` - Type-specific content getters

#### Frontmatter Schema
**Projects**:
```yaml
title: string
description: string
date: string
link: string (optional)
image: string (optional)
tags: string[]
type: "personal" | "starred"
```

**Blogs**:
```yaml
title: string
description: string
date: string
category: string (optional)
tags: string[]
```

#### Component Structure
- `Navigation` - Site navigation with mobile menu
- `Footer` - Site footer
- `HomePage` - Landing page component
- `MDXRenderer` - Renders MDX content with custom components
- `ProjectsPageClient` / `BlogsPageClient` - Client-side content filtering and display

### Static Export Configuration
The site is configured for static hosting:
- `output: "export"` in next.config.ts
- `trailingSlash: true` for proper routing
- `images.unoptimized: true` for static compatibility
- Base path and asset prefix are empty for root deployment

### Theme System
Dark/light theme support with:
- Client-side theme detection script in layout.tsx
- LocalStorage persistence
- System preference fallback

## Important Development Notes

### Content File Handling
- All slugs support URL encoding for special characters
- Content files use double decoding for Chinese characters in URLs
- Missing files throw descriptive errors for debugging

### Memory Considerations
Development server uses increased heap size (4GB) due to MDX processing requirements.

### Static Generation
All routes must be statically generated at build time. Use `generateStaticParams()` for dynamic routes.