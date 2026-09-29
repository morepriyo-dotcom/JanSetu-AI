import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "JanSetu AI | AI-Powered Citizen Grievance & Public Service Assistant",
  description:
    "Report. Understand. Resolve. JanSetu AI uses Google Gemini to turn everyday civic complaints into structured, actionable municipal service requests.",
  keywords: [
    "JanSetu AI",
    "Civic Tech",
    "Citizen Grievance",
    "Municipal Corporation",
    "Gemini AI",
    "Public Service Assistant",
    "Code for Communities",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
