"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Shield, CheckCircle, ArrowLeft, Smartphone, Wallet, Building, Lock } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useSearchParams } from "next/navigation"

const paymentMethods = [
  {
    id: "paytm",
    name: "Paytm",
    icon: Wallet,
    description: "Pay securely with Paytm wallet or UPI",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: "upi",
    name: "UPI",
    icon: Smartphone,
    description: "Pay with any UPI app (GPay, PhonePe, etc.)",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, RuPay accepted",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    id: "netbanking",
    name: "Net Banking",
    icon: Building,
    description: "All major banks supported",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
]

const packages = {
  1: { name: "Starter Package", price: 25000, originalPrice: 35000 },
  2: { name: "Professional Package", price: 50000, originalPrice: 70000 },
  3: { name: "Enterprise Package", price: 100000, originalPrice: 150000 },
}

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState("paytm")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderData, setOrderData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  const { toast } = useToast()
  const searchParams = useSearchParams()

  const packageId = searchParams.get("package") || "1"
  const selectedPackage = packages[packageId as keyof typeof packages]

  const gst = Math.round(selectedPackage.price * 0.18)
  const totalAmount = selectedPackage.price + gst

  const handleInputChange = (field: string, value: string) => {
    setOrderData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePayment = async () => {
    if (!orderData.name || !orderData.email || !orderData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      // Create order in database
      const orderResponse = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: Number.parseInt(packageId),
          amount: totalAmount,
          paymentMethod: selectedPayment,
          customerInfo: orderData,
        }),
      })

      const order = await orderResponse.json()

      if (!orderResponse.ok) {
        throw new Error(order.error || "Failed to create order")
      }

      // Initialize Paytm payment
      if (selectedPayment === "paytm") {
        const paytmResponse = await fetch("/api/payment/paytm/initiate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: order.id,
            amount: totalAmount,
            customerInfo: orderData,
          }),
        })

        const paytmData = await paytmResponse.json()

        if (paytmResponse.ok) {
          // Redirect to Paytm payment page
          window.location.href = paytmData.paymentUrl
        } else {
          throw new Error(paytmData.error || "Failed to initiate payment")
        }
      } else {
        // Handle other payment methods
        toast({
          title: "Payment Method",
          description: `${selectedPayment.toUpperCase()} integration will be implemented here`,
        })
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Payment Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/packages" className="inline-flex items-center text-violet-600 hover:text-violet-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Packages
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Secure{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">Checkout</span>
          </h1>
          <p className="text-gray-600 mt-2">Complete your purchase securely</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-xl sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg">{selectedPackage.name}</h3>
                  <p className="text-gray-600 text-sm">Complete digital solution package</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Package Price</span>
                    <span>₹{selectedPackage.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{(selectedPackage.originalPrice - selectedPackage.price).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹{gst.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 mb-2">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">What's Included</span>
                  </div>
                  <ul className="text-sm text-green-600 space-y-1">
                    <li>• Complete project development</li>
                    <li>• Source code & documentation</li>
                    <li>• Free support & maintenance</li>
                    <li>• 30-day money back guarantee</li>
                  </ul>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Lock className="h-4 w-4" />
                  <span>Secured by 256-bit SSL encryption</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Customer Information */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
                <CardDescription>Please provide your details for order processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={orderData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={orderData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={orderData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+91 12345 67890"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={orderData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={orderData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Street address"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={orderData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="City"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={orderData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      placeholder="State"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input
                      id="pincode"
                      value={orderData.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      placeholder="123456"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedPayment === method.id
                          ? "border-violet-500 bg-violet-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${method.bg} rounded-lg flex items-center justify-center`}>
                          <method.icon className={`h-5 w-5 ${method.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{method.name}</h4>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            selectedPayment === method.id ? "border-violet-500 bg-violet-500" : "border-gray-300"
                          }`}
                        >
                          {selectedPayment === method.id && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-700 mb-2">
                    <Shield className="h-4 w-4" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <p className="text-sm text-blue-600">
                    Your payment information is encrypted and secure. We never store your payment details.
                  </p>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full mt-6 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3"
                  size="lg"
                >
                  {isProcessing ? (
                    "Processing..."
                  ) : (
                    <>
                      Pay ₹{totalAmount.toLocaleString()} Securely
                      <Lock className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By completing this purchase, you agree to our{" "}
                  <Link href="/terms" className="text-violet-600 hover:text-violet-700">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-violet-600 hover:text-violet-700">
                    Privacy Policy
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
