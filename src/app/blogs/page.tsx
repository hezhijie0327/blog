import { getAllBlogs } from '@/lib/content'
import BlogsPageClient from '@/components/BlogsPageClient'

export default function BlogsPage() {
  const blogs = getAllBlogs()

  return <BlogsPageClient blogs={blogs} />
}