'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Heart, ArrowRight, Github } from 'lucide-react'

export default function DonationPage() {
  return (
    <div className="h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 overflow-y-auto">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-red-500 mr-3" />
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              支持治杰 Online
            </h1>
          </div>
          <p className="text-xl text-slate-700 dark:text-foreground/80">
            觉得有用？欢迎支持继续创作和维护
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
          {/* WeChat Pay */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 border-0 h-full">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-600">微信支付</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="w-44 h-44 mx-auto bg-slate-100 dark:bg-slate-700 rounded-lg p-3 flex items-center justify-center">
                  <img
                    src="/wechat.png"
                    alt="微信支付二维码"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <p className="text-slate-700 dark:text-foreground/80 mt-4 text-sm">
                  扫描二维码进行微信支付
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Alipay */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 border-0 h-full">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-blue-600">支付宝</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="w-44 h-44 mx-auto bg-slate-100 dark:bg-slate-700 rounded-lg p-3 flex items-center justify-center">
                  <img
                    src="/alipay.png"
                    alt="支付宝二维码"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <p className="text-slate-700 dark:text-foreground/80 mt-4 text-sm">
                  扫描二维码进行支付宝支付
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* GitHub Sponsors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 border-0 h-full">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Github className="w-8 h-8 text-gray-800" />
                </div>
                <CardTitle className="text-2xl text-gray-800 dark:text-foreground">GitHub Sponsors</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="w-44 h-44 mx-auto bg-slate-100 dark:bg-slate-700 rounded-lg p-3 flex items-center justify-center">
                  <Link
                    href="https://github.com/sponsors/hezhijie0327"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full flex flex-col items-center justify-center bg-gray-800 dark:bg-gray-700 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300 group hover:shadow-md"
                  >
                    <Github className="w-12 h-12 text-white mb-2" />
                    <span className="text-white text-sm font-medium">GitHub</span>
                    <span className="text-white text-xs">Sponsors</span>
                  </Link>
                </div>
                <p className="text-slate-700 dark:text-foreground/80 mt-4 text-sm">
                  如果您是开发者，可以通过 GitHub Sponsors 支持我
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-slate-600 dark:text-foreground/70">
            每一份支持都是前进的动力 💙
          </p>
        </motion.div>
      </div>
    </div>
  )
}