'use client'

import { cn } from '@/lib/utils'

interface FooterProps {
  className?: string
}

export default function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={cn("bg-background border-t border-border", className)}>
      <div className="container mx-auto px-4 py-1">
        <div className="flex items-center justify-center text-center text-xs text-foreground/60">
          {/* 版权信息 */}
          <span>© {currentYear} Zhijie Online</span>
        </div>
      </div>
    </footer>
  )
}