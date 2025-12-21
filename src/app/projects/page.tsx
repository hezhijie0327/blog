import { getAllProjects } from '@/lib/content'
import ProjectsPageClient from '@/components/ProjectsPageClient'

export default function ProjectsPage() {
  const projects = getAllProjects()

  return <ProjectsPageClient projects={projects} />
}