// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview Generates campaign title suggestions based on campaign details.
 *
 * - generateCampaignTitleSuggestions - A function that generates campaign title suggestions.
 * - GenerateCampaignTitleSuggestionsInput - The input type for the generateCampaignTitleSuggestions function.
 * - GenerateCampaignTitleSuggestionsOutput - The return type for the generateCampaignTitleSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCampaignTitleSuggestionsInputSchema = z.object({
  campaignDetails: z
    .string()
    .describe('Details of the campaign, including its purpose and goals.'),
});
export type GenerateCampaignTitleSuggestionsInput = z.infer<
  typeof GenerateCampaignTitleSuggestionsInputSchema
>;

const GenerateCampaignTitleSuggestionsOutputSchema = z.object({
  suggestedTitles: z
    .array(z.string())
    .describe('An array of suggested campaign titles.'),
  suggestedCategories: z
    .array(z.string())
    .describe('An array of suggested campaign categories.'),
  suggestedTags: z
    .array(z.string())
    .describe('An array of suggested campaign tags.'),
});
export type GenerateCampaignTitleSuggestionsOutput = z.infer<
  typeof GenerateCampaignTitleSuggestionsOutputSchema
>;

export async function generateCampaignTitleSuggestions(
  input: GenerateCampaignTitleSuggestionsInput
): Promise<GenerateCampaignTitleSuggestionsOutput> {
  return generateCampaignTitleSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCampaignTitleSuggestionsPrompt',
  input: {schema: GenerateCampaignTitleSuggestionsInputSchema},
  output: {schema: GenerateCampaignTitleSuggestionsOutputSchema},
  prompt: `You are an expert in crafting engaging and effective campaign titles, categories and tags for NGOs.

  Given the following campaign details, suggest 5 different campaign titles, 3 categories, and 5 tags that would maximize donor engagement.
  Return them as arrays in JSON format.

  Campaign Details: {{{campaignDetails}}}`,
});

const generateCampaignTitleSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateCampaignTitleSuggestionsFlow',
    inputSchema: GenerateCampaignTitleSuggestionsInputSchema,
    outputSchema: GenerateCampaignTitleSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
