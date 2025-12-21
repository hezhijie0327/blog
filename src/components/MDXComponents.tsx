import Image from 'next/image'
import Link from 'next/link'

// 自定义 Markdown 组件映射
export const MDXComponents = {
  // 自定义标题样式
  h1: ({ children, ...props }: any) => (
    <h1 className="text-3xl font-bold mb-4 text-foreground" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-2xl font-semibold mb-3 text-foreground mt-6" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-xl font-semibold mb-2 text-foreground mt-4" {...props}>
      {children}
    </h3>
  ),

  // 段落
  p: ({ children, ...props }: any) => (
    <p className="mb-4 text-muted-foreground leading-relaxed" {...props}>
      {children}
    </p>
  ),

  // 链接
  a: ({ children, href, ...props }: any) => {
    if (href?.startsWith('http')) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 underline"
          {...props}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href || ''} className="text-primary hover:text-primary/80 underline" {...props}>
        {children}
      </Link>
    )
  },

  // 图片
  img: ({ src, alt, ...props }: any) => (
    <div className="my-6">
      <Image
        src={src || ''}
        alt={alt || ''}
        width={800}
        height={400}
        className="rounded-lg shadow-md w-full h-auto"
        {...props}
      />
      {alt && (
        <p className="text-center text-sm text-muted-foreground mt-2">{alt}</p>
      )}
    </div>
  ),

  // 列表
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc pl-6 mb-4 text-muted-foreground" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal pl-6 mb-4 text-muted-foreground" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ...props }: any) => (
    <li className="mb-2" {...props}>
      {children}
    </li>
  ),

  // 代码块
  pre: ({ children, ...props }: any) => (
    <div className="bg-card text-card-foreground border p-4 rounded-lg mb-4 overflow-x-auto">
      <pre {...props}>{children}</pre>
    </div>
  ),

  // 内联代码
  code: ({ children, ...props }: any) => (
    <code className="bg-muted text-foreground px-2 py-1 rounded text-sm font-mono" {...props}>
      {children}
    </code>
  ),

  // 引用
  blockquote: ({ children, ...props }: any) => (
    <blockquote
      className="border-l-4 border-primary pl-4 py-2 my-4 bg-muted/50 italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // 分割线
  hr: ({ ...props }: any) => (
    <hr className="my-6 border-border" {...props} />
  ),

  // 表格
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border-collapse border border-border" {...props}>
        {children}
      </table>
    </div>
  ),

  th: ({ children, ...props }: any) => (
    <th className="border border-border px-4 py-2 bg-muted font-semibold text-left" {...props}>
      {children}
    </th>
  ),

  td: ({ children, ...props }: any) => (
    <td className="border border-border px-4 py-2" {...props}>
      {children}
    </td>
  ),
}

// 默认导出
export default MDXComponents