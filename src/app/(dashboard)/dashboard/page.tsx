import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, ExternalLink } from "lucide-react";
import { mockCases } from "@/lib/mock-data";

export default function DashboardPage() {
  const activeCases = mockCases.filter(c => c.status === 'Active');

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline">Case Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here are your active cases.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/triage">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Case
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activeCases.map((caseItem) => (
          <Card key={caseItem.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">{caseItem.title}</CardTitle>
              <CardDescription>Last activity: {caseItem.lastActivity}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center gap-2">
                <Badge variant={caseItem.status === 'Active' ? 'default' : 'secondary'}>{caseItem.status}</Badge>
                <p className="text-sm text-muted-foreground">{caseItem.triageOutput.issueType}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/dashboard/case/${caseItem.id}`}>
                  View Details <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
         <Card className="flex flex-col items-center justify-center border-dashed border-2 text-center p-6">
            <CardHeader>
                <CardTitle className="text-lg">Start a New Case</CardTitle>
                <CardDescription>Get an AI-powered analysis of your legal issue.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Button asChild>
                    <Link href="/dashboard/triage">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Start Triage
                    </Link>
                </Button>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
