"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, ArrowRight, Sparkles, Crown, Rocket, Shield, Zap, Users, Clock, Phone } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const packages = [
  {
    id: 1,
    name: "Starter Package",
    description: "Perfect for small businesses and startups",
    price: 25000,
    originalPrice: 35000,
    duration: "3 months",
    icon: Rocket,
    gradient: "from-green-500 to-emerald-500",
    popular: false,
    features: [
      "Responsive Website (5 pages)",
      "Modern UI/UX Design",
      "Contact Form Integration",
      "Basic SEO Optimization",
      "Mobile Responsive",
      "3 Months Support",
      "Free Domain Setup",
      "SSL Certificate",
    ],
    includes: ["Source Code", "Documentation", "Training Session"],
  },
  {
    id: 2,
    name: "Professional Package",
    description: "Ideal for growing businesses",
    price: 50000,
    originalPrice: 70000,
    duration: "6 months",
    icon: Crown,
    gradient: "from-violet-500 to-purple-500",
    popular: true,
    features: [
      "Advanced Website (10 pages)",
      "E-commerce Integration",
      "Payment Gateway Setup",
      "Advanced SEO & Analytics",
      "Mobile App (Basic)",
      "Admin Dashboard",
      "6 Months Support",
      "Free Hosting (1 year)",
      "Social Media Integration",
      "Email Marketing Setup",
    ],
    includes: ["Everything in Starter", "Mobile App", "Admin Panel", "Marketing Tools"],
  },
  {
    id: 3,
    name: "Enterprise Package",
    description: "Complete solution for large businesses",
    price: 100000,
    originalPrice: 150000,
    duration: "12 months",
    icon: Shield,
    gradient: "from-blue-500 to-cyan-500",
    popular: false,
    features: [
      "Custom Web Application",
      "Mobile Apps (iOS & Android)",
      "Advanced Admin Dashboard",
      "API Development",
      "Security Audit",
      "AI Chatbot Integration",
      "Database Optimization",
      "12 Months Support",
      "Priority Support",
      "Custom Integrations",
      "Performance Monitoring",
      "Backup & Recovery",
    ],
    includes: [
      "Everything in Professional",
      "Native Mobile Apps",
      "AI Integration",
      "Custom Development",
      "Priority Support",
    ],
  },
]

const addOns = [
  {
    name: "AI Chatbot",
    price: 15000,
    description: "Smart customer support automation",
  },
  {
    name: "Advanced Analytics",
    price: 8000,
    description: "Detailed insights and reporting",
  },
  {
    name: "Social Media Management",
    price: 12000,
    description: "Complete social media automation",
  },
  {
    name: "Extra Mobile App",
    price: 25000,
    description: "Additional mobile application",
  },
]

export default function PackagesPage() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null)
  const { toast } = useToast()

  const handleSelectPackage = (packageId: number) => {
    setSelectedPackage(packageId)
    toast({
      title: "Package Selected!",
      description: "Proceed to checkout to complete your purchase.",
    })
  }

  const handleProceedToPayment = (pkg: any) => {
    // This would redirect to payment page with package details
    window.location.href = `/checkout?package=${pkg.id}&price=${pkg.price}`
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-violet-50 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-violet-100 to-blue-100 text-violet-700">
            <Sparkles className="h-3 w-3 mr-1" />
            Premium Packages
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your business with our comprehensive packages designed for every stage of growth
          </p>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              30-day money back guarantee
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-500" />
              Secure payment processing
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              24/7 expert support
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  pkg.popular ? "ring-2 ring-violet-500 scale-105" : ""
                } ${selectedPackage === pkg.id ? "ring-2 ring-blue-500" : ""}`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-violet-500 to-purple-500 text-white text-center py-2 text-sm font-medium">
                    <Star className="inline h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                )}

                <CardHeader className={`text-center ${pkg.popular ? "pt-12" : "pt-8"}`}>
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${pkg.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  >
                    <pkg.icon className="h-10 w-10 text-white" />
                  </div>

                  <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                  <CardDescription className="text-gray-600 mb-4">{pkg.description}</CardDescription>

                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl font-bold text-gray-900">₹{pkg.price.toLocaleString()}</span>
                      <span className="text-lg text-gray-500 line-through">₹{pkg.originalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {pkg.duration} project timeline
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Save ₹{(pkg.originalPrice - pkg.price).toLocaleString()}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-900">What's Included:</h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-gray-900">Package Includes:</h4>
                    <div className="flex flex-wrap gap-2">
                      {pkg.includes.map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Button
                      onClick={() => handleProceedToPayment(pkg)}
                      className={`w-full ${
                        pkg.popular
                          ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                          : "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black"
                      } text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      Get Started Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <Button variant="outline" className="w-full border-2" asChild>
                      <Link href="/contact">
                        <Phone className="mr-2 h-4 w-4" />
                        Discuss Requirements
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Enhance Your{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                Package
              </span>
            </h2>
            <p className="text-xl text-gray-600">Add powerful features to supercharge your solution</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{addon.name}</CardTitle>
                  <div className="text-2xl font-bold text-violet-600">₹{addon.price.toLocaleString()}</div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 mb-4">{addon.description}</CardDescription>
                  <Button variant="outline" className="w-full">
                    Add to Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept all major payment methods including Paytm, UPI, credit/debit cards, and bank transfers.",
              },
              {
                question: "Can I upgrade my package later?",
                answer:
                  "Yes! You can upgrade your package at any time. We'll adjust the pricing based on your current plan.",
              },
              {
                question: "Do you provide ongoing support?",
                answer:
                  "All packages include dedicated support for the specified duration, plus optional extended support plans.",
              },
              {
                question: "What if I'm not satisfied?",
                answer: "We offer a 30-day money-back guarantee if you're not completely satisfied with our service.",
              },
            ].map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{faq.answer}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-violet-100 mb-8">
            Join hundreds of satisfied clients who have revolutionized their digital presence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Get Free Consultation</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-violet-600"
              asChild
            >
              <Link href="/portfolio">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
