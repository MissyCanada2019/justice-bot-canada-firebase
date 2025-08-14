
// src/components/triage-form.tsx
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleTriage } from '@/lib/actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Terminal } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Analyzing...' : 'Start AI Triage'}
    </Button>
  );
}

export default function TriageForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(handleTriage, initialState);

  return (
    <form action={dispatch} className="space-y-4">
      <div>
        <Textarea
          id="issueDescription"
          name="issueDescription"
          placeholder="Describe your legal issue in detail. For example: 'My landlord gave me an eviction notice but I have always paid my rent on time...'"
          rows={8}
          className="bg-zinc-950"
          aria-describedby="issue-error"
        />
        <div id="issue-error" aria-live="polite" aria-atomic="true">
          {state.errors?.issueDescription &&
            state.errors.issueDescription.map((error: string) => (
              <p key={error} className="mt-2 text-sm text-destructive">
                {error}
              </p>
            ))}
        </div>
      </div>
       {state.message && (
         <Alert variant={state.errors ? 'destructive' : 'default'}>
            <Terminal className="h-4 w-4" />
            <AlertTitle>{state.errors ? 'Error' : 'Success'}</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
         </Alert>
       )}
      <SubmitButton />
    </form>
  );
}
