import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'JusticeBot Canada',
  description: 'Your AI-powered legal assistant for navigating Canadian law.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${openSans.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
