// src/lib/actions.ts
'use server';

import { legalTriage, type LegalTriageOutput } from '@/ai/flows/legal-triage';
import { generateLegalJourney, type GenerateLegalJourneyOutput } from '@/ai/flows/generate-legal-journey';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { addCase, getCaseCount } from './mock-data';

const TriageFormSchema = z.object({
  issueDescription: z.string().min(20, { message: "Please describe your issue in at least 20 characters." }),
});

export type TriageFormState = {
  errors?: {
    issueDescription?: string[];
  };
  message?: string | null;
  data?: {
    triage: LegalTriageOutput;
    journey: GenerateLegalJourneyOutput;
  } | null;
};

export async function handleTriage(prevState: TriageFormState, formData: FormData): Promise<TriageFormState> {
  const validatedFields = TriageFormSchema.safeParse({
    issueDescription: formData.get('issueDescription'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input. Please check your submission.',
    };
  }
  
  let newCaseId;

  try {
    const triageResult = await legalTriage({ issueDescription: validatedFields.data.issueDescription });
    const journeyResult = await generateLegalJourney({ triageOutput: triageResult });
    
    // In a real app, this would be an atomic database transaction
    const currentCaseCount = await getCaseCount();
    newCaseId = (currentCaseCount + 1).toString();

    addCase({
      id: newCaseId,
      title: `${triageResult.issueType} Matter`,
      status: 'Active',
      lastActivity: new Date().toISOString(),
      triageOutput: triageResult,
      journey: journeyResult,
      timeline: journeyResult.timeline,
      forms: [], // In a real app, you might generate forms too
    });

  } catch (error) {
    console.error('Triage Error:', error);
    return { message: 'An error occurred during triage. Please try again.', data: null, errors: {}};
  }

  // Redirect to the new journey page on success
  redirect(`/journey/${newCaseId}`);
}
