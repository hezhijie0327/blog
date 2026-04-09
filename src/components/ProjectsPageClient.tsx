import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import {
  Code,
  Star,
  ArrowRight,
  GitBranch,
  ExternalLink,
  Plus,
} from "lucide-react";

interface Project {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  type: "personal" | "starred";
  tags?: string[];
  image?: string;
  link?: string;
}

interface ProjectsPageClientProps {
  projects: Project[];
}

export default function ProjectsPageClient({
  projects,
}: ProjectsPageClientProps) {
  const personalProjects = projects.filter((p) => p.type === "personal");
  const starredProjects = projects.filter((p) => p.type === "starred");

  return (
    <div className="min-h-full">
      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <div className="flex items-center justify-center mb-6">
            <Code className="mr-3 h-8 w-8 text-sky-500" />
            <h1 className="bg-gradient-to-r from-sky-500 to-violet-500 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
              开源项目
            </h1>
          </div>
          <p className="text-xl leading-relaxed text-foreground/80">
            展示个人开发的项目作品和精选的优质开源项目
          </p>
        </div>

        {/* Personal Projects */}
        {personalProjects.length > 0 && (
          <section className="mb-20">
            <div className="mb-8 flex items-center">
              <div className="mr-4 h-8 w-1 rounded-full bg-sky-500" />
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                项目
              </h2>
              <Badge variant="outline" className="ml-4 text-sm">
                {personalProjects.length} 个项目
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalProjects.map((project) => (
                <div key={project.slug}>
                  <Card className="group flex h-full flex-col border-border/70 bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                    {project.image && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg sm:text-xl">
                        <Link
                          href={`/projects/${project.slug}/`}
                          className="text-foreground transition-colors hover:text-sky-500 group-hover:underline"
                        >
                          {project.title}
                        </Link>
                      </CardTitle>
                      {project.description && (
                        <p className="line-clamp-2 text-sm leading-relaxed text-foreground/75">
                          {project.description}
                        </p>
                      )}
                    </CardHeader>

                    <CardContent className="pt-0 flex-1 flex flex-col">
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
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
                        </div>
                      </div>

                      {project.date && (
                        <p className="mt-4 border-t border-border/80 pt-3 text-xs text-muted-foreground">
                          更新于 {formatDate(project.date)}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Starred Projects */}
        {starredProjects.length > 0 && (
          <section className="mb-20">
            <div className="mb-8 flex items-center">
              <div className="mr-4 h-8 w-1 rounded-full bg-amber-500" />
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                精选项目
              </h2>
              <Badge variant="outline" className="ml-4 text-sm">
                <Star className="w-3 h-3 mr-1 text-yellow-500" />
                {starredProjects.length} 个精选
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {starredProjects.map((project) => (
                <div key={project.slug}>
                  <Card className="group flex h-full flex-col border-border/70 bg-gradient-to-br from-amber-500/10 via-card/80 to-orange-500/10 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                    {project.image && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg sm:text-xl">
                          <Link
                            href={`/projects/${project.slug}/`}
                            className="text-foreground transition-colors hover:text-amber-500 group-hover:underline"
                          >
                            {project.title}
                          </Link>
                        </CardTitle>
                        <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
                      </div>
                      {project.description && (
                        <p className="line-clamp-2 text-sm leading-relaxed text-foreground/75">
                          {project.description}
                        </p>
                      )}
                    </CardHeader>

                    <CardContent className="pt-0 flex-1 flex flex-col">
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs border-amber-300/50 text-foreground/80"
                            >
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
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="py-16 text-center">
            <Card className="mx-auto max-w-md border-border/70 bg-card/80">
              <CardContent className="pt-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/60">
                  <Code className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  暂无项目
                </h3>
                <p className="text-muted-foreground">
                  项目内容正在整理中，敬请期待！
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Submit New Project */}
        {projects.length > 0 && (
          <section className="mx-auto max-w-2xl">
            <Card className="border-border/70 bg-gradient-to-r from-sky-500/10 to-violet-500/10">
              <CardContent className="pt-8 text-center">
                <Plus className="mx-auto mb-4 h-12 w-12 text-sky-500" />
                <h3 className="mb-4 text-2xl font-semibold text-foreground">
                  更多项目正在开发中
                </h3>
                <p className="mb-6 text-foreground/75">
                  持续学习和实践，探索更多技术可能性。
                </p>
                <Button variant="default" asChild className="group">
                  <Link
                    href="https://github.com/hezhijie0327"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitBranch className="w-4 h-4 mr-2" />
                    查看 GitHub
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </div>
  );
}
