// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";

export const metadata = { title: "Smart Dispute" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-black text-white">
        <header className="border-b border-white/10">
          <nav className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold">Smart Dispute</Link>
            <div className="flex gap-4 text-sm">
              <Link href="/login">Login</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/triage">Triage</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        <footer className="mx-auto max-w-5xl px-4 py-8 text-xs opacity-70 border-t border-white/10">
          © {new Date().getFullYear()} Smart Dispute
        </footer>
      </body>
    </html>
  );
}
