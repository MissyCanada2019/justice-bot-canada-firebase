// src/app/(dashboard)/triage/page.tsx
import TriageForm from "@/components/triage-form";

export default function TriagePage() {
  return (
    <div className="rounded-2xl p-5 bg-zinc-900 border border-white/10">
      <h1 className="text-xl font-semibold mb-3">AI Legal Triage</h1>
      <TriageForm />
    </div>
  );
}