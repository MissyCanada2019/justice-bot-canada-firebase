// src/app/(dashboard)/journey/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function JourneyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Legal Journey</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This page will display the step-by-step legal journey for your case.</p>
        <p>This feature is coming soon.</p>
        <div className="flex justify-end mt-4">
          <Link href="/payment">
            <Button>Proceed to Payment</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
