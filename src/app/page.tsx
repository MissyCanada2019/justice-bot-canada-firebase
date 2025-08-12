import { TriageForm } from "@/components/triage-form";

export default function Home() {
  return (
    <main className="container max-w-3xl mx-auto py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline mb-4">
          Navigate Canadian Law with Confidence
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          JusticeBot is an AI-powered legal assistant designed to help you understand your rights, generate legal documents, and manage your case—all in plain language.
        </p>
      </div>
      <TriageForm />
    </main>
  );
}
