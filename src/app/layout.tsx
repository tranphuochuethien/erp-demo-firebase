import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { MainNav } from "@/components/app/main-nav";
import { UserNav } from "@/components/app/user-nav";
import { LanguageSelector } from "@/components/app/language-selector";
import { LanguageProvider } from "@/components/providers/language-provider";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Package } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BizTrack",
  description: "Một ERP cơ bản cho các doanh nghiệp nhỏ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
          <SidebarProvider>
            <Sidebar>
              <SidebarHeader className="p-4">
                <Link href="/" className="flex items-center gap-2">
                  <Package className="h-7 w-7 text-primary" />
                  <h1 className="font-headline text-xl font-semibold text-primary">
                    BizTrack
                  </h1>
                </Link>
              </SidebarHeader>
              <SidebarContent>
                <MainNav />
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
              <header className="sticky top-0 z-30 flex h-14 items-center justify-end gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <SidebarTrigger className="sm:hidden -order-1" />
                <div className="ml-auto flex items-center gap-2">
                  <LanguageSelector />
                  <UserNav />
                </div>
              </header>
              <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
