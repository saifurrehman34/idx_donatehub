import { getCampaignById } from "@/lib/campaigns";
import { notFound } from "next/navigation";
import Image from "next/image";
import { DonationForm } from "@/components/campaigns/donation-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function DonatePage({ params }: { params: { id: string } }) {
  const campaign = await getCampaignById(params.id);

  if (!campaign) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">
            You're supporting:
          </h1>
          <h2 className="text-2xl md:text-3xl font-headline text-primary mb-6">
            {campaign.title}
          </h2>

          <Card className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={campaign.images[0]}
                  alt={campaign.title}
                  fill
                  className="object-cover"
                  data-ai-hint="charity event"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-xl mb-4">{campaign.ngo.name}</CardTitle>
              <p className="text-muted-foreground line-clamp-3 mb-4">
                {campaign.description}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{campaign.category}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Make a Donation</CardTitle>
            </CardHeader>
            <CardContent>
              <DonationForm campaignId={campaign.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
