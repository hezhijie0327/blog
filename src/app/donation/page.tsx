import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Heart, GitBranch } from "lucide-react";

export default function DonationPage() {
  return (
    <div className="min-h-full">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center mb-6">
            <Heart className="mr-3 h-8 w-8 text-rose-500" />
            <h1 className="bg-gradient-to-r from-rose-500 to-fuchsia-500 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
              支持治杰 Online
            </h1>
          </div>
          <p className="text-xl text-foreground/80">
            觉得有用？欢迎支持继续创作和维护
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
          {/* WeChat Pay */}
          <div>
            <Card className="h-full border-border/70 bg-card/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-600">
                  微信支付
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="w-44 h-44 mx-auto bg-slate-100 dark:bg-slate-700 rounded-lg p-3 flex items-center justify-center">
                  <Image
                    src="/wechat.png"
                    alt="微信支付二维码"
                    width={160}
                    height={160}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <p className="mt-4 text-sm text-foreground/80">
                  扫描二维码进行微信支付
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Alipay */}
          <div>
            <Card className="h-full border-border/70 bg-card/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-blue-600">支付宝</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="w-44 h-44 mx-auto bg-slate-100 dark:bg-slate-700 rounded-lg p-3 flex items-center justify-center">
                  <Image
                    src="/alipay.png"
                    alt="支付宝二维码"
                    width={160}
                    height={160}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <p className="mt-4 text-sm text-foreground/80">
                  扫描二维码进行支付宝支付
                </p>
              </CardContent>
            </Card>
          </div>

          {/* GitHub Sponsors */}
          <div>
            <Card className="h-full border-border/70 bg-card/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <GitBranch className="w-8 h-8 text-gray-800" />
                </div>
                <CardTitle className="text-2xl text-gray-800 dark:text-foreground">
                  GitHub Sponsors
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="w-44 h-44 mx-auto bg-slate-100 dark:bg-slate-700 rounded-lg p-3 flex items-center justify-center">
                  <Link
                    href="https://github.com/sponsors/hezhijie0327"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full w-full flex-col items-center justify-center rounded-lg bg-gray-800 transition-all duration-300 hover:bg-gray-700 hover:shadow-md dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    <GitBranch className="w-12 h-12 text-white mb-2" />
                    <span className="text-white text-sm font-medium">
                      GitHub
                    </span>
                    <span className="text-white text-xs">Sponsors</span>
                  </Link>
                </div>
                <p className="mt-4 text-sm text-foreground/80">
                  如果您是开发者，可以通过 GitHub Sponsors 支持我
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <p className="text-slate-600 dark:text-foreground/70">
            每一份支持都是前进的动力 💙
          </p>
        </div>
      </div>
    </div>
  );
}
