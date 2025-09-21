import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-primary/10">
      <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} DonateLight. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
