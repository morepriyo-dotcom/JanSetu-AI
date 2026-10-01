import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { GovTopBar } from "@/components/GovTopBar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://jansetu-ai.vercel.app"
  ),
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
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.svg" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "JanSetu AI (जनसेतु) | Digital Public Good for Citizen Grievance Redressal",
    description:
      "Multimodal AI citizen grievance platform in 10+ Indian languages with Google Gemini triage, 4-stage tracking, and municipal open data intelligence.",
    siteName: "JanSetu AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JanSetu AI - Digital Public Good for Municipal Governance",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JanSetu AI (जनसेतु) | Civic Grievance Triage Engine",
    description:
      "Multimodal AI civic grievance platform for Indian municipal corporations powered by Google Gemini.",
    images: ["/og-image.png"],
  },
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
