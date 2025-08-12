import { TriageForm } from '@/components/triage-form';

export default function TriagePage() {
  return (
    <div className="container mx-auto max-w-4xl">
       <div className="space-y-1 mb-8">
          <h1 className="text-3xl font-bold font-headline">New Case Triage</h1>
          <p className="text-muted-foreground">Let our AI assistant help you understand your legal situation.</p>
        </div>
      <TriageForm />
    </div>
  );
}
