# AGENTS.md - Development Guide for Agentic Coding

This file contains essential information for AI agents working on this Next.js blog project.

## Essential Commands

### Development Commands
```bash
# Start development server with increased memory (4GB)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Export static build (for GitHub Pages)
npm run build:export
```

### Code Quality Commands
```bash
# Run ESLint
npm run lint

# Type checking (via TypeScript compiler)
npx tsc --noEmit

# Security audit
npm audit

# Update dependencies
npm update
```

### Testing Commands
This project does not currently have test configurations. To add testing:
```bash
# Install Jest and React Testing Library
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Run tests (after setup)
npm test
# Run specific test file
npm test -- Navigation.test.tsx
```

## Project Configuration

### TypeScript Configuration
- Target: ES2017
- Strict mode enabled
- Path aliases: `@/*` maps to `./src/*`
- JSX: React JSX Transform

### Next.js Configuration
- Static export: `output: "export"`
- Trailing slash enabled
- Images unoptimized (for static export)
- No base path or asset prefix

### ESLint Configuration
- Uses Next.js core web vitals preset
- TypeScript support enabled
- Extends Next.js recommended rules

## Code Style Guidelines

### File Organization
```
src/
├── app/           # Next.js App Router pages and layouts
├── components/    # React components
│   └── ui/       # shadcn/ui base components
└── lib/          # Utility functions and core logic
```

### Import Order
1. React imports (`import React from 'react'`)
2. Next.js imports (`import Link from 'next/link'`)
3. Third-party libraries (alphabetical)
4. Internal components (`@/components/*`)
5. Utility functions (`@/lib/*`)
6. Type imports (`import type { ... }`)

Example:
```typescript
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { ContentItem } from '@/lib/content'
```

### Component Structure
1. `'use client'` directive (if needed)
2. Imports (see above order)
3. Type definitions/interfaces
4. Component implementation
5. Export statement

Example:
```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

interface NavigationProps {
  items?: Array<{ name: string; href: string }>
}

export default function Navigation({ items = [] }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <nav>
      {/* JSX content */}
    </nav>
  )
}
```

### Naming Conventions
- **Components**: PascalCase (`Navigation.tsx`, `Button.tsx`)
- **Files**: PascalCase for components, camelCase for utilities (`utils.ts`)
- **Variables/Functions**: camelCase (`getProjectBySlug`, `isMenuOpen`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_TIMEOUT`)
- **Interfaces/Types**: PascalCase with descriptive suffix (`ContentItem`, `ProjectData`)

### TypeScript Guidelines
- Always use strict mode
- Prefer interfaces over types for object shapes
- Use `type` for unions, intersections, primitives
- Export types used by other modules
- Use generic types where appropriate

```typescript
// ✅ Good
export interface ContentItem {
  slug: string
  title: string
  date?: string
}

// ✅ Good for unions
export type Theme = 'light' | 'dark' | 'system'

// ✅ Good for functions
export function getDataById<T>(id: string): Promise<T | null>
```

### React Component Patterns
- Use functional components with hooks
- Prefer `React.forwardRef` for components that need ref forwarding
- Use `asChild` prop pattern from Radix UI when needed
- Implement proper TypeScript props interfaces

```typescript
// ✅ Good component pattern
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
```

### Styling Guidelines
- Use Tailwind CSS for all styling
- Leverage `cn()` utility for class merging
- Use CSS variables for theme values
- Implement dark mode support
- Follow responsive design patterns

```typescript
// ✅ Good styling
const className = cn(
  'flex items-center space-x-2',
  'px-4 py-2 rounded-md',
  'bg-primary text-primary-foreground',
  'hover:bg-primary/90 transition-colors',
  isActive && 'bg-accent text-accent-foreground'
)
```

### Error Handling
- Always handle promise rejections with try/catch
- Provide meaningful error messages
- Use type guards for runtime type checking
- Implement error boundaries for components

```typescript
// ✅ Good error handling
export async function getContentBySlug(slug: string): Promise<ContentItem | null> {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug,
      title: data.title || slug,
      content,
      // ... other fields
    }
  } catch (error) {
    console.error(`Failed to load content: ${slug}`, error)
    return null
  }
}
```

### Content Management
- Markdown files in `content/` directory
- Use gray-matter for frontmatter parsing
- Support MDX for enhanced content
- Handle URL encoding for Chinese filenames
- Calculate reading time automatically

Frontmatter structure:
```yaml
title: "页面标题"
description: "页面描述"
date: "2024-12-21"
tags: ["标签1", "标签2"]
# Project specific:
link: "https://github.com/user/repo"
image: "https://example.com/cover.jpg"
type: "personal" | "starred"
# Blog specific:
category: "技术分享"
author: "作者名"
```

### Performance Optimizations
- Use React.memo for expensive components
- Implement proper image optimization
- Leverage Next.js static generation
- Use dynamic imports for large components
- Optimize bundle size with code splitting

### Accessibility
- Use semantic HTML elements
- Implement proper ARIA labels
- Ensure keyboard navigation
- Provide focus management
- Support screen readers

### Git Workflow
- Use conventional commit messages
- Create feature branches for new functionality
- Ensure all pages can be statically generated
- Run lint and type checking before commits

## Important Notes

1. **Static Site Generation**: This project uses `output: "export"` and all pages must be statically generable
2. **Chinese Content**: The site supports Chinese filenames and URL encoding
3. **Memory Usage**: Development server runs with 4GB memory limit
4. **Component Library**: Uses shadcn/ui components based on Radix UI
5. **No Testing Setup**: Tests need to be configured if required

## Common Patterns

### Page Component Structure
```typescript
import { getAllContent, getContentBySlug } from '@/lib/content'
import { MDXRenderer } from '@/components/MDXRenderer'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const items = getAllContent('blogs')
  return items.map((item) => ({ slug: item.slug }))
}

export default function Page({ params }: PageProps) {
  const content = getContentBySlug(params.slug, 'blogs')
  
  return (
    <div className="container mx-auto py-8">
      <h1>{content.title}</h1>
      <MDXRenderer content={content.content} />
    </div>
  )
}
```

### Utility Functions
- Place in `src/lib/utils.ts`
- Export with clear JSDoc comments
- Use proper TypeScript typing
- Handle edge cases gracefully