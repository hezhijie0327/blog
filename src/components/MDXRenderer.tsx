'use client'

import { MDXRemote } from 'next-mdx-remote/rsc'
import MDXComponents from './MDXComponents'

interface MDXRendererProps {
  content: any
}

export default function MDXRenderer({ content }: MDXRendererProps) {
  return <MDXRemote {...content} components={MDXComponents} />
}