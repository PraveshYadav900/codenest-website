import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Shield,
  Database,
  Search,
  Palette,
  Bot,
  CheckCircle,
  ArrowRight,
  Globe,
  BarChart3,
  Zap,
} from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Code,
    title: "Web & Mobile App Development",
    description: "Custom applications built with modern technologies and best practices",
    price: "Starting from $5,000",
    features: [
      "Responsive Web Applications",
      "Progressive Web Apps (PWA)",
      "React/Next.js Development",
      "React Native Mobile Apps",
      "Cross-platform Solutions",
      "API Integration",
      "Performance Optimization",
      "Maintenance & Support",
    ],
    technologies: ["React", "Next.js", "React Native", "TypeScript", "Node.js"],
    popular: true,
  },
  {
    icon: Shield,
    title: "Security Solutions",
    description: "Comprehensive security audits and implementation of robust protection measures",
    price: "Starting from $2,500",
    features: [
      "Security Audits & Assessments",
      "Penetration Testing",
      "HTTPS Implementation",
      "Data Encryption",
      "Authentication Systems",
      "Vulnerability Scanning",
      "Security Monitoring",
      "Compliance Consulting",
    ],
    technologies: ["OAuth", "JWT", "SSL/TLS", "OWASP", "Encryption"],
  },
  {
    icon: Database,
    title: "Database Management",
    description: "Efficient database design, optimization, and management solutions",
    price: "Starting from $1,500",
    features: [
      "Database Design & Architecture",
      "Performance Optimization",
      "Data Migration Services",
      "Backup & Recovery Solutions",
      "Query Optimization",
      "Scaling Strategies",
      "Data Analytics Setup",
      "Monitoring & Maintenance",
    ],
    technologies: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Boost your online visibility with comprehensive SEO strategies",
    price: "Starting from $1,000",
    features: [
      "Technical SEO Audit",
      "On-page Optimization",
      "Content Strategy",
      "Performance Enhancement",
      "Meta Tags Optimization",
      "Sitemap Generation",
      "Analytics Setup",
      "Monthly Reporting",
    ],
    technologies: ["Google Analytics", "Search Console", "Schema.org", "Core Web Vitals"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design that creates engaging and intuitive experiences",
    price: "Starting from $2,000",
    features: [
      "User Research & Analysis",
      "Wireframing & Prototyping",
      "Visual Design",
      "Accessibility Design",
      "Design Systems",
      "Usability Testing",
      "Responsive Design",
      "Brand Integration",
    ],
    technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle"],
  },
  {
    icon: Bot,
    title: "Chatbot Integration",
    description: "AI-powered chatbots to enhance customer engagement and support",
    price: "Starting from $3,000",
    features: [
      "OpenAI GPT Integration",
      "Custom Training Data",
      "Multi-platform Support",
      "Natural Language Processing",
      "Analytics Dashboard",
      "Human Handoff",
      "Multilingual Support",
      "API Integration",
    ],
    technologies: ["OpenAI", "Dialogflow", "Rasa", "Botpress", "WebSocket"],
  },
]

const additionalServices = [
  {
    icon: Globe,
    title: "System Management & Automation",
    description: "Streamline your operations with automated workflows and system management",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Data-driven insights to help you make informed business decisions",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Speed up your applications and improve user experience",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            Our Services
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Tech Solutions for Your Business
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            From web development to AI integration, we provide end-to-end technology services that drive growth and
            innovation.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600" asChild>
            <Link href="/contact">Get Free Consultation</Link>
          </Button>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`relative overflow-hidden ${service.popular ? "ring-2 ring-blue-500" : ""}`}>
                {service.popular && <Badge className="absolute top-4 right-4 bg-blue-500">Most Popular</Badge>}
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <div className="text-lg font-semibold text-blue-600">{service.price}</div>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" asChild>
                    <Link href="/contact">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Additional Services</h2>
            <p className="text-xl text-gray-600">Expand your capabilities with our specialized services</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild>
                    <Link href="/contact">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Development Process</h2>
            <p className="text-xl text-gray-600">A proven methodology that ensures project success</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", description: "Understanding your requirements and goals" },
              { step: "02", title: "Planning", description: "Creating detailed project roadmap and timeline" },
              { step: "03", title: "Development", description: "Building your solution with regular updates" },
              { step: "04", title: "Deployment", description: "Launching and providing ongoing support" },
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  {phase.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                <p className="text-gray-600">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss your requirements and create a custom solution for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Get Free Quote</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
