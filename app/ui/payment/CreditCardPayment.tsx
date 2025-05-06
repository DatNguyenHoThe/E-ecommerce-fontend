"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export default function CreditCardPayment() {
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [cvv, setCvv] = useState("")

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setCardNumber(formatted)
  }

  // Generate month options
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1
    return (
      <SelectItem key={month} value={month.toString().padStart(2, "0")}>
        {month.toString().padStart(2, "0")}
      </SelectItem>
    )
  })

  // Generate year options (current year + 10 years)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 11 }, (_, i) => {
    const year = currentYear + i
    return (
      <SelectItem key={year} value={year.toString()}>
        {year}
      </SelectItem>
    )
  })

  return (
    <div className="space-y-6">
      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-semibold">Credit Card</div>
            <CreditCard className="h-6 w-6" />
          </div>
          <div className="h-10 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-md mb-4">
          <div className="text-2xl text-gray-700 font-mono h-full flex items-center">{cardNumber || "•••• •••• •••• ••••"}</div>
          </div>
          <div className="flex justify-between mt-4">
            <div className="text-xs">
              <div className="text-muted-foreground">Card Holder</div>
              <div>{cardName || "YOUR NAME"}</div>
            </div>
            <div className="text-xs">
              <div className="text-muted-foreground">Expires</div>
              <div>
                {expiryMonth || "MM"}/{expiryYear?.substring(2) || "YY"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength={19}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="cardName">Cardholder Name</Label>
          <Input id="cardName" placeholder="John Doe" value={cardName} onChange={(e) => setCardName(e.target.value)} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="expiryMonth">Month</Label>
            <Select value={expiryMonth} onValueChange={setExpiryMonth}>
              <SelectTrigger id="expiryMonth">
                <SelectValue placeholder="MM" />
              </SelectTrigger>
              <SelectContent>{months}</SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="expiryYear">Year</Label>
            <Select value={expiryYear} onValueChange={setExpiryYear}>
              <SelectTrigger id="expiryYear">
                <SelectValue placeholder="YYYY" />
              </SelectTrigger>
              <SelectContent>{years}</SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
              maxLength={4}
              type="password"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
