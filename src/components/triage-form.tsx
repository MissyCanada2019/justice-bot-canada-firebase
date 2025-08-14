// src/components/triage-form.tsx
'use client';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function TriageForm() {
  return (
    <form className="space-y-4">
      <div>
        <Textarea
          id="issueDescription"
          name="issueDescription"
          placeholder="Describe your legal issue in detail. For example: 'My landlord gave me an eviction notice but I have always paid my rent on time...'"
          rows={8}
          className="bg-zinc-950"
        />
      </div>
      <Button type="submit">
        Start AI Triage
      </Button>
    </form>
  );
}
