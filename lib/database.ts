import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface PortfolioProject {
  id: number
  title: string
  description?: string
  short_description?: string
  image_url?: string
  demo_url?: string
  github_url?: string
  technologies: string[]
  category?: string
  featured: boolean
  completed_date?: string
  client?: string
}

export interface AboutInfo {
  id: number
  name: string
  title?: string
  bio?: string
  profile_image?: string
  resume_url?: string
  years_experience?: number
  projects_completed?: number
  clients_served?: number
}

export interface Skill {
  id: number
  name: string
  category?: string
  proficiency?: number
  icon?: string
}

export interface Experience {
  id: number
  company: string
  position: string
  description?: string
  start_date?: string
  end_date?: string
  is_current: boolean
  location?: string
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const projects = await sql`
      SELECT * FROM portfolio_projects 
      ORDER BY featured DESC, completed_date DESC
    `
    return projects as PortfolioProject[]
  } catch (error) {
    console.error("Error fetching portfolio projects:", error)
    return []
  }
}

export async function getAboutInfo(): Promise<AboutInfo | null> {
  try {
    const result = await sql`
      SELECT * FROM about_info 
      ORDER BY created_at DESC 
      LIMIT 1
    `
    return (result[0] as AboutInfo) || null
  } catch (error) {
    console.error("Error fetching about info:", error)
    return null
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const skills = await sql`
      SELECT * FROM skills 
      ORDER BY category, proficiency DESC
    `
    return skills as Skill[]
  } catch (error) {
    console.error("Error fetching skills:", error)
    return []
  }
}

export async function getExperience(): Promise<Experience[]> {
  try {
    const experience = await sql`
      SELECT * FROM experience 
      ORDER BY is_current DESC, start_date DESC
    `
    return experience as Experience[]
  } catch (error) {
    console.error("Error fetching experience:", error)
    return []
  }
}
