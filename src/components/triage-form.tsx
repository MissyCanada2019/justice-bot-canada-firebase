'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { handleTriage } from '@/lib/actions';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Terminal } from 'lucide-react';

const initialState = {
  message: null,
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Analyzing...' : 'Analyze My Issue'}
    </Button>
  );
}

export function TriageForm() {
  const [state, dispatch] = useFormState(handleTriage, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.errors) {
        toast({
            title: "Analysis Complete",
            description: "Your legal issue has been triaged successfully.",
        });
        if (!state.data) {
          formRef.current?.reset();
        }
    } else if (state.message && state.errors) {
        toast({
            variant: "destructive",
            title: "Error",
            description: state.message,
        });
    }
  }, [state, toast]);


  return (
    <div className="space-y-8">
      <form ref={formRef} action={dispatch}>
        <Card>
          <CardHeader>
            <CardTitle>Describe Your Legal Issue</CardTitle>
            <CardDescription>
              Provide a detailed description of your situation in plain language. Our AI will analyze it to identify the area of law, key facts, and suggest next steps.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="issue-description" className="sr-only">Issue Description</Label>
              <Textarea
                id="issue-description"
                name="issueDescription"
                placeholder="For example: 'My landlord gave me an eviction notice, but I believe it's unfair because...'"
                className="min-h-[200px] text-base"
                required
                aria-describedby="description-error"
              />
              {state.errors?.issueDescription && (
                <p id="description-error" className="text-sm text-destructive">
                  {state.errors.issueDescription[0]}
                </p>
              )}
            </div>
            <SubmitButton />
          </CardContent>
        </Card>
      </form>

      {state.data && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Triage Results</AlertTitle>
          <AlertDescription className="space-y-4 mt-2">
            <div className="p-4 rounded-md bg-muted/50">
                <h4 className="font-semibold">Legal Issue Type</h4>
                <p>{state.data.issueType}</p>
            </div>
             <div className="p-4 rounded-md bg-muted/50">
                <h4 className="font-semibold">Extracted Key Facts</h4>
                <p className="whitespace-pre-wrap">{state.data.keyFacts}</p>
            </div>
             <div className="p-4 rounded-md bg-muted/50">
                <h4 className="font-semibold">Suggested CanLII Search Query</h4>
                <p className="font-mono text-sm">{state.data.canLIIQuery}</p>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
