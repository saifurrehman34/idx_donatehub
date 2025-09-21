"use client";

import { useState } from "react";
import type { Campaign } from "@/types";
import { CampaignCard } from "./campaign-card";
import { Button } from "@/components/ui/button";

export function CampaignList({
  campaigns,
  categories,
}: {
  campaigns: Campaign[];
  categories: string[];
}) {
  const [filter, setFilter] = useState<string>("All");

  const filteredCampaigns =
    filter === "All"
      ? campaigns
      : campaigns.filter((c) => c.category === filter);

  return (
    <div>
      <div className="flex justify-center flex-wrap gap-2 mb-8">
        <Button
          variant={filter === "All" ? "default" : "outline"}
          onClick={() => setFilter("All")}
          className="rounded-full"
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={filter === category ? "default" : "outline"}
            onClick={() => setFilter(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>

      {filteredCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No campaigns found for this category.</p>
        </div>
      )}
    </div>
  );
}
