'use client'

import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface FooterProps {
  className?: string
}

export default function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const [currentTime, setCurrentTime] = useState<string>('')
  const [userIP, setUserIP] = useState<string>('获取中...')
  const [postQuantumSupported, setPostQuantumSupported] = useState<boolean>(false)

  useEffect(() => {
    // 更新时间
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }))
    }

    updateTime()
    const timeInterval = setInterval(updateTime, 1000)

    // 获取信息 - 使用 Cloudflare CDN trace
    const fetchInfo = async () => {
      try {
        const cfTraceUrl = `${window.location.origin}/cdn-cgi/trace`
        const response = await fetch(cfTraceUrl)

        if (response.ok) {
          const text = await response.text()
          // 解析 CF trace 输出
          const lines = text.split('\n')

          // 获取 IP 地址
          const ipLine = lines.find(line => line.startsWith('ip='))
          if (ipLine) {
            const ip = ipLine.split('=')[1]
            if (ip) {
              setUserIP(ip)
            }
          }

          // 检测后量子加密支持
          const kexLine = lines.find(line => line.startsWith('kex='))
          if (kexLine) {
            const kex = kexLine.split('=')[1]
            if (kex === 'X25519MLKEM768') {
              setPostQuantumSupported(true)
            }
          }
        } else {
          setUserIP('无法获取')
        }
      } catch (error) {
        console.error('Failed to fetch info from Cloudflare trace:', error)
        setUserIP('无法获取')
      }
    }

    fetchInfo()

    return () => clearInterval(timeInterval)
  }, [])

  return (
    <footer className={cn("bg-background border-t border-border", className)}>
      <div className="container mx-auto px-4 py-1">
        <div className="flex flex-col items-center justify-center text-center text-xs text-foreground/60 space-y-1">
          {/* 版权信息 */}
          <span>© {currentYear} Zhijie Online</span>

          {/* 时间和IP信息 */}
          <div className="flex flex-col items-center space-y-1">
            <div className="flex items-center space-x-4">
              <span>🕒 {currentTime}</span>
              <span>🌐 IP: {userIP}</span>
            </div>

            {/* 后量子加密支持 */}
            {postQuantumSupported && (
              <div className="flex items-center space-x-1 text-xs">
                <span>🔒</span>
                <span>后量子加密保护</span>
                <span className="text-green-500">●</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}