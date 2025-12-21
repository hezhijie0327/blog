import { Metadata } from 'next'
import { getAllContent, getAllContentSlugs, getAllProjects, type ProjectItem } from '@/lib/content'
import { getContentBySlug } from '@/lib/content'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import GitHubComments from '@/components/GitHubComments'
import { formatDate } from '@/lib/utils'
import { ExternalLink, Github, Calendar, Clock } from 'lucide-react'

interface ProjectParams {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllContentSlugs('projects')
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: ProjectParams): Promise<Metadata> {
  const { slug } = await params
  const project = await getContentBySlug(slug, 'projects')

  if (!project) {
    return {
      title: '项目未找到 - 治杰 Online',
    }
  }

  return {
    title: `${project.title} - 治杰 Online`,
    description: project.description || '个人项目展示',
    keywords: project.tags,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      publishedTime: project.date,
      images: (project as any).frontmatter?.image ? [{ url: (project as any).frontmatter.image }] : [],
      tags: project.tags,
    },
  }
}

export default async function Project({ params }: ProjectParams) {
  const { slug } = await params
  const project = await getContentBySlug(slug, 'projects')

  if (!project) {
    notFound()
  }

  // 获取包含 githubRepo 信息的完整项目数据
  const projects = getAllProjects()
  const projectData = projects.find(p => p.slug === slug)
  const githubRepo = projectData?.githubRepo

  const markdownContent = project.content
  const frontmatter = project.frontmatter

  return (
    <div className="h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
            <CardHeader className="pb-6">
              <div className="flex flex-col lg:flex-row items-start gap-8">
                {frontmatter.image && (
                  <div className="flex-shrink-0 w-full lg:w-64">
                    <img
                      src={frontmatter.image}
                      alt={project.title}
                      className="w-full h-48 lg:h-64 object-cover rounded-xl shadow-lg"
                    />
                  </div>
                )}
                <div className="flex-1 space-y-4">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                    {project.title}
                  </h1>
                  <p className="text-lg text-slate-700 dark:text-foreground/80 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={project.date || ''} className="font-medium">
                        {project.date ? formatDate(project.date) : '未知日期'}
                      </time>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{project.readingTime}</span>
                    </div>
                  </div>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="prose prose-lg dark:prose-invert max-w-none">
              <div className="prose-headings:font-semibold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 hover:prose-a:text-blue-800 dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm">
                {markdownContent ? (
                  <ReactMarkdown
                    components={{
                      h1: ({ children, ...props }) => (
                        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white" {...props}>
                          {children}
                        </h1>
                      ),
                      h2: ({ children, ...props }) => (
                        <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200 mt-6" {...props}>
                          {children}
                        </h2>
                      ),
                      h3: ({ children, ...props }) => (
                        <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300 mt-4" {...props}>
                          {children}
                        </h3>
                      ),
                      p: ({ children, ...props }) => (
                        <p className="mb-4 text-slate-700 dark:text-foreground/80 leading-relaxed" {...props}>
                          {children}
                        </p>
                      ),
                      ul: ({ children, ...props }) => (
                        <ul className="list-disc pl-6 mb-4 text-slate-700 dark:text-foreground/80" {...props}>
                          {children}
                        </ul>
                      ),
                      ol: ({ children, ...props }) => (
                        <ol className="list-decimal pl-6 mb-4 text-slate-700 dark:text-foreground/80" {...props}>
                          {children}
                        </ol>
                      ),
                      li: ({ children, ...props }) => (
                        <li className="mb-2" {...props}>
                          {children}
                        </li>
                      ),
                      code: ({ children, ...props }) => (
                        <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm font-mono" {...props}>
                          {children}
                        </code>
                      ),
                      pre: ({ children, ...props }) => (
                        <div className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
                          <pre {...props}>{children}</pre>
                        </div>
                      ),
                      blockquote: ({ children, ...props }) => (
                        <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-900/20 italic text-slate-700 dark:text-foreground/80" {...props}>
                          {children}
                        </blockquote>
                      ),
                    }}
                  >
                    {markdownContent}
                  </ReactMarkdown>
                ) : (
                  <div className="text-red-500 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p>Error: Content is empty or undefined</p>
                  </div>
                )}
              </div>

              {frontmatter.link && (
                <div className="mt-8 pt-8 border-t">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild variant="default" className="flex items-center gap-2">
                      <a
                        href={frontmatter.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        访问项目
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="flex items-center gap-2">
                      <a
                        href="https://github.com/hezhijie0327"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4" />
                        源代码
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* GitHub Comments */}
          <GitHubComments
            repo={githubRepo}
            title={`关于项目 "${project.title}" 的讨论`}
          />
        </div>
      </div>
    </div>
  )
}