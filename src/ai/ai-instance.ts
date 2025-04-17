import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

let aiInstance: ReturnType<typeof genkit> | null = null;

function getAiInstance() {
  if (!aiInstance) {
    if (!process.env.GOOGLE_GENAI_API_KEY) {
      console.error(
        'GOOGLE_GENAI_API_KEY is not defined. Please configure it in your .env file.'
      );
      throw new Error(
        'GOOGLE_GENAI_API_KEY is not defined. Please configure it in your .env file.'
      );
    }

    aiInstance = genkit({
      promptDir: './prompts',
      plugins: [
        googleAI({
          // Gemini API key
          apiKey: process.env.GOOGLE_GENAI_API_KEY,
        }),
      ],
      model: 'googleai/gemini-2.0-flash',
    });
  }
  return aiInstance;
}

export const ai = {
  ...{
    definePrompt: (...args: Parameters<typeof genkit>) => getAiInstance().definePrompt(...args),
    defineFlow: (...args: Parameters<typeof genkit>) => getAiInstance().defineFlow(...args),
    defineTool: (...args: Parameters<typeof genkit>) => getAiInstance().defineTool(...args),
    defineSchema: (...args: Parameters<typeof genkit>) => getAiInstance().defineSchema(...args),
    registerModel: (...args: Parameters<typeof genkit>) => getAiInstance().registerModel(...args),
  }
};
