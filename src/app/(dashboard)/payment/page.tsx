// src/app/(dashboard)/payment/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Instructions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Interac e-Transfer</h2>
          <p>Please send your payment to the following email address:</p>
          <p className="font-bold text-lg text-red-500">admin@justice-bot.com</p>
          <p className="text-sm text-zinc-400">
            Please include your case reference number in the e-transfer message.
            Once we receive your payment, we will begin working on your case.
          </p>
        </div>
        <div className="border-t border-zinc-700"></div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">PayPal</h2>
          <p>You can also pay securely using PayPal.</p>
          {/* TODO: Add your PayPal link or integration here */}
          <Button className="bg-blue-600 hover:bg-blue-700">
            Pay with PayPal
          </Button>
        </div>
        <div className="flex justify-end pt-4">
          <Link href="/journey">
              <Button variant="outline">Back to Journey</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}