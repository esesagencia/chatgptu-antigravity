import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "AI SDK Streaming Preview",
  description:
    "Use the Data Stream Protocol to stream chat completions from a endpoint and display them using the useChat hook in your Next.js application.",
  openGraph: {
    images: [
      {
        url: "/og?title=AI SDK Streaming Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "/og?title=AI SDK Streaming Preview",
      },
    ],
  },
};

import { StatusBadge } from "@/app/features/status/components/StatusBadge";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(GeistSans.className, "antialiased")}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <footer className="p-4 border-t flex justify-end items-center gap-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <StatusBadge />
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
