'use server';

import { legalTriage, type LegalTriageOutput } from '@/ai/flows/legal-triage';
import { z } from 'zod';

const TriageFormSchema = z.object({
  issueDescription: z.string().min(20, { message: "Please describe your issue in at least 20 characters." }),
});

export type TriageFormState = {
  errors?: {
    issueDescription?: string[];
  };
  message?: string | null;
  data?: LegalTriageOutput | null;
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
  
  try {
    const result = await legalTriage({ issueDescription: validatedFields.data.issueDescription });
    
    // In a real app, you would save this to a database and create a new case.
    // Here we just return the data to the client component.
    return { message: 'Triage complete.', data: result, errors: {} };

  } catch (error) {
    console.error('Triage Error:', error);
    return { message: 'An error occurred during triage. Please try again.', data: null, errors: {}};
  }
}
