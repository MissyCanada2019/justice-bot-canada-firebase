"use client";

import { useActionState, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { handleTriage, type TriageFormState } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

const initialState: TriageFormState = {
  message: null,
  errors: {},
};

export function TriageForm() {
  const [state, dispatch, isPending] = useActionState(handleTriage, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  if (state.message && state.message.includes('Triage complete')) {
     toast({
        title: "Case Created Successfully!",
        description: "Redirecting to your dashboard...",
      });
    router.push('/dashboard');
  }

  return (
    <form ref={formRef} action={dispatch} className="space-y-4">
      <div className="grid w-full gap-1.5">
        <Label htmlFor="issueDescription">Describe your legal issue</Label>
        <Textarea
          id="issueDescription"
          name="issueDescription"
          placeholder="For example: My landlord changed the locks on my apartment without notice..."
          className="min-h-[120px]"
          required
        />
        {state.errors?.issueDescription && (
           <p className="text-sm text-destructive mt-1">
            {state.errors.issueDescription[0]}
          </p>
        )}
      </div>

       {state.message && !state.message.includes('Triage complete') &&(
        <Alert variant="destructive">
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Analyze My Case
      </Button>
    </form>
  );
}
