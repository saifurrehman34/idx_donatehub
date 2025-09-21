import { ContactForm } from "@/components/shared/contact-form";
import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full p-3 mb-4">
          <Mail className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-muted-foreground">
          Are you an NGO interested in partnering with us? Or do you have questions about our platform? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <ContactForm />
      </div>
    </div>
  );
}
