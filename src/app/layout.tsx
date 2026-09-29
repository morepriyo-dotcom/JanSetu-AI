import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { GovTopBar } from "@/components/GovTopBar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "JanSetu AI (जनसेतु) | Digital Public Good for Citizen Grievance & Public Service",
  description:
    "National AI-powered citizen grievance platform aggregating voice and text reports across diverse linguistic regions of India, aligned with data.gov.in, ISRO Bhuvan, IMD, and national infrastructure priorities.",
  keywords: [
    "JanSetu AI",
    "Digital Public Good",
    "Citizen Grievance Redressal",
    "data.gov.in",
    "ISRO Bhuvan",
    "IMD Weather",
    "Municipal Corporation",
    "Gemini AI",
    "Public Service Assistant",
    "Smart Cities Mission",
    "MoHUA",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <GovTopBar />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
