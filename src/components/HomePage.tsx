import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { ArrowRight, Code, PenTool, Heart } from "lucide-react";

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

interface Blog {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  category?: string;
  tags?: string[];
}

interface HomePageProps {
  projects: Project[];
  blogs: Blog[];
}

export default function HomePage({ projects, blogs }: HomePageProps) {
  const personalProjects = projects.filter((p) => p.type === "personal");
  const latestProject = personalProjects[0];
  const latestBlog = blogs[0];

  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/8 px-4 py-1 text-xs font-medium tracking-[0.16em] text-primary">
            TECHNOLOGY · ENGINEERING · NOTES
          </p>
          <h1 className="mb-6 bg-gradient-to-r from-sky-500 via-blue-500 to-violet-500 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-6xl">
            治杰 Online
          </h1>
          <div className="mb-8 space-y-2 text-xl text-foreground/80 sm:text-2xl">
            <p className="italic">&quot;Stay Hungry, Stay Foolish&quot;</p>
            <p className="italic">求知若渴，虚心若愚</p>
          </div>
        </div>
      </section>

      {/* Content Cards */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Personal Projects */}
          <div>
            <Card className="group border-border/70 bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-6 w-6 text-sky-500" />
                  <Link
                    href="/projects"
                    className="text-xl text-sky-500 transition-colors hover:text-sky-400 group-hover:underline"
                  >
                    个人项目
                  </Link>
                </CardTitle>
                <CardDescription className="text-base text-foreground/80">
                  {latestProject ? (
                    <>
                      最新项目：{" "}
                      <Link
                        href={`/projects/${latestProject.slug}/`}
                        className="font-medium text-sky-500 transition-colors hover:text-sky-400"
                      >
                        {latestProject.title}
                      </Link>
                    </>
                  ) : (
                    "暂无项目"
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-base text-foreground/75">
                      项目总数：
                      <span className="font-semibold">
                        {personalProjects.length}
                      </span>{" "}
                      个
                    </p>
                    {latestProject?.date && (
                      <p className="text-base text-foreground/75">
                        最后更新：{latestProject.date}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-sky-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Personal Blog */}
          <div>
            <Card className="group border-border/70 bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PenTool className="h-6 w-6 text-emerald-500" />
                  <Link
                    href="/blogs"
                    className="text-xl text-emerald-500 transition-colors hover:text-emerald-400 group-hover:underline"
                  >
                    技术博客
                  </Link>
                </CardTitle>
                <CardDescription className="text-base text-foreground/80">
                  {latestBlog ? (
                    <>
                      最新文章：{" "}
                      <Link
                        href={`/blogs/${latestBlog.slug}/`}
                        className="font-medium text-emerald-500 transition-colors hover:text-emerald-400"
                      >
                        {latestBlog.title}
                      </Link>
                    </>
                  ) : (
                    "暂无文章"
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-base text-foreground/75">
                      文章总数：
                      <span className="font-semibold">{blogs.length}</span> 篇
                    </p>
                    {latestBlog?.date && (
                      <p className="text-base text-foreground/75">
                        最后发布：{latestBlog.date}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-emerald-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Site Notice */}
        <div>
          <Card className="border-border/70 bg-gradient-to-r from-sky-500/8 via-violet-500/8 to-cyan-500/8 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sky-500">
                <Heart className="h-5 w-5" />
                网站声明
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-base text-foreground/80">
                <p>• 本网站所有内容均为原创，转载请注明出处。</p>
                <p>• 如有任何问题或建议，欢迎通过邮件或 GitHub 联系我。</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
