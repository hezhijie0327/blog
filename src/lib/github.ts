// GitHub API 服务
// 用于获取仓库的 Discussions 信息

export interface GitHubDiscussion {
  id: string
  title: string
  body: string
  url: string
  author: {
    login: string
    avatarUrl: string
    url: string
  }
  createdAt: string
  updatedAt: string
  upvoteCount: number
  comments: {
    totalCount: number
  }
  category: {
    name: string
    emoji: string
  }
}

export interface GitHubIssue {
  id: string
  title: string
  body: string
  url: string
  number: number
  state: 'open' | 'closed'
  author: {
    login: string
    avatarUrl: string
    url: string
  }
  createdAt: string
  updatedAt: string
  comments: {
    totalCount: number
  }
  labels: {
    name: string
    color: string
  }[]
}

export interface GitHubRepoInfo {
  name: string
  fullName: string
  description: string
  url: string
  stargazersCount: number
  forksCount: number
  openIssuesCount: number
  discussionsCount?: number
}

// 缓存相关
const CACHE_DURATION = 5 * 60 * 1000 // 5分钟缓存
const cache = new Map<string, { data: any; timestamp: number }>()

// GitHub Discussions 默认分类的 emoji 映射
const emojiMap: Record<string, string> = {
  // GitHub 默认 Discussions 分类
  'announcements': '📣',        // 📣 Announcements
  'general': '💬',               // 💬 General
  'ideas': '💡',                 // 💡 Ideas
  'q&a': '🙏',                   // 🙏 Q&A
  'show and tell': '🙌',         // 🙌 Show and tell

  // 兼容其他可能的格式
  'announcement': '📣',
  'speech_balloon': '💬',
  'question': '🙏',
  'idea': '💡',
  'show_and_tell': '🙌',
  'poll': '📊',
  'help_wanted': '🤝'
}

// 获取仓库信息
export async function getGitHubRepoInfo(repo: string): Promise<GitHubRepoInfo | null> {
  const cacheKey = `repo-${repo}`
  const cached = cache.get(cacheKey)

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: CACHE_DURATION / 1000 } // 缓存时间（秒）
    })

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`GitHub repository not found: ${repo}`)
      } else {
        console.error(`GitHub API error for ${repo}:`, response.status, response.statusText)
      }
      return null
    }

    const data = await response.json()

    const repoInfo: GitHubRepoInfo = {
      name: data.name,
      fullName: data.full_name,
      description: data.description,
      url: data.html_url,
      stargazersCount: data.stargazers_count,
      forksCount: data.forks_count,
      openIssuesCount: data.open_issues_count
    }

    cache.set(cacheKey, { data: repoInfo, timestamp: Date.now() })
    return repoInfo
  } catch (error) {
    console.error(`Error fetching GitHub repo info for ${repo}:`, error)
    return null
  }
}

// 获取仓库的 Discussions（需要 GitHub Discussions 功能已启用）
export async function getGitHubDiscussions(
  repo: string,
  limit: number = 10
): Promise<GitHubDiscussion[]> {
  const cacheKey = `discussions-${repo}-${limit}`
  const cached = cache.get(cacheKey)

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }

  try {
    // 使用直接 Discussions API 端点
    const response = await fetch(
      `https://api.github.com/repos/${repo}/discussions?per_page=${limit}&sort=created&direction=desc`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: CACHE_DURATION / 1000 }
      }
    )

    if (!response.ok) {
      console.error(`GitHub Discussions API error for ${repo}:`, response.status, response.statusText)
      return []
    }

    const data = await response.json()

    const discussions: GitHubDiscussion[] = data.map((item: any) => {
      // 处理 emoji
      const rawEmoji = item.category?.emoji?.replace(/:/g, '')?.toLowerCase() || 'general'
      const categoryName = item.category?.name?.toLowerCase() || 'general'

      // 尝试从 emoji 映射或分类名获取对应的 emoji
      const emoji = emojiMap[rawEmoji] || emojiMap[categoryName] || '💬'

      return {
        id: item.id.toString(),
        title: item.title,
        body: item.body || '',
        url: item.html_url,
        author: {
          login: item.user.login,
          avatarUrl: item.user.avatar_url,
          url: item.user.html_url
        },
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        upvoteCount: item.reactions?.total_count || 0,
        comments: {
          totalCount: item.comments || 0
        },
        category: {
          name: item.category?.name || 'General',
          emoji: emoji
        }
      }
    })

    cache.set(cacheKey, { data: discussions, timestamp: Date.now() })
    return discussions
  } catch (error) {
    console.error(`Error fetching GitHub Discussions for ${repo}:`, error)
    return []
  }
}

// 检查仓库是否启用了 Discussions
export async function hasDiscussionsEnabled(repo: string): Promise<boolean> {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      }
    })

    if (!response.ok) return false

    const data = await response.json()
    return data.has_discussions === true
  } catch (error) {
    console.error(`Error checking Discussions for ${repo}:`, error)
    return false
  }
}

// 获取仓库的 Issues
export async function getGitHubIssues(
  repo: string,
  limit: number = 10,
  state: 'open' | 'closed' | 'all' = 'open'
): Promise<GitHubIssue[]> {
  const cacheKey = `issues-${repo}-${limit}-${state}`
  const cached = cache.get(cacheKey)

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/issues?per_page=${limit}&sort=created&direction=desc&state=${state}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: CACHE_DURATION / 1000 }
      }
    )

    if (!response.ok) {
      console.error(`GitHub Issues API error for ${repo}:`, response.status, response.statusText)
      return []
    }

    const data = await response.json()

    // 过滤掉 pull requests，因为 GitHub API 会将 PR 也作为 Issues 返回
    const issues: GitHubIssue[] = data
      .filter((item: any) => !item.pull_request)
      .map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        body: item.body || '',
        url: item.html_url,
        number: item.number,
        state: item.state,
        author: {
          login: item.user.login,
          avatarUrl: item.user.avatar_url,
          url: item.user.html_url
        },
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        comments: {
          totalCount: item.comments || 0
        },
        labels: item.labels.map((label: any) => ({
          name: label.name,
          color: label.color
        }))
      }))

    cache.set(cacheKey, { data: issues, timestamp: Date.now() })
    return issues
  } catch (error) {
    console.error(`Error fetching GitHub Issues for ${repo}:`, error)
    return []
  }
}

// 清除缓存
export function clearGitHubCache(): void {
  cache.clear()
}