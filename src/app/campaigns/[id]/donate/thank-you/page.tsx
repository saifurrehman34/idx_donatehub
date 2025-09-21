"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Twitter, Facebook, Linkedin } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const campaignId = searchParams.get("campaignId");

  const shareText = `I just donated to a great cause on DonateLight! Join me in making a difference.`;
  const shareUrl = campaignId ? `${window.location.origin}/campaigns/${campaignId}` : window.location.origin;

  return (
    <div className="bg-primary/5 min-h-[calc(100vh-15rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-lg text-center shadow-2xl animate-in fade-in-50 zoom-in-95 duration-500">
        <CardHeader>
          <div className="mx-auto bg-green-100 rounded-full p-3 w-fit">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-headline mt-4">Thank You!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground mb-6">
            {amount
              ? `Your generous donation of $${amount} has been submitted. `
              : "Your donation has been submitted. "}
            Your support makes a world of difference.
          </p>

          <div className="space-y-4 mb-8">
            <h3 className="font-semibold">Share the cause:</h3>
            <div className="flex justify-center gap-4">
              <Button asChild variant="outline" size="icon">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-5 h-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="icon">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-5 h-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="icon">
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          <Button asChild size="lg">
            <Link href="/">Back to Campaigns</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}


export default function ThankYouPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  )
}
