import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { User, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full p-4 mb-4">
                {user.role === 'ngo' ? <ShieldCheck className="w-12 h-12" /> : <User className="w-12 h-12" />}
            </div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold mb-2">
                Welcome, {user.name}!
            </h1>
            <p className="text-lg text-muted-foreground">
                This is your {user.role === 'ngo' ? 'NGO' : 'Donor'} Dashboard.
            </p>
        </div>
        
        {user.role === 'ngo' && (
            <Card>
                <CardHeader>
                    <CardTitle>Your Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Campaign management features will be available here soon.</p>
                </CardContent>
            </Card>
        )}

        {user.role === 'donor' && (
            <Card>
                <CardHeader>
                    <CardTitle>Your Donation History</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">A summary of your donations will be displayed here.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
