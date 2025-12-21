'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, MessageCircle, ThumbsUp, ExternalLink, Users, Star, GitBranch, AlertCircle, GitPullRequest } from 'lucide-react'
import { getGitHubDiscussions, getGitHubIssues, getGitHubRepoInfo, hasDiscussionsEnabled, type GitHubDiscussion, type GitHubIssue, type GitHubRepoInfo } from '@/lib/github'
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
  const [issues, setIssues] = useState<GitHubIssue[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasDiscussions, setHasDiscussions] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!repo) return

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        console.log(`🔍 Fetching data for repo: ${repo}`)

        // 并行获取仓库信息、Discussions状态和Issues
        const [repoData, discussionsEnabled, discussionsData, issuesData] = await Promise.all([
          getGitHubRepoInfo(repo),
          hasDiscussionsEnabled(repo),
          getGitHubDiscussions(repo, 5),
          getGitHubIssues(repo, 5, 'open')
        ])

        console.log(`📊 Repo data:`, repoData)
        console.log(`💬 Discussions enabled:`, discussionsEnabled)
        console.log(`🗨️ Discussions count:`, discussionsData.length)
        console.log(`🐛 Issues count:`, issuesData.length)

        setRepoInfo(repoData)
        setHasDiscussions(discussionsEnabled)
        setDiscussions(discussionsData)
        setIssues(issuesData)
      } catch (err) {
        console.error(`❌ Error fetching data for ${repo}:`, err)
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">评论</h3>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800/50 dark:to-slate-900/50 rounded-lg p-6 text-center shadow-sm">
          <p className="text-gray-800 dark:text-gray-200">
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">讨论与评论</h3>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800/50 dark:to-slate-900/50 rounded-lg p-6 text-center shadow-sm">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mx-auto mb-3"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  // 即使有错误或无法获取仓库信息，仍然显示底部的参与卡片
  if (error || !repoInfo) {
    console.log(`⚠️ Component showing basic participation card due to error or missing repo info:`, { error, repoInfo })
    return (
      <div className="mt-12 border-t pt-8">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="w-5 h-5" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">讨论与评论</h3>
        </div>

        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800/50 dark:to-slate-900/50 border-0 shadow-sm">
          <div className="p-6 text-center">
            <div className="mb-4">
              <p className="text-gray-800 dark:text-gray-200 mb-2">
                欢迎参与讨论
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                对此项目有疑问或建议？访问 GitHub 仓库参与讨论
              </p>
            </div>

            <a
              href={`https://github.com/${repo}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>
                <ExternalLink className="w-4 h-4 mr-2" />
                访问仓库
              </Button>
            </a>
          </div>
        </Card>
      </div>
    )
  }

  console.log(`✅ Component rendering for repo: ${repo} with ${discussions.length} discussions and ${issues.length} issues`)

  return (
    <div className="mt-12 border-t pt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {hasDiscussions ? '讨论与评论' : '问题与反馈'}
          </h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {repoInfo.openIssuesCount}
          </div>
          {hasDiscussions && (
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {discussions.length}
            </div>
          )}
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
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800/50 dark:to-slate-900/50 border-0 shadow-sm">
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-medium text-lg mb-1 text-gray-900 dark:text-gray-100">{repoInfo.name}</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {repoInfo.description || '暂无描述'}
              </p>
            </div>
            <a
              href={repoInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
              GitHub
            </span>
            {hasDiscussions ? (
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded">
                已启用 Discussions
              </span>
            ) : (
              <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded">
                仅支持 Issues
              </span>
            )}
          </div>
        </div>
      </Card>

      {/* Issues 列表 - 仅在有 Issues 时显示 */}
      {issues.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <AlertCircle className="w-4 h-4" />
            开放问题 ({issues.length})
          </h4>
          <div className="space-y-3">
            {issues.map((issue) => (
              <Card key={issue.id} className="hover:shadow-md transition-shadow bg-gradient-to-r from-red-50 to-orange-50 dark:from-slate-800/50 dark:to-slate-900/50 border-0 shadow-sm">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <a
                        href={issue.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:underline"
                      >
                        #{issue.number} {issue.title}
                      </a>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <img
                            src={issue.author.avatarUrl}
                            alt={issue.author.login}
                            className="w-4 h-4 rounded-full"
                          />
                          {issue.author.login}
                        </div>
                        <span>{new Date(issue.createdAt).toLocaleDateString('zh-CN')}</span>
                        {issue.comments.totalCount > 0 && (
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {issue.comments.totalCount}
                          </div>
                        )}
                        <span className={`px-2 py-1 text-xs rounded ${
                          issue.state === 'open'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                        }`}>
                          {issue.state === 'open' ? '开放' : '已关闭'}
                        </span>
                      </div>
                      {issue.labels.length > 0 && (
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          {issue.labels.map((label) => (
                            <span
                              key={label.name}
                              className="px-2 py-1 text-xs rounded-full text-white"
                              style={{ backgroundColor: `#${label.color}` }}
                            >
                              {label.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Discussions 列表 - 仅在有 Discussions 时显示 */}
      {discussions.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <MessageCircle className="w-4 h-4" />
            相关讨论 ({discussions.length})
          </h4>
          <div className="space-y-3">
            {discussions.map((discussion) => (
              <Card key={discussion.id} className="hover:shadow-md transition-shadow bg-gradient-to-r from-gray-50 to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50 border-0 shadow-sm">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <a
                        href={discussion.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                      >
                        {discussion.title}
                      </a>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-600 dark:text-gray-400">
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
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded">
                      {discussion.category.emoji} {discussion.category.name}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 参与讨论 - 始终显示 */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800/50 dark:to-slate-900/50 border-0 shadow-sm">
        <div className="p-6 text-center">
          <div className="mb-4">
            <p className="text-gray-800 dark:text-gray-200 mb-2">
              {hasDiscussions ? '欢迎参与讨论' : '欢迎反馈问题'}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {hasDiscussions
                ? '对此项目有疑问或建议？提交 Issue 或创建新的 Discussion'
                : '对此项目有疑问或建议？通过 Issues 提出问题和建议'
              }
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <a
              href={`https://github.com/${repo}/issues/new?title=${encodeURIComponent(title || '问题反馈')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>
                <AlertCircle className="w-4 h-4 mr-2" />
                提交 Issue
              </Button>
            </a>

            {hasDiscussions && (
              <a
                href={`https://github.com/${repo}/discussions/new?category=general&title=${encodeURIComponent(title || '新的讨论')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  创建讨论
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