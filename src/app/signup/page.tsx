import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/logo"
import { Separator } from "@/components/ui/separator"

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background py-12">
      <Card className="mx-auto max-w-lg w-full">
        <CardHeader>
           <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">
            Enter your information to get started. This will be used to pre-fill legal forms.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="full-name">Full name</Label>
                <Input id="full-name" placeholder="John Doe" required />
              </div>
               <div className="grid gap-2">
                <Label htmlFor="phone-number">Phone Number</Label>
                <Input id="phone-number" placeholder="(555) 555-5555" required />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required/>
            </div>

            <Separator className="my-2" />

             <div className="space-y-2">
                <Label className="text-base">Legal Address</Label>
                <div className="grid gap-2">
                    <Label htmlFor="street-address" className="text-sm font-normal">Street Address</Label>
                    <Input id="street-address" placeholder="123 Main St" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-2">
                         <Label htmlFor="city" className="text-sm font-normal">City</Label>
                        <Input id="city" placeholder="Toronto" required />
                    </div>
                    <div className="grid gap-2">
                         <Label htmlFor="province" className="text-sm font-normal">Province</Label>
                        <Input id="province" placeholder="Ontario" required />
                    </div>
                     <div className="grid gap-2">
                         <Label htmlFor="postal-code" className="text-sm font-normal">Postal Code</Label>
                        <Input id="postal-code" placeholder="M5V 2H1" required />
                    </div>
                </div>
             </div>

            <Button type="submit" className="w-full mt-4" asChild>
              <Link href="/dashboard">Create an account</Link>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
