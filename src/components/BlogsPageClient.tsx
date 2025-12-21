'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'
import { PenTool, Calendar, Clock, ArrowRight } from 'lucide-react'

interface Blog {
  slug: string
  title: string
  description?: string
  date?: string
  category?: string
  tags?: string[]
  readingTime?: string
}

interface BlogsPageClientProps {
  blogs: Blog[]
}

export default function BlogsPageClient({ blogs }: BlogsPageClientProps) {
  return (
    <div className="h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 overflow-y-auto">
      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <PenTool className="w-8 h-8 text-green-600 mr-3" />
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              技术博客
            </h1>
          </div>
          <p className="text-xl text-slate-700 dark:text-foreground/80 leading-relaxed">
            分享技术学习心得、项目经验和实用教程
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="max-w-4xl mx-auto space-y-6">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <motion.div
                key={blog.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 border-0">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <h2 className="text-xl sm:text-2xl font-bold">
                        <Link
                          href={`/blogs/${blog.slug}/`}
                          className="text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors group-hover:underline"
                        >
                          {blog.title}
                        </Link>
                      </h2>
                      {blog.category && (
                        <Badge variant="secondary" className="w-fit">
                          {blog.category}
                        </Badge>
                      )}
                    </div>
                    {blog.description && (
                      <p className="text-slate-700 dark:text-foreground/70 leading-relaxed mt-2">
                        {blog.description}
                      </p>
                    )}
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        {blog.date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <time dateTime={blog.date}>
                              {formatDate(blog.date)}
                            </time>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{blog.readingTime}</span>
                        </div>
                      </div>

                      <Button variant="ghost" asChild className="group">
                        <Link href={`/blogs/${blog.slug}/`} className="flex items-center gap-2">
                          阅读全文
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        {blog.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <Card className="max-w-md mx-auto border-0">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PenTool className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    暂无博客文章
                  </h3>
                  <p className="text-muted-foreground">
                    博客内容正在整理中，敬请期待！
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}