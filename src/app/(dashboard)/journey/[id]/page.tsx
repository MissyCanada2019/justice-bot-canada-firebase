// src/app/(dashboard)/journey/[id]/page.tsx
import { notFound } from 'next/navigation';
import { getCaseById } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function JourneyDetailPage({ params }: { params: { id: string } }) {
  const caseDetails = getCaseById(params.id);

  if (!caseDetails || !caseDetails.journey) {
    notFound();
  }

  const { title, triageOutput, journey } = caseDetails;
  const meritScore = journey.meritScore || 0;

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Issue Type: <Badge variant="secondary">{triageOutput.issueType}</Badge></CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold mb-2">Key Facts</h3>
          <p className="text-sm text-muted-foreground mb-4">{triageOutput.keyFacts}</p>
          <h3 className="font-semibold mb-2">AI-Generated CanLII Query</h3>
          <p className="text-sm text-muted-foreground font-mono bg-muted p-2 rounded-md">{triageOutput.canLIIQuery}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Merit Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-2xl font-bold">{meritScore}/10</span>
            <Progress value={meritScore * 10} className="w-1/2" />
          </div>
          <p className="text-sm text-muted-foreground">{journey.meritJustification}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Proposed Legal Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border -translate-x-3"></div>
            {journey.timeline.map((event, index) => (
              <div key={event.id} className="relative mb-8 pl-4">
                <div className="absolute -left-[37px] top-1.5 h-4 w-4 rounded-full bg-primary border-4 border-background"></div>
                <p className="text-sm text-muted-foreground">{event.date}</p>
                <h4 className="font-semibold">{event.title}</h4>
                <p className="text-sm text-muted-foreground">{event.description}</p>
                 <Badge variant={event.status === 'completed' ? 'default' : 'outline'} className="mt-2 capitalize">{event.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
