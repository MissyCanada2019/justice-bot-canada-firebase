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
      <CardContent>
        <div className="space-y-4">
          <p>To proceed with your case, please send an Interac e-Transfer to the following email address:</p>
          <p className="font-bold text-lg">admin@smartdisputecanada.com</p>
          <p>Please include your case reference number in the e-transfer message. If you do not have a case reference number, please use your full name.</p>
          <p>Once we receive your payment, we will begin working on your case.</p>
          <div className="flex justify-end">
            <Link href="/journey">
                <Button>Back to Journey</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
