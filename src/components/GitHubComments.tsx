'use client'

import { MessageSquare } from 'lucide-react'

interface GitHubCommentsProps {
  repo: string
  issueNumber: number
  theme?: 'light' | 'dark'
}

export default function GitHubComments({
  repo,
  issueNumber,
  theme = 'dark'
}: GitHubCommentsProps) {
  return (
    <div className="mt-12 border-t pt-8">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5" />
        <h3 className="text-lg font-semibold">评论</h3>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          评论功能暂时不可用
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          如有问题或建议，请通过 GitHub 联系我
        </p>
        <a
          href={`https://github.com/${repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          在 GitHub 上讨论
        </a>
      </div>
    </div>
  )
}