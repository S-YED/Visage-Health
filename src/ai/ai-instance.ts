import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

let aiInstance: ReturnType<typeof genkit> | null = null;

// Directly specify the API key here.  This is ONLY for temporary workaround
// and should never be checked into source control.
const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

function getAiInstance() {
  if (!aiInstance) {
    if (!apiKey) {
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
          apiKey: apiKey,
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
