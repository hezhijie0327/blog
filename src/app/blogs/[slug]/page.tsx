import { Metadata } from 'next'
import { getAllContent, getAllContentSlugs, BlogItem } from '@/lib/content'
import { getContentBySlug } from '@/lib/content'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

// Import MDX components type for better typing
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import GitHubComments from '@/components/GitHubComments'
import { formatDate } from '@/lib/utils'

interface BlogPostParams {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllContentSlugs('blogs')
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  const { slug } = await params
  const post = await getContentBySlug(slug, 'blogs')

  if (!post) {
    return {
      title: '文章未找到 - 治杰 Online',
    }
  }

  return {
    title: `${post.title} - 治杰 Online`,
    description: post.description || '个人技术博客',
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}

export default async function BlogPost({ params }: BlogPostParams) {
  const { slug } = await params
  const post = await getContentBySlug(slug, 'blogs') as BlogItem

  if (!post) {
    notFound()
  }

  const markdownContent = post.content

  return (
    <div className="h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
            <CardHeader className="pb-6">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <time dateTime={post.date || ''} className="font-medium">
                    {post.date ? formatDate(post.date) : '未知日期'}
                  </time>
                  <span>•</span>
                  <span className="font-medium">{post.readingTime}</span>
                  {post.category && (
                    <>
                      <span>•</span>
                      <Badge variant="secondary">{post.category}</Badge>
                    </>
                  )}
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {post.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="prose prose-lg dark:prose-invert max-w-none">
              <div className="prose-headings:font-semibold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 hover:prose-a:text-blue-800 dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300">
                <div className="markdown-content-wrapper">
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
              </div>
            </CardContent>
          </Card>

          {/* GitHub Comments */}
          <GitHubComments
            repo="hezhijie0327/blog"
            issueNumber={parseInt(slug.replace(/\D/g, '')) || 1}
          />
        </div>
      </div>
    </div>
  )
}