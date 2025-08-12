import { mockCases } from '@/lib/mock-data';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Briefcase, Home, Users, Shield, Scale, FileSearch, HeartHandshake } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const iconMap: { [key: string]: React.ReactNode } = {
  'Employment': <Briefcase className="h-5 w-5" />,
  'Landlord and Tenant': <Home className="h-5 w-5" />,
  'Family Law': <Users className="h-5 w-5" />,
  'Small Claims': <FileSearch className="h-5 w-5" />,
  'Human Rights': <HeartHandshake className="h-5 w-5" />,
  'Child Protection': <Shield className="h-5 w-5" />,
  'Other': <Scale className="h-5 w-5" />,
  'default': <Scale className="h-5 w-5" />,
};


export default function DashboardPage() {
  return (
    <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold font-headline">Case Management Dashboard</h1>
            <Button asChild>
                <Link href="/triage">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Case
                </Link>
            </Button>
        </div>

        <div className="grid gap-6">
            {mockCases.map((caseItem) => {
              const Icon = iconMap[caseItem.triageOutput.issueType] || iconMap.default;
              return (
                <Link href={`/case/${caseItem.id}`} key={caseItem.id} className="block">
                    <Card className="hover:border-primary/50 transition-colors">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-xl">{caseItem.title}</CardTitle>
                                    <CardDescription className="mt-1 flex items-center gap-2">
                                        {Icon}
                                        {caseItem.triageOutput.issueType}
                                    </CardDescription>
                                </div>
                                <Badge variant={caseItem.status === 'Active' ? 'default' : 'secondary'}>{caseItem.status}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground line-clamp-2">{caseItem.triageOutput.keyFacts}</p>
                            <p className="text-sm text-muted-foreground/80 mt-4">Last activity: {caseItem.lastActivity}</p>
                        </CardContent>
                    </Card>
                </Link>
              );
            })}
        </div>
    </div>
  );
}
