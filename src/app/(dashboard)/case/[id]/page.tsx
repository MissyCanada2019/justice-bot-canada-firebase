import { notFound } from 'next/navigation';
import { getCaseById } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, GitBranch, MessageSquare, Scale, Briefcase, Home, Users, Shield, ShieldCheck, HeartHandshake, FileSearch } from 'lucide-react';
import type { TimelineEvent } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

const iconMap: { [key: string]: React.ReactNode } = {
  'Employment': <Briefcase className="h-6 w-6" />,
  'Landlord and Tenant': <Home className="h-6 w-6" />,
  'Family Law': <Users className="h-6 w-6" />,
  'Small Claims': <FileSearch className="h-6 w-6" />,
  'Human Rights': <HeartHandshake className="h-6 w-6" />,
  'Child Protection': <Shield className="h-6 w-6" />,
  'Other': <Scale className="h-6 w-6" />,
  'default': <Scale className="h-6 w-6" />,
};

function TimelineItem({ event, isLast }: { event: TimelineEvent; isLast: boolean }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full mt-1 ${event.status === 'completed' ? 'bg-primary' : 'bg-muted'}`} />
        {!isLast && <div className="w-px h-full bg-border" />}
      </div>
      <div className="pb-8">
        <p className="text-sm text-muted-foreground">{event.date}</p>
        <h4 className="font-semibold">{event.title}</h4>
        <p className="text-sm">{event.description}</p>
      </div>
    </div>
  );
}

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  const caseData = getCaseById(params.id);

  if (!caseData) {
    notFound();
  }

  const IssueIcon = iconMap[caseData.triageOutput.issueType] || iconMap.default;

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">{caseData.title}</h1>
        <div className="flex items-center gap-4 mt-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            {IssueIcon}
            <span>{caseData.triageOutput.issueType}</span>
          </div>
          <Badge variant={caseData.status === 'Active' ? 'default' : 'secondary'}>{caseData.status}</Badge>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview"><Scale className="h-4 w-4 mr-2" />Overview</TabsTrigger>
          <TabsTrigger value="timeline"><GitBranch className="h-4 w-4 mr-2" />Timeline</TabsTrigger>
          <TabsTrigger value="forms"><FileText className="h-4 w-4 mr-2" />Forms</TabsTrigger>
          <TabsTrigger value="assistant"><MessageSquare className="h-4 w-4 mr-2" />Assistant</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                    <CardTitle>Case Overview</CardTitle>
                    <CardDescription>AI-generated summary of your legal issue.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <div>
                        <h3 className="font-semibold">Key Facts</h3>
                        <p className="text-muted-foreground whitespace-pre-wrap">{caseData.triageOutput.keyFacts}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Suggested CanLII Search Query</h3>
                        <p className="text-muted-foreground font-mono text-sm">{caseData.triageOutput.canLIIQuery}</p>
                    </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                            Merit Assessment
                        </CardTitle>
                        <CardDescription>AI-powered analysis of your case's potential strengths.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold">Merit Score: {caseData.journey?.meritScore}/10</h3>
                            <Progress value={caseData.journey ? caseData.journey.meritScore * 10 : 0} className="mt-2" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Justification</h3>
                            <p className="text-muted-foreground">{caseData.journey?.meritJustification}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Legal Journey</CardTitle>
              <CardDescription>A chronological, AI-generated timeline of potential events and deadlines for your case.</CardDescription>
            </CardHeader>
            <CardContent>
              {caseData.timeline.map((event, index) => (
                <TimelineItem key={event.id} event={event} isLast={index === caseData.timeline.length - 1} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="forms">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Forms</CardTitle>
              <CardDescription>Legal forms that may be relevant to your case.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {caseData.forms.map((form) => (
                <div key={form.id} className="p-4 border rounded-lg flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{form.name}</h4>
                    <p className="text-sm text-muted-foreground">{form.description}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={form.url} target="_blank" rel="noopener noreferrer">Download</a>
                  </Button>
                </div>
              ))}
                {caseData.forms.length === 0 && (
                    <p className="text-muted-foreground col-span-2">No forms have been recommended for this case type yet.</p>
                )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="assistant">
            <Card className="flex flex-col h-[60vh]">
                <CardHeader>
                    <CardTitle>Interactive Legal Assistant</CardTitle>
                    <CardDescription>Ask questions about your case. This is a mock interface.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col gap-4 overflow-y-auto p-4">
                    <div className="flex justify-end">
                        <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-xs">
                            What is the deadline for filing a T2 application?
                        </div>
                    </div>
                     <div className="flex justify-start">
                        <div className="bg-muted rounded-lg p-3 max-w-xs">
                            Based on your timeline, you filed a T2 application on July 20, 2024. Generally, a tenant has up to one year from the date the landlord...
                        </div>
                    </div>
                </CardContent>
                <div className="p-4 border-t">
                    <form className="flex gap-2">
                        <Input placeholder="Type your question here..." />
                        <Button type="submit">Send</Button>
                    </form>
                </div>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
