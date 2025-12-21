'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, MessageCircle, ThumbsUp, ExternalLink, Users, Star, GitBranch } from 'lucide-react'
import { getGitHubDiscussions, getGitHubRepoInfo, hasDiscussionsEnabled, type GitHubDiscussion, type GitHubRepoInfo } from '@/lib/github'
import { Button } from './ui/Button'
import { Card } from './ui/Card'

interface GitHubCommentsProps {
  repo?: string
  issueNumber?: number
  theme?: 'light' | 'dark'
  title?: string // 用于创建新 Discussion 的标题
}

export default function GitHubComments({
  repo,
  issueNumber,
  theme = 'dark',
  title
}: GitHubCommentsProps) {
  const [repoInfo, setRepoInfo] = useState<GitHubRepoInfo | null>(null)
  const [discussions, setDiscussions] = useState<GitHubDiscussion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasDiscussions, setHasDiscussions] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!repo) return

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // 并行获取仓库信息和 Discussions
        const [repoData, discussionsEnabled, discussionsData] = await Promise.all([
          getGitHubRepoInfo(repo),
          hasDiscussionsEnabled(repo),
          getGitHubDiscussions(repo, 5)
        ])

        setRepoInfo(repoData)
        setHasDiscussions(discussionsEnabled)
        setDiscussions(discussionsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取数据失败')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [repo])

  if (!repo) {
    return (
      <div className="mt-12 border-t pt-8">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="w-5 h-5" />
          <h3 className="text-lg font-semibold">评论</h3>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            此项目未关联 GitHub 仓库
          </p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="mt-12 border-t pt-8">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="w-5 h-5" />
          <h3 className="text-lg font-semibold">评论</h3>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mx-auto mb-3"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !repoInfo) {
    return (
      <div className="mt-12 border-t pt-8">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="w-5 h-5" />
          <h3 className="text-lg font-semibold">评论</h3>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error || '无法获取仓库信息'}
          </p>
          <a
            href={`https://github.com/${repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            访问 GitHub 仓库
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-12 border-t pt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          <h3 className="text-lg font-semibold">讨论与评论</h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            {repoInfo.stargazersCount}
          </div>
          <div className="flex items-center gap-1">
            <GitBranch className="w-4 h-4" />
            {repoInfo.forksCount}
          </div>
        </div>
      </div>

      {/* 仓库信息 */}
      <Card className="mb-6">
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-medium text-lg mb-1">{repoInfo.name}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {repoInfo.description || '暂无描述'}
              </p>
            </div>
            <a
              href={repoInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
              GitHub
            </span>
            {!hasDiscussions && (
              <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded">
                未启用 Discussions
              </span>
            )}
          </div>
        </div>
      </Card>

      {/* Discussions 列表 */}
      {hasDiscussions && discussions.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium mb-4 flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            相关讨论 ({discussions.length})
          </h4>
          <div className="space-y-3">
            {discussions.map((discussion) => (
              <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <a
                        href={discussion.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        {discussion.title}
                      </a>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <img
                            src={discussion.author.avatarUrl}
                            alt={discussion.author.login}
                            className="w-4 h-4 rounded-full"
                          />
                          {discussion.author.login}
                        </div>
                        <span>{new Date(discussion.createdAt).toLocaleDateString('zh-CN')}</span>
                        {discussion.comments.totalCount > 0 && (
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {discussion.comments.totalCount}
                          </div>
                        )}
                        {discussion.upvoteCount > 0 && (
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            {discussion.upvoteCount}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">
                      {discussion.category.emoji} {discussion.category.name}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 参与讨论 */}
      <Card>
        <div className="p-6 text-center">
          <div className="mb-4">
            {hasDiscussions ? (
              <>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  欢迎参与讨论
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  对此项目有疑问或建议？创建新的 Discussion 或回复已有讨论
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  通过 GitHub Issues 参与讨论
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  此仓库未启用 Discussions 功能，欢迎通过 Issues 提出问题和建议
                </p>
              </>
            )}
          </div>

          <div className="flex items-center justify-center gap-3">
            {hasDiscussions ? (
              <a
                href={`https://github.com/${repo}/discussions/new?category=general&title=${encodeURIComponent(title || '新的讨论')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <Users className="w-4 h-4 mr-2" />
                  创建新讨论
                </Button>
              </a>
            ) : (
              <a
                href={`https://github.com/${repo}/issues/new?title=${encodeURIComponent(title || '问题反馈')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  提交 Issue
                </Button>
              </a>
            )}

            <a
              href={repoInfo.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                访问仓库
              </Button>
            </a>
          </div>
        </div>
      </Card>
    </div>
  )
}