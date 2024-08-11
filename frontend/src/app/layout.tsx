import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Animated Umbrella",
  description: "The future of betting is here, and its on the Blockchain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThirdwebProvider>
            <Providers>
              <main className="p-4 pb-10 min-h-[100vh] flex flex-col container max-w-screen-xl 2xl:max-w-screen-2xl mx-auto">
                <Header />
                <Separator className="my-4" />
                {children}
              </main>
              <Footer />
              <Toaster />
            </Providers>
          </ThirdwebProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
