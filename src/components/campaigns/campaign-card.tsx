import type { Campaign } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { differenceInDays } from 'date-fns';

function daysLeft(deadline: string): number {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const days = differenceInDays(deadlineDate, today);
    return days > 0 ? days : 0;
}

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  const progress = Math.round((campaign.raisedAmount / campaign.goalAmount) * 100);
  const remainingDays = daysLeft(campaign.deadline);

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <Link href={`/campaigns/${campaign.id}`} className="block">
          <div className="relative aspect-video">
            <Image
              src={campaign.images[0]}
              alt={campaign.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint="charity event"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">{campaign.category}</Badge>
        <CardTitle className="text-lg font-headline font-bold mb-2 h-14 line-clamp-2">
          <Link href={`/campaigns/${campaign.id}`} className="hover:text-primary transition-colors">
            {campaign.title}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground h-10 line-clamp-2">
          by {campaign.ngo.name}
        </p>

        <div className="mt-4">
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="font-semibold text-primary">${campaign.raisedAmount.toLocaleString()} raised</span>
            <span className="text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-primary/5 flex justify-between items-center">
        <div className="text-center">
            <p className="font-bold text-lg">${campaign.goalAmount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Goal</p>
        </div>
        <div className="text-center">
            <p className="font-bold text-lg">{remainingDays}</p>
            <p className="text-xs text-muted-foreground">Days Left</p>
        </div>
        <Button asChild size="sm">
          <Link href={`/campaigns/${campaign.id}/donate`}>Donate</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
