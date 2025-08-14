
// src/app/(dashboard)/page.tsx
import Link from 'next/link';
import { mockCases } from '@/lib/mock-data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Cases</h1>
        <Button asChild>
          <Link href="/triage">Start New Triage</Link>
        </Button>
      </div>
      {mockCases.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p>You have no active cases. Start a new triage to begin.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {mockCases.map((c) => (
            <Card key={c.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="hover:underline text-lg">
                    <Link href={`/journey/${c.id}`}>{c.title}</Link>
                  </CardTitle>
                  <Badge
                    variant={c.status === 'Active' ? 'default' : 'secondary'}
                  >
                    {c.status}
                  </Badge>
                </div>
                <CardDescription>
                  Last activity: {c.lastActivity}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {c.triageOutput.keyFacts}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
