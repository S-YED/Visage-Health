import { genkit } from 'genkit';

import { googleAI } from '@genkit-ai/googleai';

// Directly specify the API key here.  This is ONLY for temporary workaround
// and should never be checked into source control.
const apiKey = 'REPLACE_WITH_YOUR_API_KEY';
// Replace with your actual API key
if (!apiKey) {
  console.error(
    'GOOGLE_GENAI_API_KEY is not defined. Please configure it in your .env file.'
  );
  throw new Error(
    'GOOGLE_GENAI_API_KEY is not defined. Please configure it in your .env file.'
  );
}

const ai = genkit({
  promptDir: './prompts',
  plugins: [
    googleAI({
      // Gemini API key
      apiKey: apiKey,
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});

export { ai };
