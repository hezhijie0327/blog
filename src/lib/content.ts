import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { serialize } from 'next-mdx-remote/serialize'

const contentDirectory = path.join(process.cwd(), 'content')

export interface ContentItem {
  slug: string
  title: string
  date?: string
  description?: string
  tags?: string[]
  content: string
  readingTime: string
  frontmatter: any
}

export interface ProjectItem extends ContentItem {
  type: 'personal' | 'starred'
  link?: string
  image?: string
}

export interface BlogItem extends ContentItem {
  category?: string
}

// 读取所有内容文件
export function getAllContentSlugs(type: string): string[] {
  const fullPath = path.join(contentDirectory, type)
  if (!fs.existsSync(fullPath)) {
    return []
  }
  const slugs = fs.readdirSync(fullPath)
  return slugs
    .filter((slug) => slug.endsWith('.md'))
    .map((slug) => slug.replace(/\.md$/, ''))
}

// 读取单个 MD 文件
export function getContentBySlug(slug: string, type: string): ContentItem {
  // 解码 URL 编码的 slug
  const decodedSlug = decodeURIComponent(slug)
  const fullPath = path.join(contentDirectory, type, `${decodedSlug}.md`)

  // 如果直接文件不存在，尝试查找匹配的文件
  if (!fs.existsSync(fullPath)) {
    const dirPath = path.join(contentDirectory, type)
    const files = fs.readdirSync(dirPath)
    const matchingFile = files.find(file =>
      file.replace(/\.md$/, '') === decodedSlug
    )

    if (!matchingFile) {
      throw new Error(`File not found for slug: ${slug}`)
    }

    const actualPath = path.join(dirPath, matchingFile)
    const fileContents = fs.readFileSync(actualPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      readingTime: readingTime(content).text,
      frontmatter: data,
      title: data.title || decodedSlug,
      date: data.date,
      description: data.description,
      tags: data.tags || [],
    }
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    content,
    readingTime: readingTime(content).text,
    frontmatter: data,
    title: data.title || decodedSlug,
    date: data.date,
    description: data.description,
    tags: data.tags || [],
  }
}

// 读取单个 MD 文件并序列化 MDX 内容（用于动态路由）
export async function getMDXContentBySlug(slug: string, type: string) {
  // 解码 URL 编码的 slug，可能需要双重解码
  let decodedSlug = decodeURIComponent(slug)

  // 如果第一次解码后还有编码字符，尝试第二次解码
  if (decodedSlug.includes('%')) {
    decodedSlug = decodeURIComponent(decodedSlug)
  }

  const fullPath = path.join(contentDirectory, type, `${decodedSlug}.md`)

  // 如果直接文件不存在，尝试查找匹配的文件
  let actualPath = fullPath
  if (!fs.existsSync(fullPath)) {
    const dirPath = path.join(contentDirectory, type)
    const files = fs.readdirSync(dirPath)

    const matchingFile = files.find(file =>
      file.replace(/\.md$/, '') === decodedSlug
    )

    if (!matchingFile) {
      return null
    }

    actualPath = path.join(dirPath, matchingFile)
  }

  const fileContents = fs.readFileSync(actualPath, 'utf8')
  const { data, content } = matter(fileContents)

  const mdxContent = await serialize(content)

  return {
    slug,
    content: mdxContent,
    data,
    readingTime: readingTime(content).text,
  }
}

// 获取所有内容列表
export function getAllContent(type: string, limit?: number): ContentItem[] {
  const slugs = getAllContentSlugs(type)
  const posts = slugs
    .map((slug) => getContentBySlug(slug, type))
    .sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return 0
    })

  if (limit) {
    return posts.slice(0, limit)
  }

  return posts
}

// 获取项目列表
export function getAllProjects(): ProjectItem[] {
  const projects = getAllContent('projects').map(project => ({
    ...project,
    type: project.frontmatter.type || 'personal' as const,
    link: project.frontmatter.link,
    image: project.frontmatter.image
  }))

  return projects
}

// 获取所有博客
export function getAllBlogs(): BlogItem[] {
  return getAllContent('blogs').map(blog => ({
    ...blog,
    category: blog.frontmatter.category
  }))
}