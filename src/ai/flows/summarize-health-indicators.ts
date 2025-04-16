// @ts-nocheck
'use server';
/**
 * @fileOverview Summarizes potential health indicators flagged by the AI.
 *
 * - summarizeHealthIndicators - A function that summarizes the health indicators.
 * - SummarizeHealthIndicatorsInput - The input type for the summarizeHealthIndicators function.
 * - SummarizeHealthIndicatorsOutput - The return type for the summarizeHealthIndicators function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizeHealthIndicatorsInputSchema = z.object({
  facialScanResult: z.string().describe('The AI analysis result of the facial scan, including potential health indicators.'),
});
export type SummarizeHealthIndicatorsInput = z.infer<typeof SummarizeHealthIndicatorsInputSchema>;

const SummarizeHealthIndicatorsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the potential health indicators flagged by the AI.'),
});
export type SummarizeHealthIndicatorsOutput = z.infer<typeof SummarizeHealthIndicatorsOutputSchema>;

export async function summarizeHealthIndicators(input: SummarizeHealthIndicatorsInput): Promise<SummarizeHealthIndicatorsOutput> {
  return summarizeHealthIndicatorsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeHealthIndicatorsPrompt',
  input: {
    schema: z.object({
      facialScanResult: z.string().describe('The AI analysis result of the facial scan, including potential health indicators.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A concise summary of the potential health indicators flagged by the AI.'),
    }),
  },
  prompt: `You are a health analysis assistant. Please summarize the following potential health indicators flagged by the AI in a clear and understandable format. Make sure to emphasize that this analysis is not a substitute for professional medical advice, and users should consult with a healthcare provider for accurate diagnoses.\n\nFacial Scan Result: {{{facialScanResult}}}`,
});

const summarizeHealthIndicatorsFlow = ai.defineFlow<
  typeof SummarizeHealthIndicatorsInputSchema,
  typeof SummarizeHealthIndicatorsOutputSchema
>(
  {
    name: 'summarizeHealthIndicatorsFlow',
    inputSchema: SummarizeHealthIndicatorsInputSchema,
    outputSchema: SummarizeHealthIndicatorsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
