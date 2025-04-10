// The AI agent suggests optimal pricing for service providers based on job details and market trends.
//
// - suggestOptimalPrice - A function that handles the pricing suggestion process.
// - SuggestOptimalPriceInput - The input type for the suggestOptimalPrice function.
// - SuggestOptimalPriceOutput - The return type for the suggestOptimalPrice function.

'use server';

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SuggestOptimalPriceInputSchema = z.object({
  serviceType: z.string().describe('The type of service being offered (e.g., plumbing, carpentry).'),
  jobDescription: z.string().optional().describe('A detailed description of the job request.'),
  location: z.string().describe('The location where the service is to be performed.'),
  preferredDate: z.string().describe('The preferred date for the service (e.g., 5 Dec, 24).'),
  historicalQuoteData: z.string().optional().describe('Historical quote data to determine competitive pricing'),
});

export type SuggestOptimalPriceInput = z.infer<typeof SuggestOptimalPriceInputSchema>;

const SuggestOptimalPriceOutputSchema = z.object({
  suggestedPrice: z.number().describe('The suggested price for the service.'),
  reasoning: z.string().describe('The reasoning behind the suggested price.'),
});

export type SuggestOptimalPriceOutput = z.infer<typeof SuggestOptimalPriceOutputSchema>;

export async function suggestOptimalPrice(input: SuggestOptimalPriceInput): Promise<SuggestOptimalPriceOutput> {
  return suggestOptimalPriceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOptimalPricePrompt',
  input: {
    schema: z.object({
      serviceType: z.string().describe('The type of service being offered (e.g., plumbing, carpentry).'),
      jobDescription: z.string().optional().describe('A detailed description of the job request.'),
      location: z.string().describe('The location where the service is to be performed.'),
      preferredDate: z.string().describe('The preferred date for the service (e.g., 5 Dec, 24).'),
      historicalQuoteData: z.string().optional().describe('Historical quote data to determine competitive pricing'),
    }),
  },
  output: {
    schema: z.object({
      suggestedPrice: z.number().describe('The suggested price for the service.'),
      reasoning: z.string().describe('The reasoning behind the suggested price.'),
    }),
  },
  prompt: `You are an expert pricing strategist for service providers. Based on the job details, location, and market trends, suggest an optimal price for the service.

Service Type: {{{serviceType}}}
Job Description: {{{jobDescription}}}
Location: {{{location}}}
Preferred Date: {{{preferredDate}}}
Historical Quote Data: {{{historicalQuoteData}}}

Consider these factors when determining the price:
- The type of service being requested.
- The location of the service.
- The preferred date of the service.
- Any additional details provided in the job description.
- Historical quote data for similar jobs in the area.

Provide a suggested price and a brief explanation of your reasoning.
`,
});

const suggestOptimalPriceFlow = ai.defineFlow<
  typeof SuggestOptimalPriceInputSchema,
  typeof SuggestOptimalPriceOutputSchema
>(
  {
    name: 'suggestOptimalPriceFlow',
    inputSchema: SuggestOptimalPriceInputSchema,
    outputSchema: SuggestOptimalPriceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
