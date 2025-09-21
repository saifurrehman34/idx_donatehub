"use server";

import { generateCampaignTitleSuggestions } from "@/ai/flows/generate-campaign-title-suggestions";
import { z } from "zod";

const SuggestionSchema = z.object({
  campaignDetails: z.string().min(10, { message: "Please provide more details about your campaign." }),
});

type State = {
  success: boolean;
  message?: string;
  suggestions?: {
    suggestedTitles: string[];
    suggestedCategories: string[];
    suggestedTags: string[];
  }
}

export async function getSuggestions(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = SuggestionSchema.safeParse({
    campaignDetails: formData.get('campaignDetails'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.flatten().fieldErrors.campaignDetails?.[0]
    };
  }

  try {
    const result = await generateCampaignTitleSuggestions({
      campaignDetails: validatedFields.data.campaignDetails,
    });
    
    return {
      success: true,
      suggestions: result
    };
  } catch (error) {
    console.error("Error generating suggestions:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later."
    };
  }
}
