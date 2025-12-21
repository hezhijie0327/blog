'use client'

import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface FooterProps {
  className?: string
}

interface CFInfo {
  ip: string
  kex: string
  http: string
  tls: string
  uag: string
  warp: string
  colo: string
  loc: string
}

export default function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const [cfInfo, setCfInfo] = useState<CFInfo>({
    ip: '获取中...',
    kex: 'unknown',
    http: 'unknown',
    tls: 'unknown',
    uag: 'unknown',
    warp: 'unknown',
    colo: 'unknown',
    loc: 'unknown'
  })

  useEffect(() => {
    // 获取信息 - 使用 Cloudflare CDN trace
    const fetchInfo = async () => {
      try {
        const cfTraceUrl = `${window.location.origin}/cdn-cgi/trace`
        const response = await fetch(cfTraceUrl)

        if (response.ok) {
          const text = await response.text()
          // 解析 CF trace 输出
          const lines = text.split('\n')
          const parsedData: Partial<CFInfo> = {}

          lines.forEach(line => {
            const [key, value] = line.split('=')
            if (key && value) {
              switch (key) {
                case 'ip':
                  parsedData.ip = value
                  break
                case 'kex':
                  parsedData.kex = value
                  break
                case 'http':
                  parsedData.http = value
                  break
                case 'tls':
                  parsedData.tls = value
                  break
                case 'uag':
                  parsedData.uag = value.length > 50 ? value.substring(0, 50) + '...' : value
                  break
                case 'warp':
                  parsedData.warp = value
                  break
                case 'colo':
                  parsedData.colo = value
                  break
                case 'loc':
                  parsedData.loc = value
                  break
              }
            }
          })

          setCfInfo(prev => ({ ...prev, ...parsedData }))
        } else {
          setCfInfo(prev => ({ ...prev, ip: '无法获取' }))
        }
      } catch (error) {
        console.error('Failed to fetch info from Cloudflare trace:', error)
        setCfInfo(prev => ({ ...prev, ip: '无法获取' }))
      }
    }

    fetchInfo()
  }, [])

  const getPostQuantumInfo = () => {
    if (cfInfo.kex === 'X25519MLKEM768') {
      return { text: '后量子加密保护', color: 'text-green-500', icon: '🔒' }
    } else if (cfInfo.kex === 'unknown') {
      return { text: '检测中...', color: 'text-yellow-500', icon: '⏳' }
    } else {
      return { text: '标准加密', color: 'text-orange-500', icon: '🔓' }
    }
  }

  const getWarpInfo = () => {
    if (cfInfo.warp === 'on') {
      return { text: 'WARP', color: 'text-blue-500' }
    } else if (cfInfo.warp === 'off') {
      return { text: '直连', color: 'text-gray-500' }
    } else {
      return null
    }
  }

  return (
    <footer className={cn("bg-background border-t border-border", className)}>
      <div className="container mx-auto px-4 py-1">
        <div className="flex flex-col items-center justify-center text-center text-xs text-foreground/60 space-y-1">
          {/* 版权信息 */}
          <span>© {currentYear} Zhijie Online</span>

          {/* 网络和安全信息 */}
          <div className="flex flex-col items-center space-y-2">
            {/* 基础信息 */}
            <div className="flex items-center space-x-6 text-xs">
              <span>🌐 {cfInfo.ip}</span>
              <span>📍 {cfInfo.colo} ({cfInfo.loc})</span>
              {getWarpInfo() && (
                <span className={getWarpInfo()?.color}>
                  🛡️ {getWarpInfo()?.text}
                </span>
              )}
            </div>

            {/* 加密信息 */}
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <span>{getPostQuantumInfo().icon}</span>
                <span className={getPostQuantumInfo().color}>{getPostQuantumInfo().text}</span>
              </div>
              <span>🔐 {cfInfo.tls}</span>
              <span>🚀 {cfInfo.http}</span>
            </div>

            {/* 浏览器信息 */}
            <div className="flex items-center space-x-2 text-xs text-foreground/50">
              <span>🌍</span>
              <span>{cfInfo.uag}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}