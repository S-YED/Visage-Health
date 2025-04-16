'use server';
/**
 * @fileOverview Analyzes a facial image for potential health indicators.
 *
 * - analyzeHealthIndicators - A function that analyzes the facial image for potential health indicators.
 * - AnalyzeHealthIndicatorsInput - The input type for the analyzeHealthIndicators function.
 * - AnalyzeHealthIndicatorsOutput - The return type for the analyzeHealthIndicators function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnalyzeHealthIndicatorsInputSchema = z.object({
  photoUrl: z.string().describe('The URL of the facial photo.'),
});
export type AnalyzeHealthIndicatorsInput = z.infer<typeof AnalyzeHealthIndicatorsInputSchema>;

const HealthIndicatorSchema = z.object({
  indicator: z.string().describe('The name of the health indicator.'),
  description: z.string().describe('A description of what it means.'),
  confidence: z.number().min(0).max(1).describe('A confidence score between 0 and 1.'),
});

const AnalyzeHealthIndicatorsOutputSchema = z.object({
  indicators: z.array(HealthIndicatorSchema).describe('An array of potential health indicators.'),
  disclaimer: z.string().describe('A disclaimer stating that the app\'s analysis is not a substitute for professional medical advice.'),
});

export type AnalyzeHealthIndicatorsOutput = z.infer<typeof AnalyzeHealthIndicatorsOutputSchema>;

export async function analyzeHealthIndicators(input: AnalyzeHealthIndicatorsInput): Promise<AnalyzeHealthIndicatorsOutput> {
  return analyzeHealthIndicatorsFlow(input);
}

const analyzeHealthIndicatorsPrompt = ai.definePrompt({
  name: 'analyzeHealthIndicatorsPrompt',
  input: {
    schema: z.object({
      photoUrl: z.string().describe('The URL of the facial photo.'),
    }),
  },
  output: {
    schema: z.object({
      indicators: z.array(HealthIndicatorSchema).describe('An array of potential health indicators.'),
    }),
  },
  prompt: `You are an AI health assistant that analyzes facial images for potential health indicators.\n\nAnalyze the following facial image and identify any potential health indicators, such as skin discoloration or eye puffiness. Provide a confidence score for each indicator.\n\nPhoto: {{media url=photoUrl}}\n\nRespond with only the JSON. Do not provide any extra explanation.`, // Ensure only JSON is returned
});

const analyzeHealthIndicatorsFlow = ai.defineFlow<
  typeof AnalyzeHealthIndicatorsInputSchema,
  typeof AnalyzeHealthIndicatorsOutputSchema
>({
  name: 'analyzeHealthIndicatorsFlow',
  inputSchema: AnalyzeHealthIndicatorsInputSchema,
  outputSchema: AnalyzeHealthIndicatorsOutputSchema,
},
async input => {
  const {output} = await analyzeHealthIndicatorsPrompt(input);

  const disclaimer = 'This analysis is not a substitute for professional medical advice. Consult with a healthcare provider for accurate diagnoses.';

  return {
    indicators: output!.indicators,
    disclaimer: disclaimer,
  };
});
