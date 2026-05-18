import Container from "@/components/common/container";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/utils/theme-provider";

import { generateMetadata as getMetadata } from "@/config/meta";

import "@/styles/globals.css";

import { Outfit } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "sonner";

const fontSans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = getMetadata("/");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className={`${fontSans.variable} antialiased font-poppins`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <Container className="min-h-screen py-6">
                <Navbar />

                {children}

                <Footer />
              </Container>

              <Toaster richColors position="top-right" />
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}