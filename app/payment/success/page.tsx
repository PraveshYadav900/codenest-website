"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, ArrowRight, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function PaymentSuccessPage() {
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const searchParams = useSearchParams()
  const orderId = searchParams.get("order")
  const txnId = searchParams.get("txn")

  useEffect(() => {
    // Fetch order details
    if (orderId) {
      // This would fetch actual order details from your API
      setOrderDetails({
        id: orderId,
        txnId: txnId,
        amount: "₹50,000",
        package: "Professional Package",
        date: new Date().toLocaleDateString(),
      })
    }
  }, [orderId, txnId])

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Payment{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Successful!
            </span>
          </h1>
          <p className="text-xl text-gray-600">Thank you for choosing CodeNest. Your order has been confirmed.</p>
        </div>

        <Card className="border-0 shadow-xl mb-8">
          <CardHeader className="text-center">
            <Badge variant="secondary" className="w-fit mx-auto mb-2 bg-green-100 text-green-700">
              Order Confirmed
            </Badge>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Your payment has been processed successfully</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {orderDetails && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Order ID</h4>
                  <p className="text-gray-600">{orderDetails.id}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Transaction ID</h4>
                  <p className="text-gray-600">{orderDetails.txnId}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Package</h4>
                  <p className="text-gray-600">{orderDetails.package}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Amount Paid</h4>
                  <p className="text-gray-600">{orderDetails.amount}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Payment Date</h4>
                  <p className="text-gray-600">{orderDetails.date}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Status</h4>
                  <Badge className="bg-green-100 text-green-700">Confirmed</Badge>
                </div>
              </div>
            )}

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• You'll receive a confirmation email within 5 minutes</li>
                <li>• Our team will contact you within 24 hours</li>
                <li>• Project kickoff meeting will be scheduled</li>
                <li>• Development will begin as per timeline</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1" asChild>
                <Link href="/dashboard">
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice
                </Link>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Need immediate assistance?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-violet-600" />
                  <span>+91 7495044277</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-violet-600" />
                  <span>praveshyadav@codenest.com</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Button size="lg" asChild>
            <Link href="/">
              Back to Home <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
