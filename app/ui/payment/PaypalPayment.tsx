import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"

export default function PaypalPayment() {
  return (
    <div className="space-y-6">
      <div className="bg-muted/50 p-6 rounded-lg">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="bg-[#0070ba] text-white p-2 rounded-full">
            <Wallet className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold">Pay with PayPal</h3>
          <p className="text-sm text-center text-muted-foreground">
            You will be redirected to PayPal to complete your payment securely.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Button
          variant="outline"
          className="w-full h-12 flex items-center justify-center gap-2 bg-[#ffc439] hover:bg-[#f0b92d] text-[#253b80] hover:text-[#253b80] border-[#ffc439]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M17.5 7H17a2 2 0 0 0-2-2h-4.5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2H17a2 2 0 0 0 2-2v-7.5" />
            <path d="M14 2v4" />
            <path d="M12 4h4" />
            <circle cx="9" cy="9" r="1" />
            <path d="m15 9-3 3-3-3" />
          </svg>
          Connect with PayPal
        </Button>

        <div className="text-xs text-center text-muted-foreground">
          By clicking the PayPal button, you agree to the PayPal terms of service and privacy policy.
        </div>
      </div>
    </div>
  )
}
