"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getSuggestions } from "@/actions/generate-suggestions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb, Loader2, Tags, ThumbsUp } from "lucide-react";

const initialState = {
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
      Generate Ideas
    </Button>
  );
}

export function SuggestionTool() {
  const [state, formAction] = useFormState(getSuggestions, initialState);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-headline">Describe Your Campaign</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="campaignDetails">Campaign Details</Label>
            <Textarea
              id="campaignDetails"
              name="campaignDetails"
              placeholder="e.g., We want to build a new well to provide clean drinking water for a village in rural Kenya. This will help prevent water-borne diseases and allow children to attend school instead of fetching water."
              rows={6}
              required
              minLength={10}
            />
            {state?.message && !state.success && (
              <p className="text-sm font-medium text-destructive">{state.message}</p>
            )}
          </div>
          <SubmitButton />
        </form>

        {state?.success && state.suggestions && (
          <div className="mt-8 space-y-6 animate-in fade-in-50 duration-500">
            <h3 className="text-lg font-semibold text-center text-primary">Here are some ideas!</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2"><ThumbsUp className="w-5 h-5 text-accent" />Suggested Titles</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground bg-primary/5 p-4 rounded-md">
                  {state.suggestions.suggestedTitles.map((title) => (
                    <li key={title}>{title}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2"><Tags className="w-5 h-5 text-accent" />Suggested Tags</h4>
                <div className="flex flex-wrap gap-2 bg-primary/5 p-4 rounded-md">
                    {state.suggestions.suggestedTags.map((tag) => (
                        <span key={tag} className="bg-accent/20 text-accent-foreground px-2 py-1 rounded-full text-sm">{tag}</span>
                    ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2"><Tags className="w-5 h-5 text-accent" />Suggested Categories</h4>
              <div className="flex flex-wrap gap-2 bg-primary/5 p-4 rounded-md">
                  {state.suggestions.suggestedCategories.map((cat) => (
                      <span key={cat} className="bg-primary/20 text-primary-foreground px-2 py-1 rounded-full text-sm">{cat}</span>
                  ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
