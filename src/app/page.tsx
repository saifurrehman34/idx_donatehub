import { getCampaigns } from '@/lib/campaigns';
import { CampaignList } from '@/components/campaigns/campaign-list';
import { HeartHandshake, Microscope, GraduationCap, Globe } from 'lucide-react';
import Image from 'next/image';

export default async function Home() {
  const campaigns = await getCampaigns();
  const categories = [...new Set(campaigns.map((c) => c.category))];

  return (
    <div className="bg-background">
      <section className="relative text-center py-20 lg:py-32 px-4 bg-primary/10">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/hero/1600/900"
            alt="Happy children"
            fill
            className="object-cover opacity-20"
            priority
            data-ai-hint="happy children"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-foreground mb-4 tracking-tight">
            Shine a Light on a Cause You Love
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            Discover and support inspiring charity campaigns. Your contribution, big or small, can spark meaningful change.
          </p>
        </div>
      </section>

      <section id="campaigns" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-2">
              Current Campaigns
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through our curated list of campaigns and find a cause that resonates with you.
            </p>
          </div>
          <CampaignList campaigns={campaigns} categories={categories} />
        </div>
      </section>

      <section className="bg-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-12">
              Supporting All Causes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex flex-col items-center">
                    <div className="bg-accent/50 rounded-full p-4 mb-4">
                        <HeartHandshake className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-headline font-semibold mb-2">Community</h3>
                    <p className="text-muted-foreground">Empowering local communities through various initiatives.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-accent/50 rounded-full p-4 mb-4">
                        <Microscope className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-headline font-semibold mb-2">Health</h3>
                    <p className="text-muted-foreground">Providing access to healthcare and medical research.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-accent/50 rounded-full p-4 mb-4">
                        <GraduationCap className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-headline font-semibold mb-2">Education</h3>
                    <p className="text-muted-foreground">Fostering learning opportunities for all ages.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-accent/50 rounded-full p-4 mb-4">
                        <Globe className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-headline font-semibold mb-2">Environment</h3>
                    <p className="text-muted-foreground">Protecting our planet for future generations.</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
