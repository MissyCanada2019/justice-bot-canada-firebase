// src/app/(dashboard)/layout.tsx
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <aside className="col-span-12 md:col-span-3">
        <div className="sticky top-4 rounded-2xl p-4 bg-zinc-900 border border-white/10">
          <nav className="grid gap-2 text-sm">
            <Link href="/dashboard" className="hover:underline">Overview</Link>
            <Link href="/triage" className="hover:underline">Triage</Link>
            <Link href="/evidence" className="hover:underline">Evidence</Link>
            <Link href="/journey" className="hover:underline">Journey</Link>
          </nav>
        </div>
      </aside>
      <section className="col-span-12 md:col-span-9">{children}</section>
    </div>
  );
}
