import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { User, ShieldCheck, DollarSign, Heart, HandHeart, BarChart3, List } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

// Mock data for NGO dashboard
const ngoDonationData = [
  { month: "Jan", donations: 4000 },
  { month: "Feb", donations: 3000 },
  { month: "Mar", donations: 5000 },
  { month: "Apr", donations: 4500 },
  { month: "May", donations: 6000 },
  { month: "Jun", donations: 7500 },
];

const ngoRecentDonations = [
    { id: 'D001', donor: 'Alice Johnson', campaign: 'Clean Water Initiative', amount: 100, date: '2024-07-20' },
    { id: 'D002', donor: 'Bob Williams', campaign: 'Future Coders Bootcamp', amount: 250, date: '2024-07-19' },
    { id: 'D003', donor: 'Charlie Brown', campaign: 'Clean Water Initiative', amount: 50, date: '2024-07-18' },
];

const chartConfig = {
  donations: {
    label: "Donations",
    color: "hsl(var(--primary))",
  },
};

// Mock data for Donor dashboard
const donorDonationData = [
    { category: 'Health', amount: 500 },
    { category: 'Education', amount: 750 },
    { category: 'Environment', amount: 250 },
    { category: 'Community', amount: 300 },
];

const donorDonationHistory = [
    { id: 'H001', campaign: 'Future Coders Bootcamp', amount: 250, date: '2024-07-19', status: 'Completed' },
    { id: 'H002', campaign: 'Clean Water Initiative', amount: 100, date: '2024-06-15', status: 'Completed' },
    { id: 'H003', campaign: 'Reforest the Amazons', amount: 50, date: '2024-05-10', status: 'Completed' },
];

const donorChartConfig = {
    amount: {
      label: "Amount",
      color: "hsl(var(--primary))",
    },
};


function NgoDashboard({ user }: { user: { name: string } }) {
    return (
        <>
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full p-4 mb-4">
                    <ShieldCheck className="w-12 h-12" />
                </div>
                <h1 className="text-4xl md:text-5xl font-headline font-bold mb-2">
                    Welcome, {user.name}!
                </h1>
                <p className="text-lg text-muted-foreground">
                    Here's an overview of your organization's impact.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$125,730</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                        <Heart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">6</div>
                        <p className="text-xs text-muted-foreground">+2 since last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
                        <HandHeart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,254</div>
                        <p className="text-xs text-muted-foreground">+180 this month</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChart3/>Donations Overview</CardTitle>
                    <CardDescription>A summary of donations over the past 6 months.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <ResponsiveContainer>
                            <BarChart data={ngoDonationData}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                                <YAxis />
                                <RechartsTooltip content={<ChartTooltipContent />} />
                                <Legend content={<ChartLegendContent />} />
                                <Bar dataKey="donations" fill="var(--color-donations)" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2"><List/>Campaign Management</CardTitle>
                        <CardDescription>View, edit, or create new campaigns.</CardDescription>
                    </div>
                    <Button asChild>
                        <Link href="/dashboard/create-campaign">Create Campaign</Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Campaign management features will be available here soon.</p>
                </CardContent>
            </Card>
        </>
    );
}

function DonorDashboard({ user }: { user: { name: string } }) {
    return (
        <>
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full p-4 mb-4">
                    <User className="w-12 h-12" />
                </div>
                <h1 className="text-4xl md:text-5xl font-headline font-bold mb-2">
                    Welcome, {user.name}!
                </h1>
                <p className="text-lg text-muted-foreground">
                    Thank you for your incredible generosity and support.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Donated</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$1,800</div>
                        <p className="text-xs text-muted-foreground">Across 12 donations</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Campaigns Supported</CardTitle>
                        <Heart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">You're making a big impact!</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChart3/>Donations by Category</CardTitle>
                    <CardDescription>How your donations are distributed across different causes.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={donorChartConfig} className="h-[250px] w-full">
                        <ResponsiveContainer>
                            <BarChart data={donorDonationData} layout="vertical">
                                <CartesianGrid horizontal={false} />
                                <YAxis dataKey="category" type="category" tickLine={false} axisLine={false} tickMargin={10} />
                                <XAxis type="number" hide />
                                <RechartsTooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent />} />
                                <Bar dataKey="amount" fill="var(--color-amount)" radius={4} layout="vertical" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><List/>Your Donation History</CardTitle>
                    <CardDescription>A record of your past contributions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Campaign</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {donorDonationHistory.map((donation) => (
                                <TableRow key={donation.id}>
                                    <TableCell className="font-medium">{donation.campaign}</TableCell>
                                    <TableCell>{donation.date}</TableCell>
                                    <TableCell>${donation.amount}</TableCell>
                                    <TableCell><Badge>{donation.status}</Badge></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 bg-primary/5">
      <div className="max-w-5xl mx-auto">
        {user.role === 'ngo' ? <NgoDashboard user={user} /> : <DonorDashboard user={user} />}
      </div>
    </div>
  );
}
