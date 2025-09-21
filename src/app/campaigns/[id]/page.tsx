import { getCampaignById } from "@/lib/campaigns";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target, Clock, Users } from "lucide-react";
import { differenceInDays, format } from 'date-fns';
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

function daysLeft(deadline: string): number {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const days = differenceInDays(deadlineDate, today);
  return days > 0 ? days : 0;
}

export default async function CampaignDetailPage({ params }: { params: { id: string } }) {
  const campaign = await getCampaignById(params.id);

  if (!campaign) {
    notFound();
  }

  const progress = Math.round((campaign.raisedAmount / campaign.goalAmount) * 100);
  const remainingDays = daysLeft(campaign.deadline);

  return (
    <div className="bg-primary/5">
        <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
                <Carousel className="w-full rounded-lg overflow-hidden shadow-lg mb-6">
                    <CarouselContent>
                        {campaign.images.map((img, index) => (
                            <CarouselItem key={index}>
                                <div className="aspect-video relative">
                                    <Image src={img} alt={`${campaign.title} image ${index + 1}`} fill className="object-cover" data-ai-hint="charity event" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                </Carousel>

                <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image src={campaign.ngo.logo} alt={`${campaign.ngo.name} logo`} fill className="object-cover" data-ai-hint="charity logo" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Organized by</p>
                        <p className="font-semibold text-lg">{campaign.ngo.name}</p>
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-headline font-bold mb-3">{campaign.title}</h1>
                
                <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="secondary" className="text-base py-1 px-3">{campaign.category}</Badge>
                    {campaign.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-base py-1 px-3">{tag}</Badge>
                    ))}
                </div>

                <h2 className="text-2xl font-headline font-semibold border-b pb-2 mb-4">About this campaign</h2>
                <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                    {campaign.description}
                </p>
            </div>
            
            <div className="lg:col-span-2">
                <Card className="shadow-xl sticky top-24">
                    <CardContent className="p-6">
                        <Progress value={progress} className="h-3 mb-2" />
                        <div className="flex justify-between items-baseline mb-4">
                            <p className="text-xl font-bold text-primary">
                                ${campaign.raisedAmount.toLocaleString()}
                                <span className="text-sm font-normal text-muted-foreground ml-1">raised</span>
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {progress}% of ${campaign.goalAmount.toLocaleString()}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-center my-6">
                            <div className="p-3 bg-primary/5 rounded-lg">
                                <Target className="w-7 h-7 mx-auto text-primary mb-1" />
                                <p className="text-xl font-bold">${campaign.goalAmount.toLocaleString()}</p>
                                <p className="text-sm text-muted-foreground">Goal</p>
                            </div>
                            <div className="p-3 bg-primary/5 rounded-lg">
                                <Clock className="w-7 h-7 mx-auto text-primary mb-1" />
                                <p className="text-xl font-bold">{remainingDays}</p>
                                <p className="text-sm text-muted-foreground">Days Left</p>
                            </div>
                        </div>

                        <Button asChild size="lg" className="w-full text-lg h-12">
                            <Link href={`/campaigns/${campaign.id}/donate`}>Donate Now</Link>
                        </Button>

                        <div className="mt-6 space-y-3 text-muted-foreground">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5" />
                                <span>Deadline: {format(new Date(campaign.deadline), 'MMMM dd, yyyy')}</span>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </div>
        </div>
    </div>
  );
}
