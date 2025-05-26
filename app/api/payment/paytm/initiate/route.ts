import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// Paytm Configuration - Replace with your actual credentials
const PAYTM_CONFIG = {
  MID: "YOUR_MERCHANT_ID", // Replace with your Paytm Merchant ID
  MERCHANT_KEY: "YOUR_MERCHANT_KEY", // Replace with your Paytm Merchant Key
  WEBSITE: "WEBSTAGING", // Use "DEFAULT" for production
  INDUSTRY_TYPE_ID: "Retail",
  CHANNEL_ID: "WEB",
  CALLBACK_URL: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/paytm/callback`,
}

function generateChecksum(params: any, merchantKey: string): string {
  const sortedKeys = Object.keys(params).sort()
  let queryString = ""

  sortedKeys.forEach((key) => {
    if (params[key] !== null && params[key] !== undefined && params[key] !== "") {
      queryString += `${key}=${params[key]}&`
    }
  })

  queryString = queryString.slice(0, -1) // Remove last &

  const hash = crypto.createHmac("sha256", merchantKey).update(queryString).digest("hex")

  return hash
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, amount, customerInfo } = body

    // Generate unique transaction ID
    const txnId = `TXN_${orderId}_${Date.now()}`

    // Prepare Paytm parameters
    const paytmParams = {
      MID: PAYTM_CONFIG.MID,
      WEBSITE: PAYTM_CONFIG.WEBSITE,
      INDUSTRY_TYPE_ID: PAYTM_CONFIG.INDUSTRY_TYPE_ID,
      CHANNEL_ID: PAYTM_CONFIG.CHANNEL_ID,
      ORDER_ID: orderId.toString(),
      TXN_AMOUNT: amount.toString(),
      CUST_ID: customerInfo.email,
      EMAIL: customerInfo.email,
      MOBILE_NO: customerInfo.phone,
      CALLBACK_URL: PAYTM_CONFIG.CALLBACK_URL,
    }

    // Generate checksum
    const checksum = generateChecksum(paytmParams, PAYTM_CONFIG.MERCHANT_KEY)

    // Create payment form HTML
    const paymentForm = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Processing Payment...</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            height: 100vh; 
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          .container { 
            text-align: center; 
            background: white; 
            padding: 2rem; 
            border-radius: 10px; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          }
          .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="spinner"></div>
          <h2>Redirecting to Paytm...</h2>
          <p>Please wait while we redirect you to the payment gateway.</p>
          <form id="paytmForm" method="post" action="https://securegw-stage.paytm.in/order/process">
            ${Object.entries(paytmParams)
              .map(([key, value]) => `<input type="hidden" name="${key}" value="${value}">`)
              .join("")}
            <input type="hidden" name="CHECKSUMHASH" value="${checksum}">
          </form>
        </div>
        <script>
          setTimeout(() => {
            document.getElementById('paytmForm').submit();
          }, 2000);
        </script>
      </body>
      </html>
    `

    return new NextResponse(paymentForm, {
      headers: { "Content-Type": "text/html" },
    })
  } catch (error) {
    console.error("Paytm initiation error:", error)
    return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 })
  }
}
