'use client'

import Link from 'next/link'

export default function NavigationLinks() {
  const closeMenu = () => {
    const header = document.getElementById('header');
    const overlay = document.getElementById('mobile-overlay');
    header?.classList.add('-translate-x-full');
    overlay?.classList.add('hidden');
  }

  return (
    <nav className="space-y-2">
      <Link
        href="/"
        className="block text-white hover:text-yellow-300 transition-colors duration-200 py-2 drop-shadow-md"
        onClick={closeMenu}
      >
        首页
      </Link>
      <Link
        href="/projects"
        className="block text-white hover:text-yellow-300 transition-colors duration-200 py-2 drop-shadow-md"
        onClick={closeMenu}
      >
        项目
      </Link>
      <Link
        href="/blogs"
        className="block text-white hover:text-yellow-300 transition-colors duration-200 py-2 drop-shadow-md"
        onClick={closeMenu}
      >
        博客
      </Link>
      <Link
        href="/donation"
        className="block text-white hover:text-yellow-300 transition-colors duration-200 py-2 drop-shadow-md"
        onClick={closeMenu}
      >
        捐赠
      </Link>
    </nav>
  )
}