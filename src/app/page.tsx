
// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="grid gap-4">
      <div className="rounded-2xl p-6 bg-zinc-900 border border-white/10">
        <h1 className="text-2xl font-bold mb-2">Welcome to Smart Dispute</h1>
        <p className="opacity-80">
          Manage legal matters, triage issues, and upload evidence securely.
        </p>
        <div className="mt-4 flex gap-3">
          <Link href="/login" className="px-4 py-2 rounded-xl bg-red-600">Login</Link>
          <Link href="/dashboard" className="px-4 py-2 rounded-xl bg-white/10">Go to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
