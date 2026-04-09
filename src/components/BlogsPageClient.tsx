import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { PenTool, Calendar, Clock, ArrowRight } from "lucide-react";

interface Blog {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  category?: string;
  tags?: string[];
  readingTime?: string;
}

interface BlogsPageClientProps {
  blogs: Blog[];
}

export default function BlogsPageClient({ blogs }: BlogsPageClientProps) {
  return (
    <div className="min-h-full">
      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <div className="flex items-center justify-center mb-6">
            <PenTool className="mr-3 h-8 w-8 text-emerald-500" />
            <h1 className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
              技术博客
            </h1>
          </div>
          <p className="text-xl leading-relaxed text-foreground/80">
            分享技术学习心得、项目经验和实用教程
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="max-w-4xl mx-auto space-y-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog.slug}>
                <Card className="group border-border/70 bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <h2 className="text-xl sm:text-2xl font-bold">
                        <Link
                          href={`/blogs/${blog.slug}/`}
                          className="text-foreground transition-colors hover:text-emerald-500 group-hover:underline"
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
                        <Link
                          href={`/blogs/${blog.slug}/`}
                          className="flex items-center gap-2"
                        >
                          阅读全文
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2 border-t border-border/80 pt-4">
                        {blog.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            <div className="py-16 text-center">
              <Card className="mx-auto max-w-md border-border/70 bg-card/80">
                <CardContent className="pt-8">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/60">
                    <PenTool className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    暂无博客文章
                  </h3>
                  <p className="text-muted-foreground">
                    博客内容正在整理中，敬请期待！
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
