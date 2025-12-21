'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import MobileMenuButton from '@/components/MobileMenuButton'
import NavigationLinks from '@/components/NavigationLinks'

interface LayoutProps {
  children: ReactNode
  title?: string
}

export default function Layout({ children, title = '治杰 Online' }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* 移动端菜单按钮 */}
      <MobileMenuButton />

      {/* 移动端遮罩层 */}
      <div
        id="mobile-overlay"
        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 hidden"
        onClick={() => {
          const header = document.getElementById('header');
          const overlay = document.getElementById('mobile-overlay');
          header?.classList.add('-translate-x-full');
          overlay?.classList.add('hidden');
        }}
      />

      {/* 侧边栏 Header */}
      <header id="header" className="fixed left-0 top-0 w-64 h-screen lg:translate-x-0 -translate-x-full transition-transform duration-300 z-50"
           style={{
             backgroundImage: `url("/rectangle.jpg")`,
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundRepeat: 'no-repeat'
           }}>
        <div className="h-full flex flex-col justify-center p-8 text-center">
          {/* 头像 */}
          <Link href="/donation" className="block mb-8">
            <img
              src="/avatar.jpg"
              alt="头像"
              className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg"
            />
          </Link>

          {/* 标题 */}
          <h1 className="text-white text-2xl mb-4 drop-shadow-lg">
            <strong className="font-bold">治杰</strong> Online
          </h1>

          {/* 座右铭 */}
          <p className="text-white mb-2 drop-shadow-md">
            Stay Hungry <strong className="text-yellow-300">求知若饥</strong>
          </p>
          <p className="text-white mb-8 drop-shadow-md">
            <strong className="text-yellow-300">Stay Foolish</strong> 虚心若愚
          </p>

          {/* 导航链接 */}
          <NavigationLinks />
        </div>
      </header>

      {/* 主内容区域 */}
      <main id="main" className="lg:ml-64 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto p-4 lg:p-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer id="footer" className="lg:ml-64 text-white"
           style={{
             backgroundImage: `url("/rectangle.jpg")`,
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundRepeat: 'no-repeat'
           }}>
        <div className="max-w-4xl mx-auto p-4 lg:p-8 text-center drop-shadow-lg">
          <div className="mb-8">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} 治杰 Online. All rights reserved.
            </p>
          </div>

          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://github.com/hezhijie0327"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-white transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href="mailto:admin@zhijie.online"
              className="text-teal-400 hover:text-white transition-colors duration-200"
            >
              Email
            </a>
          </div>

          {/* 链接列表 */}
          <ul className="flex justify-center space-x-6 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-teal-400 transition-colors duration-200">
                首页
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-gray-500 hover:text-teal-400 transition-colors duration-200">
                项目
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="text-gray-500 hover:text-teal-400 transition-colors duration-200">
                博客
              </Link>
            </li>
            <li>
              <Link href="/status" className="text-gray-500 hover:text-teal-400 transition-colors duration-200">
                状态
              </Link>
            </li>
            <li>
              <Link href="/donation" className="text-gray-500 hover:text-teal-400 transition-colors duration-200">
                捐赠
              </Link>
            </li>
          </ul>
        </div>
      </footer>

      </div>
  )
}