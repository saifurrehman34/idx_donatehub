import type { Campaign } from "@/types";
import campaignsData from "./data/campaigns.json";

// Simulate an async data fetch
export async function getCampaigns(): Promise<Campaign[]> {
  return Promise.resolve(campaignsData as Campaign[]);
}

export async function getCampaignById(id: string): Promise<Campaign | undefined> {
  const campaigns = await getCampaigns();
  return Promise.resolve(campaigns.find((campaign) => campaign.id === id));
}
