import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "~/components/ui/sonner";
import { CSPostHogProvider } from "~/components/analytics-provider";
import QueryClientProviderWrapper from "~/components/query";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Admitium - AI-Powered College Admissions",
  description: "Your trusted platform for college admissions abroad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html>
        <QueryClientProviderWrapper>
          <CSPostHogProvider>
            <body className={`${inter.className} bg-white antialiased`}>
              <div className="flex flex-col items-center py-24 min-h-screen">
                {children}
              </div>
              <Toaster position="bottom-center" />
            </body>
          </CSPostHogProvider>
        </QueryClientProviderWrapper>
      </html>
    </ClerkProvider>
  );
}
