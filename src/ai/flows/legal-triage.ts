'use server';

/**
 * @fileOverview A legal triage AI agent.
 *
 * - legalTriage - A function that handles the legal triage process.
 * - LegalTriageInput - The input type for the legalTriage function.
 * - LegalTriageOutput - The return type for the legalTriage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LegalTriageInputSchema = z.object({
  issueDescription: z
    .string()
    .describe('A description of the legal issue in plain language.'),
});
export type LegalTriageInput = z.infer<typeof LegalTriageInputSchema>;

const LegalTriageOutputSchema = z.object({
  issueType: z.enum([
      'Landlord and Tenant',
      'Employment',
      'Family Law',
      'Small Claims',
      'Human Rights',
      'Child Protection',
      'Other',
    ]).describe('The classification of the legal issue.'),
  keyFacts: z.string().describe('Key facts extracted from the issue description.'),
  canLIIQuery: z.string().describe('A CanLII search query for similar cases.'),
});
export type LegalTriageOutput = z.infer<typeof LegalTriageOutputSchema>;

export async function legalTriage(input: LegalTriageInput): Promise<LegalTriageOutput> {
  return legalTriageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'legalTriagePrompt',
  input: {schema: LegalTriageInputSchema},
  output: {schema: LegalTriageOutputSchema},
  prompt: `You are a legal expert specializing in Canadian law. A user will describe their legal issue.  You will classify the issue into one of the following categories: 'Landlord and Tenant', 'Employment', 'Family Law', 'Small Claims', 'Human Rights', 'Child Protection', or 'Other'. You will also extract key facts and generate a CanLII search query for similar cases.

Issue Description: {{{issueDescription}}}

Respond in JSON format.
`,
});

const legalTriageFlow = ai.defineFlow(
  {
    name: 'legalTriageFlow',
    inputSchema: LegalTriageInputSchema,
    outputSchema: LegalTriageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
