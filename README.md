# 治杰 Online

🚀 现代化的个人技术博客和项目展示网站，基于 Next.js 16 构建，采用静态站点生成 (SSG) 和内容驱动的架构。

## 📁 项目结构

```
blog/
├── content/                 # Markdown 内容文件
│   ├── pages/              # 静态页面内容
│   ├── projects/           # 项目展示内容
│   └── blogs/              # 博客文章
├── src/
│   ├── app/                # Next.js App Router 页面和布局
│   │   ├── (home)/         # 首页路由组
│   │   ├── blogs/          # 博客相关页面
│   │   ├── projects/       # 项目相关页面
│   │   ├── donation/       # 捐赠页面
│   │   ├── layout.tsx      # 根布局
│   │   └── globals.css     # 全局样式
│   ├── components/         # React 组件
│   │   ├── ui/             # shadcn/ui 基础组件
│   │   ├── Navigation.tsx  # 导航组件
│   │   ├── Footer.tsx      # 页脚组件
│   │   └── ...             # 其他功能组件
│   └── lib/               # 核心工具函数
│       ├── content.ts      # 内容处理逻辑
│       └── utils.ts        # 通用工具函数
├── public/                # 静态资源 (图片、图标等)
├── next.config.ts         # Next.js 配置 (静态导出)
├── tsconfig.json          # TypeScript 配置
├── tailwind.config.ts     # Tailwind CSS 配置
├── eslint.config.mjs      # ESLint 配置
├── deploy.sh              # 自动部署脚本
└── CLAUDE.md             # Claude Code 开发指南
```

## 🚀 快速开始

### 环境要求

- Node.js 18.17+ 或更高版本
- npm 或 yarn 包管理器

### 安装和运行

```bash
# 克隆项目
git clone <repository-url>
cd blog

# 安装依赖
npm install

# 启动开发服务器 (高内存模式)
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站

### 其他开发命令

```bash
# 生产构建
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint

# 依赖更新
npm update

# 安全审计
npm audit
```

## 📝 内容管理

本项目采用 **Markdown + Frontmatter** 的内容管理方式，支持中文文件名和 URL 编码。

### Frontmatter 字段说明

#### 通用字段

```yaml
title: "标题" # 必需 - 显示标题
description: "描述" # 可选 - 页面描述和 SEO
date: "2024-12-21" # 必需 - 发布日期 (ISO 8601)
tags: ["标签1", "标签2"] # 可选 - 标签数组
```

#### 项目专用字段 (`content/projects/`)

```yaml
link: "https://github.com/user/repo"  # 项目链接
image: "https://example.com/cover.jpg" # 封面图片
type: "personal" | "starred"          # 项目类型 (默认: personal)
```

#### 博客专用字段 (`content/blogs/`)

```yaml
category: "技术分享" # 文章分类
author: "作者名" # 作者名称 (可选)
```

### 内容创建指南

**📄 新增博客文章**

1. 在 `content/blogs/` 创建 `.md` 文件
2. 文件名支持中文，如 `nextjs最佳实践.md`
3. 系统自动计算阅读时间并生成路由

**🚀 新增项目展示**

1. 选择分类：`content/projects/personal/` 或 `content/projects/starred/`
2. 创建 `.md` 文件并填写完整 frontmatter
3. 支持外部链接和封面图片

**📋 静态页面**

1. 在 `content/pages/` 创建页面内容
2. 需要在 `src/app/` 创建对应的页面组件

### Markdown 支持

- ✅ 标准 Markdown 语法
- ✅ GitHub Flavored Markdown (GFM)
- ✅ 代码语法高亮
- ✅ 数学公式 (通过 MDX)
- ✅ 图片和链接自动处理

## 🏗️ 构建和部署

### 本地构建

```bash
# 开发构建 (带热重载)
npm run dev

# 生产构建
npm run build

