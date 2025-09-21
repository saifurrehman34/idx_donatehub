import { SuggestionTool } from "@/components/ai/suggestion-tool";
import { Lightbulb } from "lucide-react";

export default function AiToolsPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full p-3 mb-4">
          <Lightbulb className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
          Campaign Idea Generator
        </h1>
        <p className="text-lg text-muted-foreground">
          Struggling with how to name your campaign or which tags to use?
          Describe your campaign's goals, and our AI will suggest catchy titles, relevant categories, and effective tags to boost your reach.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <SuggestionTool />
      </div>
    </div>
  );
}
