'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'
import { Code, Star, ArrowRight, Github, ExternalLink, Plus } from 'lucide-react'

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

interface ProjectsPageClientProps {
  projects: Project[]
}

export default function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
  const personalProjects = projects.filter(p => p.type === 'personal')
  const starredProjects = projects.filter(p => p.type === 'starred')

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
            <Code className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              开源项目
            </h1>
          </div>
          <p className="text-xl text-slate-700 dark:text-foreground/80 leading-relaxed">
            展示个人开发的项目作品和精选的优质开源项目
          </p>
        </motion.div>

        {/* Personal Projects */}
        {personalProjects.length > 0 && (
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center mb-8"
            >
              <div className="w-1 h-8 bg-blue-600 mr-4 rounded-full" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                项目
              </h2>
              <Badge variant="outline" className="ml-4 text-sm">
                {personalProjects.length} 个项目
              </Badge>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 h-full flex flex-col border-0">
                    {project.image && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg sm:text-xl">
                        <Link
                          href={`/projects/${project.slug}/`}
                          className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors group-hover:underline"
                        >
                          {project.title}
                        </Link>
                      </CardTitle>
                      {project.description && (
                        <p className="text-sm text-slate-700 dark:text-foreground/70 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      )}
                    </CardHeader>

                    <CardContent className="pt-0 flex-1 flex flex-col">
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/projects/${project.slug}/`}>
                              <ExternalLink className="w-4 h-4 mr-1" />
                              详情
                            </Link>
                          </Button>
                          {project.link && (
                            <Button variant="ghost" size="sm" asChild>
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="w-4 h-4 mr-1" />
                                源码
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>

                      {project.date && (
                        <p className="text-xs text-muted-foreground mt-4 pt-3 border-t">
                          更新于 {formatDate(project.date)}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Starred Projects */}
        {starredProjects.length > 0 && (
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center mb-8"
            >
              <div className="w-1 h-8 bg-yellow-500 mr-4 rounded-full" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                精选项目
              </h2>
              <Badge variant="outline" className="ml-4 text-sm">
                <Star className="w-3 h-3 mr-1 text-yellow-500" />
                {starredProjects.length} 个精选
              </Badge>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {starredProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-yellow-50/50 to-orange-50/50 dark:from-yellow-900/10 dark:to-orange-900/10 backdrop-blur-sm border-0 h-full flex flex-col">
                    {project.image && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg sm:text-xl">
                          <Link
                            href={`/projects/${project.slug}/`}
                            className="text-gray-900 dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors group-hover:underline"
                          >
                            {project.title}
                          </Link>
                        </CardTitle>
                        <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
                      </div>
                      {project.description && (
                        <p className="text-sm text-slate-700 dark:text-foreground/70 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      )}
                    </CardHeader>

                    <CardContent className="pt-0 flex-1 flex flex-col">
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs text-slate-700 dark:text-foreground border-yellow-200 dark:border-yellow-800">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/projects/${project.slug}/`}>
                              <ExternalLink className="w-4 h-4 mr-1" />
                              详情
                            </Link>
                          </Button>
                          {project.link && (
                            <Button variant="ghost" size="sm" asChild>
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="w-4 h-4 mr-1" />
                                源码
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <Card className="max-w-md mx-auto border-0">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  暂无项目
                </h3>
                <p className="text-muted-foreground">
                  项目内容正在整理中，敬请期待！
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Submit New Project */}
        {projects.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0">
              <CardContent className="pt-8 text-center">
                <Plus className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  更多项目正在开发中
                </h3>
                <p className="text-slate-700 dark:text-foreground/70 mb-6">
                  持续学习和实践，探索更多技术可能性。
                </p>
                <Button variant="default" asChild className="group">
                  <Link
                    href="https://github.com/hezhijie0327"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    查看 GitHub
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.section>
        )}
      </div>
    </div>
  )
}