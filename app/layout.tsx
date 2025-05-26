import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"

const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "CodeNest - Premium Tech Solutions & Digital Innovation",
  description:
    "Transform your business with CodeNest's cutting-edge web development, mobile apps, AI integration, and digital solutions. Premium quality, innovative design.",
  keywords:
    "web development, mobile apps, AI integration, digital transformation, premium tech solutions, custom software",
  authors: [{ name: "CodeNest Team" }],
  openGraph: {
    title: "CodeNest - Premium Tech Solutions",
    description: "Transform your business with our premium tech solutions",
    url: "https://codenest.com",
    siteName: "CodeNest",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CodeNest - Premium Tech Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body className={`${inter.className} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Chatbot />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
