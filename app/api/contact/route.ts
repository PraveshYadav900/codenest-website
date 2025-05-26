import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, phone, service, budget, timeline, message } = body

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Store contact submission in database
    const result = await sql`
      INSERT INTO contact_submissions (
        name, email, company, phone, service, budget, timeline, message, submitted_at
      ) VALUES (
        ${name}, ${email}, ${company || null}, ${phone || null}, 
        ${service}, ${budget || null}, ${timeline || null}, ${message}, NOW()
      ) RETURNING id, submitted_at
    `

    // Here you would also typically:
    // 1. Send email notification to admin: praveshyadav@codenest.com
    // 2. Send auto-response email to user
    // 3. Integrate with CRM (HubSpot, Salesforce, etc.)
    // 4. Send Slack/Discord notification to team
    // 5. Add to project management tool (Notion, Airtable)

    console.log("Contact form submitted:", {
      id: result[0].id,
      name,
      email,
      service,
      submittedAt: result[0].submitted_at,
    })

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully! We'll get back to you within 24 hours.",
      data: {
        id: result[0].id,
        name,
        email,
        service,
        submittedAt: result[0].submitted_at,
      },
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 })
  }
}
