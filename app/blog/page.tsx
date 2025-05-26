import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, User, Search, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt:
      "Explore the latest trends shaping the web development landscape, from AI integration to progressive web apps.",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Web Development",
    image: "/placeholderb1.jpg?height=300&width=500",
    featured: true,
  },
  {
    id: 2,
    title: "Building Secure Applications: A Developer's Guide",
    excerpt: "Learn essential security practices to protect your applications from common vulnerabilities and threats.",
    author: "Michael Chen",
    date: "2024-01-12",
    readTime: "12 min read",
    category: "Security",
    image: "/placeholderb3.jpg?height=300&width=500",
  },
  {
    id: 3,
    title: "Database Optimization Techniques for Better Performance",
    excerpt: "Discover proven strategies to optimize your database queries and improve application performance.",
    author: "Emily Rodriguez",
    date: "2024-01-10",
    readTime: "10 min read",
    category: "Database",
    image: "/placeholderb4.jpg?height=300&width=500",
  },
  {
    id: 4,
    title: "AI-Powered Chatbots: Revolutionizing Customer Support",
    excerpt: "How artificial intelligence is transforming customer service through intelligent chatbot solutions.",
    author: "David Kim",
    date: "2024-01-08",
    readTime: "6 min read",
    category: "AI & Chatbots",
    image: "/placeholderb5.jpg?height=300&width=500",
  },
  {
    id: 5,
    title: "Mobile-First Design: Creating Responsive User Experiences",
    excerpt: "Best practices for designing mobile-first applications that work seamlessly across all devices.",
    author: "Lisa Wang",
    date: "2024-01-05",
    readTime: "9 min read",
    category: "UI/UX Design",
    image: "/placeholderb6.jpg?height=300&width=500",
  },
  {
    id: 6,
    title: "SEO Strategies That Actually Work in 2024",
    excerpt: "Proven SEO techniques to improve your website's search engine rankings and drive organic traffic.",
    author: "Alex Thompson",
    date: "2024-01-03",
    readTime: "11 min read",
    category: "SEO",
    image: "/placeholderb7.jpg?height=300&width=500",
  },
]

const categories = ["All", "Web Development", "Security", "Database", "AI & Chatbots", "UI/UX Design", "SEO"]

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            Tech Blog
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Insights & Updates from CodeNest</h1>
          <p className="text-xl text-gray-600 mb-8">
            Stay updated with the latest trends, best practices, and insights from the world of technology and
            development.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search articles..." className="pl-10 pr-4 py-3" />
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Article</h2>
            </div>

            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-blue-600">Featured</Badge>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge variant="outline" className="w-fit mb-4">
                    {featuredPost.category}
                  </Badge>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                  <p className="text-gray-600 mb-6 text-lg">{featuredPost.excerpt}</p>

                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>

                  <Button size="lg" asChild>
                    <Link href={`/blog/${featuredPost.id}`}>
                      Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

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

      {/* Blog Posts Grid */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <p className="text-gray-600">Discover insights, tutorials, and industry updates</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge variant="secondary" className="absolute top-4 left-4">
                    {post.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl line-clamp-2 group-hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/blog/${post.id}`}>
                        Read More <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stay Updated with Our Newsletter</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest articles, tutorials, and industry insights delivered to your inbox.
          </p>

          <div className="max-w-md mx-auto flex gap-4">
            <Input
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button variant="secondary">Subscribe</Button>
          </div>

          <p className="text-sm text-blue-100 mt-4">No spam, unsubscribe at any time.</p>
        </div>
      </section>
    </div>
  )
}
