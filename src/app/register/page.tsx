import { RegisterForm } from "@/components/auth/register-form";
import { UserPlus } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center bg-primary/5 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full p-3 mb-4">
            <UserPlus className="w-10 h-10" />
          </div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">
            Join DonateLight
          </h1>
          <p className="text-muted-foreground">
            Create an account to start making a difference.
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
