# GitHub 评论功能说明

## 功能特性

### 🚀 动态仓库匹配
- 自动解析项目中的 GitHub 仓库链接
- 支持每个项目对应到其独立的 GitHub 仓库
- 博客文章统一使用主仓库 `hezhijie0327/blog`

### 💬 真实讨论集成
- 获取 GitHub 仓库的真实 Discussions
- 显示讨论标题、作者、时间、评论数等信息
- 支持点赞数和分类显示

### 🎯 智能降级
- 如果仓库未启用 Discussions，自动跳转到 Issues
- 提供友好的错误提示和加载状态
- 网络失败时的优雅降级

### 🔄 缓存优化
- 5分钟内存缓存，减少 API 请求
- Next.js Data Cache 支持持久化缓存

## 使用方式

### 项目页面
- 自动从项目的 `link` 字段解析 GitHub 仓库
- 例如：`https://github.com/hezhijie0327/task-manager-pro` → `hezhijie0327/task-manager-pro`
- 评论标题格式：`关于项目 "${项目名}" 的讨论`

### 博客页面
- 固定使用 `hezhijie0327/blog` 仓库
- 评论标题格式：`关于文章 "${文章名}" 的讨论`

## API 限制

### 当前限制
- 60 请求/小时（IP 级别限制）
- 仅能访问公开仓库的信息
- 建议：频繁使用时注意缓存和请求频率

## 组件接口

```tsx
interface GitHubCommentsProps {
  repo?: string           // GitHub 仓库，格式：owner/repo
  issueNumber?: number    // 已废弃，保留兼容性
  theme?: 'light' | 'dark' // 主题（暂未使用）
  title?: string          // 用于创建新讨论的标题
}
```

## 示例效果

### 有 Discussions 的仓库
1. 显示仓库信息卡片（名称、描述、星标、分支数）
2. 显示最新的 5 个讨论
3. 提供"创建新讨论"按钮

### 无 Discussions 的仓库
1. 显示仓库信息卡片
2. 显示"未启用 Discussions"标签
3. 提供"提交 Issue"按钮

### 无仓库链接的项目
1. 显示"此项目未关联 GitHub 仓库"提示

## 故障排除

### 常见问题

1. **Discussions 无法显示**
   - 确保仓库已启用 Discussions 功能
   - 验证仓库是否为公开仓库
   - 检查是否超过 API 请求限制（60次/小时）

2. **API 请求失败**
   - 检查网络连接
   - 验证仓库名称格式
   - 确认 API 限制未超限

3. **缓存问题**
   - 重启开发服务器清除内存缓存
   - 等待 5 分钟缓存自动过期

### 调试技巧

```bash
# 检查仓库是否存在
curl https://api.github.com/repos/owner/repo

# 检查 Discussions 是否启用
curl https://api.github.com/repos/owner/repo
```