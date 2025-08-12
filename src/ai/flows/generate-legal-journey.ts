// This is a server-side file, mark it with 'use server'
'use server';

/**
 * @fileOverview An AI agent for generating a legal journey.
 *
 * - generateLegalJourney - A function that creates a legal timeline and assesses merit.
 * - GenerateLegalJourneyInput - The input type for the function.
 * - GenerateLegalJourneyOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { LegalTriageOutput } from './legal-triage';

export const GenerateLegalJourneyInputSchema = z.object({
  triageOutput: z.object({
    issueType: z.string(),
    keyFacts: z.string(),
    canLIIQuery: z.string(),
  }),
});
export type GenerateLegalJourneyInput = z.infer<typeof GenerateLegalJourneyInputSchema>;

const TimelineEventSchema = z.object({
  id: z.string().describe("A unique ID for the event, e.g., 't1-1'"),
  date: z.string().describe("An estimated date for the event in 'YYYY-MM-DD' format. Use relative dates based on the start date like '+7d', '+1m'."),
  title: z.string().describe("A concise title for the timeline event."),
  description: z.string().describe("A brief description of the event."),
  status: z
    .enum(['completed', 'upcoming', 'missed'])
    .describe("The status of the event. Initial steps are 'upcoming'."),
});


export const GenerateLegalJourneyOutputSchema = z.object({
  meritScore: z
    .number()
    .min(1)
    .max(10)
    .describe(
      'A score from 1-10 indicating the potential merit of the case, based on the provided facts.'
    ),
  meritJustification: z
    .string()
    .describe(
      'A brief justification for the merit score, explaining the reasoning.'
    ),
  timeline: z
    .array(TimelineEventSchema)
    .describe('A proposed timeline of legal steps for the user to take.'),
});
export type GenerateLegalJourneyOutput = z.infer<typeof GenerateLegalJourneyOutputSchema>;


export async function generateLegalJourney(
  input: GenerateLegalJourneyInput
): Promise<GenerateLegalJourneyOutput> {
  return generateLegalJourneyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLegalJourneyPrompt',
  input: {schema: GenerateLegalJourneyInputSchema},
  output: {schema: GenerateLegalJourneyOutputSchema},
  prompt: `You are an expert Canadian legal strategist. Based on the user's triaged legal issue, generate a potential legal journey.

This involves:
1.  Assessing the merit of the case on a scale of 1-10. A high score means a strong case, a low score means a weak case.
2.  Providing a brief justification for the merit score.
3.  Outlining a timeline of key steps the user might need to take. The timeline should be logical and tailored to the specific issue type. Use relative dates for future events (e.g., +7d, +1m, +30d).

The user's issue details are as follows:
- Issue Type: {{{triageOutput.issueType}}}
- Key Facts: {{{triageOutput.keyFacts}}}

Generate the merit assessment and the legal journey timeline. The first event should always be "Case Triaged" and have a completed status.`,
});

const generateLegalJourneyFlow = ai.defineFlow(
  {
    name: 'generateLegalJourneyFlow',
    inputSchema: GenerateLegalJourneyInputSchema,
    outputSchema: GenerateLegalJourneyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
