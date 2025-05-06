import { Truck, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function CodPayment() {
  return (
    <div className="space-y-6">
      <div className="bg-muted/50 p-6 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="bg-green-100 text-green-700 p-2 rounded-full">
            <Truck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Cash on Delivery</h3>
            <p className="text-sm text-muted-foreground">Pay with cash when your order is delivered.</p>
          </div>
        </div>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Delivery Information</AlertTitle>
        <AlertDescription>Please provide accurate delivery information to ensure smooth delivery.</AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" placeholder="John Doe" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input id="phoneNumber" placeholder="+1 (555) 123-4567" type="tel" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="address">Delivery Address</Label>
          <Textarea
            id="address"
            placeholder="Enter your full address including street, city, state, and zip code"
            rows={3}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="deliveryNotes">Delivery Notes (Optional)</Label>
          <Textarea id="deliveryNotes" placeholder="Any special instructions for delivery" rows={2} />
        </div>
      </div>
    </div>
  )
}