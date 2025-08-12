// This is a server-side file, mark it with 'use server'
'use server';

/**
 * @fileOverview A CanLII search AI agent.
 *
 * - canliiSearch - A function that handles the CanLII search process.
 * - CanLIISearchInput - The input type for the canliiSearch function.
 * - CanLIISearchOutput - The return type for the canliiSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CanLIISearchInputSchema = z.object({
  legalIssue: z.string().describe('The legal issue to search for.'),
  keyFacts: z.string().describe('The key facts of the case.'),
});
export type CanLIISearchInput = z.infer<typeof CanLIISearchInputSchema>;

const CanLIISearchOutputSchema = z.object({
  searchResults: z.array(z.string()).describe('The search results from CanLII.'),
});
export type CanLIISearchOutput = z.infer<typeof CanLIISearchOutputSchema>;

export async function canliiSearch(input: CanLIISearchInput): Promise<CanLIISearchOutput> {
  return canliiSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'canliiSearchPrompt',
  input: {schema: CanLIISearchInputSchema},
  output: {schema: CanLIISearchOutputSchema},
  prompt: `You are a legal expert specializing in Canadian law.

You will search CanLII for cases similar to the one described below, and return a list of relevant case titles.

Legal Issue: {{{legalIssue}}}
Key Facts: {{{keyFacts}}}

Return the search results as a list of case titles.`,
});

const canliiSearchFlow = ai.defineFlow(
  {
    name: 'canliiSearchFlow',
    inputSchema: CanLIISearchInputSchema,
    outputSchema: CanLIISearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
