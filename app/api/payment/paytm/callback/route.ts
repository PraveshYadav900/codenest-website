import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const paytmResponse = Object.fromEntries(formData.entries())

    const { ORDERID, TXNID, TXNAMOUNT, STATUS, RESPCODE, RESPMSG, CHECKSUMHASH } = paytmResponse

    // Verify checksum here (implement checksum verification)
    // For now, we'll proceed with status update

    let orderStatus = "failed"
    if (STATUS === "TXN_SUCCESS") {
      orderStatus = "completed"
    } else if (STATUS === "PENDING") {
      orderStatus = "pending"
    }

    // Update order status in database
    await sql`
      UPDATE orders 
      SET 
        status = ${orderStatus},
        payment_id = ${TXNID as string},
        paytm_order_id = ${ORDERID as string},
        updated_at = NOW()
      WHERE id = ${Number.parseInt(ORDERID as string)}
    `

    // Redirect based on payment status
    const redirectUrl =
      orderStatus === "completed"
        ? `/payment/success?order=${ORDERID}&txn=${TXNID}`
        : `/payment/failed?order=${ORDERID}&reason=${encodeURIComponent(RESPMSG as string)}`

    return NextResponse.redirect(new URL(redirectUrl, request.url))
  } catch (error) {
    console.error("Paytm callback error:", error)
    return NextResponse.redirect(new URL("/payment/failed", request.url))
  }
}
