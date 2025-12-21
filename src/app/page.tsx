import { getAllProjects, getAllBlogs } from '@/lib/content'
import HomePage from '@/components/HomePage'

export default function Home() {
  const projects = getAllProjects()
  const blogs = getAllBlogs()

  return <HomePage projects={projects} blogs={blogs} />
}