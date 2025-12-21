'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ArrowRight, Code, PenTool, Heart } from 'lucide-react'

interface Project {
  slug: string
  title: string
  description?: string
  date?: string
  type: 'personal' | 'starred'
  tags?: string[]
  image?: string
  link?: string
}

interface Blog {
  slug: string
  title: string
  description?: string
  date?: string
  category?: string
  tags?: string[]
}

interface HomePageProps {
  projects: Project[]
  blogs: Blog[]
}

export default function HomePage({ projects, blogs }: HomePageProps) {
  const personalProjects = projects.filter(p => p.type === 'personal')
  const starredProjects = projects.filter(p => p.type === 'starred')

  return (
    <div className="h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 overflow-y-auto">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-600 dark:to-purple-600 bg-clip-text text-transparent mb-6">
            治杰 Online
          </h1>
          <div className="text-xl sm:text-2xl text-slate-700 dark:text-foreground/80 mb-8 space-y-2">
          <p className="italic">"Stay Hungry, Stay Foolish"</p>
          <p className="italic">求知若渴，虚心若愚</p>
        </div>
        </motion.div>
      </section>

      {/* Content Cards */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Personal Projects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-6 h-6 text-blue-600" />
                  <Link
                    href="/projects"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors group-hover:underline text-xl"
                  >
                    个人项目
                  </Link>
                </CardTitle>
                <CardDescription className="text-base text-slate-700 dark:text-foreground/80">
                  {personalProjects.length > 0 ? (
                    <>
                      最新项目：{' '}
                      <Link
                        href={`/projects/${personalProjects[0]?.slug}/`}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                      >
                        {personalProjects[0]?.title}
                      </Link>
                    </>
                  ) : (
                    '暂无项目'
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-base text-slate-700 dark:text-foreground/70">
                      项目总数：<span className="font-semibold">{personalProjects.length}</span> 个
                    </p>
                    {personalProjects[0]?.date && (
                      <p className="text-base text-slate-700 dark:text-foreground/70">
                        最后更新：{personalProjects[0]?.date}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Personal Blog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PenTool className="w-6 h-6 text-green-600" />
                  <Link
                    href="/blogs"
                    className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors group-hover:underline text-xl"
                  >
                    技术博客
                  </Link>
                </CardTitle>
                <CardDescription className="text-base text-slate-700 dark:text-foreground/80">
                  {blogs.length > 0 ? (
                    <>
                      最新文章：{' '}
                      <Link
                        href={`/blogs/${blogs[0]?.slug}/`}
                        className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium transition-colors"
                      >
                        {blogs[0]?.title}
                      </Link>
                    </>
                  ) : (
                    '暂无文章'
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-base text-slate-700 dark:text-foreground/70">
                      文章总数：<span className="font-semibold">{blogs.length}</span> 篇
                    </p>
                    {blogs[0]?.date && (
                      <p className="text-base text-slate-700 dark:text-foreground/70">
                        最后发布：{blogs[0]?.date}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-green-600 transition-colors" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Site Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800/50 dark:to-slate-900/50 border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                <Heart className="w-5 h-5" />
                网站声明
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-slate-700 dark:text-foreground/80 space-y-2 text-base">
                <p>• 本网站所有内容均为原创，转载请注明出处。</p>
                <p>• 如有任何问题或建议，欢迎通过邮件或 GitHub 联系我。</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  )
}