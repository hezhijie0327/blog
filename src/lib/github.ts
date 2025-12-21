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

// 获取仓库信息
export async function getGitHubRepoInfo(repo: string): Promise<GitHubRepoInfo | null> {
  const cacheKey = `repo-${repo}`
  const cached = cache.get(cacheKey)

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }

  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
    }

    // 如果提供了 GitHub token，添加到请求头中
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
    }

    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers,
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
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
    }

    // Discussions API 需要 GitHub token
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
    }

    // GitHub GraphQL API 是获取 Discussions 的唯一方式
    // 这里使用 REST API 的搜索功能作为备选方案
    const response = await fetch(
      `https://api.github.com/search/issues?q=repo:${repo}+type:disc&sort=created&order=desc&per_page=${limit}`,
      {
        headers,
        next: { revalidate: CACHE_DURATION / 1000 }
      }
    )

    if (!response.ok) {
      console.error(`GitHub Discussions API error for ${repo}:`, response.status, response.statusText)
      return []
    }

    const data = await response.json()

    const discussions: GitHubDiscussion[] = data.items.map((item: any) => ({
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
      upvoteCount: item.reactions?.['+1'] || 0,
      comments: {
        totalCount: item.comments || 0
      },
      category: {
        name: 'General',
        emoji: '💬'
      }
    }))

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

// 清除缓存
export function clearGitHubCache(): void {
  cache.clear()
}