# 启动生产服务器
npm run start
```

### 部署到 GitHub Pages

```bash
# 自动部署脚本 (包含构建、提交、推送)
./deploy.sh
```

**部署脚本功能：**

- 🔧 自动执行生产构建
- 📦 处理静态资源优化
- 🚀 推送到 `gh-pages` 分支
- 🌐 自动配置 GitHub Pages

### 静态导出配置

- ✅ 启用静态站点生成 (`output: "export"`)
- ✅ 支持 URL 路径末尾斜杠 (`trailingSlash: true`)
- ✅ 图片静态优化 (`unoptimized: true`)
- ✅ 完美适配 GitHub Pages 部署

## 🛠️ 技术栈

### 核心框架

- **Next.js 16.1.0** - React 全栈框架，支持 App Router 和静态站点生成
- **React 19.2.3** - 用户界面构建库
- **TypeScript 5.9.3** - 类型安全的 JavaScript 超集

### 样式和 UI

- **Tailwind CSS v4** - 原子化 CSS 框架，支持 PostCSS 4
- **shadcn/ui** - 现代化 React 组件库 (基于 Radix UI)
- **Lucide React** - 优雅的图标库
- **Framer Motion** - 高性能动画库

### 内容处理

- **gray-matter** - Frontmatter 解析器
- **next-mdx-remote 5.0** - MDX 远程渲染
- **reading-time** - 阅读时间计算
- **react-markdown** - Markdown 转 React 组件

### 开发工具

- **ESLint 9.39.2** - 代码质量检查
- **eslint-config-next** - Next.js ESLint 配置
- **PostCSS 4** - CSS 后处理器
- **Geist Fonts** - 现代化字体家族

### 部署和托管

- **GitHub Pages** - 静态站点托管
- **静态导出** - 完全静态的 HTML/CSS/JS 输出
- **自动化部署** - Shell 脚本驱动的 CI/CD

## ✨ 核心特性

### 🚀 性能优化

- **静态站点生成 (SSG)** - 预渲染所有页面，极致加载速度
- **代码分割** - 按需加载，减少初始包体积
- **图片优化** - 静态环境下的最佳图片处理策略
- **SEO 友好** - 完整的元数据和 Open Graph 支持

### 🎨 用户体验

- **响应式设计** - 完美适配桌面、平板、移动端
- **深色模式** - 自动检测系统偏好，支持手动切换
- **流畅动画** - 基于 Framer Motion 的微交互动画
- **无障碍支持** - 遵循 WAI-ARIA 规范

### 📝 内容功能

- **Markdown 支持** - 标准 Markdown + GFM 语法
- **MDX 增强** - 在 Markdown 中使用 React 组件
- **标签系统** - 灵活的内容分类和筛选
- **阅读时间** - 智能估算文章阅读时长
- **中文支持** - 完善的中文文件名和 URL 编码处理

### 🛠️ 开发体验

- **TypeScript** - 完整的类型安全支持
- **热重载** - 开发环境下的实时更新
- **ESLint** - 代码质量和风格检查
- **组件化** - 可复用的现代化组件架构

## 📋 开发指南

### 项目架构说明

**内容驱动架构**

- 所有页面内容通过 Markdown 文件管理
- 使用 `src/lib/content.ts` 统一处理内容逻辑
- 支持动态路由和静态生成的完美结合

**组件设计模式**

- 基于 shadcn/ui 的设计系统
- 使用 TypeScript 接口确保类型安全
- 组件复用和模块化设计

**路由结构**

```
/                    # 首页
/blogs              # 博客列表
/blogs/[slug]       # 博客详情
/projects           # 项目列表
/projects/[slug]    # 项目详情
/donation           # 捐赠页面
```

### 常见开发任务

**添加新的内容类型**

1. 在 `content/` 创建新的目录
2. 在 `src/lib/content.ts` 添加处理函数
3. 创建对应的页面组件

**自定义 UI 组件**

1. 在 `src/components/ui/` 添加新组件
2. 使用 `class-variance-authority` 管理变体
3. 遵循 shadcn/ui 的设计规范

**样式定制**

- 编辑 `tailwind.config.ts` 自定义主题
- 在 `src/app/globals.css` 添加全局样式
- 使用 CSS 变量支持深色模式

### 性能优化建议

**图片处理**

- 使用 `next/image` 组件 (开发环境)
- 生产环境自动转换为静态 `<img>` 标签
- 推荐使用 WebP 格式的外部图片

**代码分割**

- 页面组件自动分割
- 大型组件使用 `React.lazy()` 懒加载
- MDX 内容按需渲染

### 故障排除

**常见问题**

- **内存不足**: 开发环境已配置 4GB 内存限制
- **中文路由**: 支持双重 URL 编码解码
- **静态导出**: 确保所有页面都可静态生成
- **图片显示**: 使用绝对路径或配置 assetPrefix

**调试技巧**

```bash
# 查看构建输出
npm run build --debug

# 分析包大小
npm run build --analyze

# 清理缓存
rm -rf .next out
```

## 🤝 贡献指南

### 开发流程

1. Fork 项目并创建功能分支
2. 遵循 TypeScript 和 ESLint 规范
3. 添加必要的类型定义和注释
4. 确保所有页面可正常静态生成
5. 提交 Pull Request

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 ESLint 和 Prettier 配置
- 组件使用 PascalCase 命名
- 文件使用 camelCase 命名

## 📄 许可证

本项目采用Apache License 2.0 with Commons Clause v1.0许可证 - 详见[LICENSE](LICENSE)文件

---

**🔗 相关链接**

- [在线演示](https://hezhijie0327.github.io)
- [Claude Code 开发指南](./CLAUDE.md)
- [Next.js 官方文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
