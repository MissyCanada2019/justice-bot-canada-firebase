import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 flex justify-between items-center">
        <Logo />
        <Button asChild variant="outline">
          <Link href="/login">
            Login
          </Link>
        </Button>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">
            Navigate Canadian Law with Confidence
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            JusticeBot is your AI-powered legal assistant, designed to help you understand your rights, generate legal documents, and prepare for your case.
          </p>
          <Button asChild size="lg">
            <Link href="/triage">
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </main>
      <footer className="p-4 text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} JusticeBot Canada. All rights reserved.
      </footer>
    </div>
  );
}
