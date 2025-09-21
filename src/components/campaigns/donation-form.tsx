"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const donationSchema = z.object({
  amount: z.coerce.number().positive({ message: "Amount must be positive." }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
});

const presetAmounts = [25, 50, 100, 250];

export function DonationForm({ campaignId }: { campaignId: string }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof donationSchema>>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 50,
      name: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof donationSchema>) {
    // In a real app, this would submit to a backend.
    // For this UI-only version, we redirect to the thank you page.
    console.log(values);
    router.push(`/campaigns/${campaignId}/donate/thank-you?amount=${values.amount}&campaignId=${campaignId}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-lg font-semibold">Select an amount</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={String(field.value)}
                  className="grid grid-cols-2 gap-4"
                >
                  {presetAmounts.map((amount) => (
                    <FormItem className="flex items-center" key={amount}>
                      <RadioGroupItem
                        value={String(amount)}
                        id={`amount-${amount}`}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={`amount-${amount}`}
                        className="w-full text-center border-2 rounded-md p-4 font-bold text-lg cursor-pointer transition-colors has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:border-primary"
                      >
                        ${amount}
                      </Label>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <Input
                  type="number"
                  placeholder="Or enter a custom amount"
                  className="pl-7 text-lg"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="jane.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" size="lg" className="w-full text-lg h-12">
          Donate Now
        </Button>
      </form>
    </Form>
  );
}
