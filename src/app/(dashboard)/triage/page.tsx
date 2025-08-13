import { TriageForm } from '@/components/triage-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TriagePage() {
  return (
    <div className="container mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">AI-Powered Legal Triage</CardTitle>
          <CardDescription>
            Describe your legal issue in plain language. Our AI will classify it, extract the key facts, and suggest next steps.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TriageForm />
        </CardContent>
      </Card>
    </div>
  );
}
