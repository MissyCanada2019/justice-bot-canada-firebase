import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="p-4 border-b flex items-center gap-4 h-16 sticky top-0 bg-background/95 backdrop-blur z-10">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-xl font-semibold font-headline">JusticeBot</h1>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-auto">
            {children}
        </main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
