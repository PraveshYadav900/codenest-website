import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Calendar, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getPortfolioProjects } from "@/lib/database"

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects()

  // Fallback data if database is empty
  const defaultProjects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      short_description: "Modern e-commerce solution with advanced features",
      image_url: "/placeholder.svg?height=300&width=500",
      demo_url: "https://demo-ecommerce.com",
      github_url: "https://github.com/username/ecommerce",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      category: "Web Development",
      featured: true,
      completed_date: "2024-01-15",
      client: "RetailCorp",
    },
    {
      id: 2,
      title: "AI Chatbot Integration",
      short_description: "AI-powered customer support solution",
      image_url: "/placeholder.svg?height=300&width=500",
      demo_url: "https://demo-chatbot.com",
      github_url: "https://github.com/username/ai-chatbot",
      technologies: ["OpenAI", "Node.js", "WebSocket", "NLP"],
      category: "AI & Chatbots",
      featured: true,
      completed_date: "2023-11-20",
      client: "SupportTech",
    },
    {
      id: 3,
      title: "Mobile Banking App",
      short_description: "Secure banking app with modern UI/UX",
      image_url: "/placeholder.svg?height=300&width=500",
      demo_url: "https://demo-banking.com",
      github_url: "https://github.com/username/banking-app",
      technologies: ["React Native", "Firebase", "Redux"],
      category: "Mobile Development",
      featured: false,
      completed_date: "2023-12-10",
      client: "FinanceBank",
    },
  ]

  const projectList = projects.length > 0 ? projects : defaultProjects
  const featuredProjects = projectList.filter((p) => p.featured)
  const regularProjects = projectList.filter((p) => !p.featured)

  const categories = ["All", "Web Development", "Mobile Development", "AI & Chatbots", "Security"]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            Our Work
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Portfolio & Case Studies</h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore our latest projects and see how we've helped businesses transform their digital presence.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className={category === "All" ? "bg-blue-600" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h2>
              <p className="text-gray-600">Our most impactful and innovative solutions</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden border-0 shadow-xl group">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image_url || "/placeholder.svg?height=300&width=500"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-blue-600">Featured</Badge>
                    <Badge variant="secondary" className="absolute top-4 right-4">
                      {project.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription>{project.short_description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {project.client && (
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {project.client}
                        </div>
                      )}
                      {project.completed_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(project.completed_date).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {project.demo_url && (
                        <Button size="sm" asChild>
                          <Link href={project.demo_url} target="_blank">
                            <ExternalLink className="mr-1 h-3 w-3" />
                            Live Demo
                          </Link>
                        </Button>
                      )}
                      {project.github_url && (
                        <Button size="sm" variant="outline" asChild>
                          <Link href={project.github_url} target="_blank">
                            <Github className="mr-1 h-3 w-3" />
                            Code
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Projects</h2>
            <p className="text-gray-600">A comprehensive look at our work</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularProjects.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image_url || "/placeholder.svg?height=300&width=500"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge variant="secondary" className="absolute top-4 left-4">
                    {project.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.short_description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {project.demo_url && (
                      <Button size="sm" variant="outline" asChild>
                        <Link href={project.demo_url} target="_blank">
                          <ExternalLink className="mr-1 h-3 w-3" />
                          Demo
                        </Link>
                      </Button>
                    )}
                    {project.github_url && (
                      <Button size="sm" variant="outline" asChild>
                        <Link href={project.github_url} target="_blank">
                          <Github className="mr-1 h-3 w-3" />
                          Code
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's create something amazing together. Contact us to discuss your requirements.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Start Your Project</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
