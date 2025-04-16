'use server';
/**
 * @fileOverview Analyzes a facial image for potential health indicators, including pimples and their location.
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

const PimpleSchema = z.object({
  location: z.string().describe('The location of the pimple on the face (e.g., forehead, chin, cheeks).'),
  severity: z.string().describe('The severity of the pimple (e.g., mild, moderate, severe).'),
  count: z.number().describe('The number of pimples in that location.'),
});

const AnalyzeHealthIndicatorsOutputSchema = z.object({
  indicators: z.array(HealthIndicatorSchema).describe('An array of potential health indicators.'),
  pimples: z.array(PimpleSchema).describe('An array of pimples detected on the face.'),
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
      pimples: z.array(PimpleSchema).describe('An array of pimples detected on the face, including their location and severity.'),
    }),
  },
  prompt: `You are an AI health assistant that analyzes facial images for potential health indicators, including pimples.\n\nAnalyze the following facial image and identify any potential health indicators, such as skin discoloration or eye puffiness. Provide a confidence score for each indicator.\n\nAlso, check for pimples on the face. For each pimple, identify its location (e.g., forehead, chin, cheeks) and severity (e.g., mild, moderate, severe). Count the number of pimples in each location.\n\nPhoto: {{media url=photoUrl}}\n\nRespond with only the JSON. Do not provide any extra explanation.`, // Ensure only JSON is returned
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
    pimples: output!.pimples,
    disclaimer: disclaimer,
  };
});
