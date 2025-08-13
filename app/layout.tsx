import "../src/app/globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata = { title: "Justice-Bot Canada" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="bg-[#0c0c0e] text-[#f0f0f2]">
        <header className="sticky top-0 z-10 bg-[#0c0c0e]/80 backdrop-blur border-b border-white/10">
          <nav className="max-w-5xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-[#d32d2d] text-2xl">🍁</span>
              <span className="font-semibold">Justice-Bot</span>
            </Link>
            <div className="flex items-center gap-3 text-sm">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/triage">Triage</Link>
              <Link href="/evidence">Evidence</Link>
              <Link href="/login">Login</Link>
            </div>
          </nav>
        </header>
        <main className="max-w-5xl mx-auto px-4 md:px-6 py-6">{children}</main>
        <footer className="max-w-5xl mx-auto px-4 md:px-6 py-8 text-xs opacity-70">
          © {new Date().getFullYear()} Justice-Bot Canada — dark theme, red & white 🇨🇦
        </footer>
      </body>
    </html>
  );
}