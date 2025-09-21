'use server';

/**
 * @fileOverview Suggests relevant categories and tags for a campaign based on the title and description.
 *
 * - suggestCampaignCategories - A function that suggests categories and tags for a campaign.
 * - SuggestCampaignCategoriesInput - The input type for the suggestCampaignCategories function.
 * - SuggestCampaignCategoriesOutput - The return type for the suggestCampaignCategories function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCampaignCategoriesInputSchema = z.object({
  title: z.string().describe('The title of the campaign.'),
  description: z.string().describe('The description of the campaign.'),
});
export type SuggestCampaignCategoriesInput = z.infer<
  typeof SuggestCampaignCategoriesInputSchema
>;

const SuggestCampaignCategoriesOutputSchema = z.object({
  categories: z
    .array(z.string())
    .describe('Suggested categories for the campaign.'),
  tags: z.array(z.string()).describe('Suggested tags for the campaign.'),
});
export type SuggestCampaignCategoriesOutput = z.infer<
  typeof SuggestCampaignCategoriesOutputSchema
>;

export async function suggestCampaignCategories(
  input: SuggestCampaignCategoriesInput
): Promise<SuggestCampaignCategoriesOutput> {
  return suggestCampaignCategoriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCampaignCategoriesPrompt',
  input: {schema: SuggestCampaignCategoriesInputSchema},
  output: {schema: SuggestCampaignCategoriesOutputSchema},
  prompt: `You are an expert in charity campaigns. Your task is to suggest relevant categories and tags for a campaign based on its title and description.

Title: {{{title}}}
Description: {{{description}}}

Categories: Provide a list of relevant categories for the campaign.
Tags: Provide a list of relevant tags for the campaign.`,
});

const suggestCampaignCategoriesFlow = ai.defineFlow(
  {
    name: 'suggestCampaignCategoriesFlow',
    inputSchema: SuggestCampaignCategoriesInputSchema,
    outputSchema: SuggestCampaignCategoriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
