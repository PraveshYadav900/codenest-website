import { type NextRequest, NextResponse } from "next/server"

// This would typically use the AI SDK for real chatbot functionality
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, conversationId } = body

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock AI response based on message content
    let response =
      "I understand you're interested in our services. Let me connect you with our team for more detailed information."

    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      response =
        "Our pricing varies based on project scope. Web development starts from $5,000, mobile apps from $8,000. Would you like a detailed quote?"
    } else if (lowerMessage.includes("service")) {
      response =
        "We offer web development, mobile apps, security solutions, database management, SEO, UI/UX design, and chatbot integration. Which interests you most?"
    } else if (lowerMessage.includes("contact")) {
      response =
        "You can reach us at praveshyadav@codenest.com or fill out our contact form. I can also help answer questions right here!"
    }

    return NextResponse.json({
      success: true,
      response,
      conversationId: conversationId || Date.now().toString(),
    })
  } catch (error) {
    console.error("Chatbot error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
