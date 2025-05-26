import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { packageId, amount, paymentMethod, customerInfo } = body

    // Validate required fields
    if (!packageId || !amount || !paymentMethod || !customerInfo) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create order with the correct column names
    const result = await sql`
      INSERT INTO orders (
        package_id, amount, payment_method, status,
        customer_name, customer_email, customer_phone, customer_company,
        customer_address, customer_city, customer_state, customer_pincode,
        created_at, updated_at
      ) VALUES (
        ${packageId}, ${amount}, ${paymentMethod}, 'pending',
        ${customerInfo.name}, ${customerInfo.email}, ${customerInfo.phone || null}, 
        ${customerInfo.company || null}, ${customerInfo.address || null},
        ${customerInfo.city || null}, ${customerInfo.state || null}, ${customerInfo.pincode || null},
        NOW(), NOW()
      ) RETURNING id, created_at
    `

    const order = result[0]

    return NextResponse.json({
      success: true,
      message: "Order created successfully",
      id: order.id,
      createdAt: order.created_at,
    })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json(
      {
        error: "Failed to create order",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
