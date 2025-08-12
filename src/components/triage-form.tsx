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
import { Terminal, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const initialState = {
  message: null,
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        'Analyze My Issue'
      )}
    </Button>
  );
}

export function TriageForm() {
  const [state, dispatch] = useFormState(handleTriage, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (state.message && state.errors && Object.keys(state.errors).length > 0) {
        toast({
            variant: "destructive",
            title: "Error",
            description: state.message,
        });
    } else if (state.message && !state.data) {
        // This case might indicate a server-side error without field errors.
        toast({
            variant: "destructive",
            title: "Triage Failed",
            description: state.message,
        });
    }
  }, [state, toast, router]);


  return (
    <div className="space-y-8">
      <form ref={formRef} action={dispatch}>
        <Card>
          <CardHeader>
            <CardTitle>Describe Your Legal Issue</CardTitle>
            <CardDescription>
              Provide a detailed description of your situation in plain language. Our AI will analyze it to identify the area of law, key facts, and suggest a legal journey for you.
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

      {/* Results are no longer shown on this page, user is redirected */}
    </div>
  );
}
