// src/app/(dashboard)/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Cases</h1>
        <Button asChild>
          <Link href="/triage">Start New Triage</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to your Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This page is now loading correctly.</p>
          <p>We can now start adding back functionality piece by piece.</p>
        </CardContent>
      </Card>
    </div>
  );
}
