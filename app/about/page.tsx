import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, MapPin, Download, Award, Users, Code } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getAboutInfo, getSkills, getExperience } from "@/lib/database"

export default async function AboutPage() {
  const aboutInfo = await getAboutInfo()
  const skills = await getSkills()
  const experience = await getExperience()

  // Fallback data if database is empty
  const defaultAbout = {
    name: "Pravesh Yadav",
    title: "Full Stack Developer & Tech Solutions Expert",
    bio: "Passionate full-stack developer with expertise in modern web technologies, mobile app development, and AI integration. I specialize in creating scalable, secure, and user-friendly applications that drive business growth.",
    profile_image: "/placeholdera1.jpg?height=400&width=400",
    years_experience: 5,
    projects_completed: 50,
    clients_served: 25,
  }

  const defaultSkills = [
    { name: "React", category: "frontend", proficiency: 95 },
    { name: "Node.js", category: "backend", proficiency: 90 },
    { name: "TypeScript", category: "frontend", proficiency: 85 },
    { name: "PostgreSQL", category: "database", proficiency: 85 },
    { name: "Python", category: "backend", proficiency: 80 },
  ]

  const defaultExperience = [
    {
      company: "CodeNest",
      position: "Founder & Lead Developer",
      description:
        "Founded and lead a tech solutions company specializing in web development, mobile apps, and AI integration.",
      start_date: "2020-01-01",
      is_current: true,
      location: "Haryana, India",
    },
  ]

  const about = aboutInfo || defaultAbout
  const skillsList = skills.length > 0 ? skills : defaultSkills
  const experienceList = experience.length > 0 ? experience : defaultExperience

  const stats = [
    { icon: Award, label: "Years Experience", value: about.years_experience || 5 },
    { icon: Code, label: "Projects Completed", value: about.projects_completed || 50 },
    { icon: Users, label: "Clients Served", value: about.clients_served || 25 },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                About Me
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{about.name}</h1>
              <h2 className="text-2xl text-blue-600 mb-6">{about.title}</h2>
              <p className="text-lg text-gray-600 mb-8">{about.bio}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">Get In Touch</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={about.resume_url || "#"}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src={about.profile_image || "/placeholder.svg?height=500&width=400"}
                alt={about.name}
                width={400}
                height={500}
                className="rounded-lg shadow-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold">{stat.value}+</CardTitle>
                  <CardDescription className="text-lg">{stat.label}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
            <p className="text-xl text-gray-600">Technologies and tools I work with</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillsList.map((skill, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{skill.name}</h3>
                    <span className="text-sm text-gray-600">{skill.proficiency}%</span>
                  </div>
                  <Progress value={skill.proficiency} className="h-2" />
                  <Badge variant="outline" className="mt-2 text-xs">
                    {skill.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Professional Experience</h2>
            <p className="text-xl text-gray-600">My journey in the tech industry</p>
          </div>

          <div className="space-y-8">
            {experienceList.map((exp, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="text-xl">{exp.position}</CardTitle>
                      <CardDescription className="text-lg font-semibold text-blue-600">{exp.company}</CardDescription>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-2 md:mt-0">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {exp.start_date} - {exp.is_current ? "Present" : exp.end_date}
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Let's Work Together</h2>
          <p className="text-xl text-blue-100 mb-8">
            Ready to bring your ideas to life? Let's discuss your project and create something amazing.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Start a Project</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
