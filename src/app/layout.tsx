import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/data/site";
import { Chatbox, Footer } from "@/components/common";
import { NavBar } from "@/components/common/NavBar";
import { AuthProvider } from "@/lib/AuthContext";
import { I18nProvider } from "@/lib/i18n";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name + " - " + siteConfig.tagline,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  metadataBase: new URL("https://www.ainav.my"),
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name + " - " + siteConfig.tagline,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.ainav.my" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="min-h-screen flex flex-col selection:bg-atmospheric/30 selection:text-white">
        <I18nProvider>
        <AuthProvider>
          {/* Cinematic Smoke Background — GPU accelerated */}
          <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none will-change-transform">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full mix-blend-screen" style={{ background: "radial-gradient(circle, rgba(45,212,191,0.30) 0%, transparent 70%)" }} />
            <div className="absolute top-[5%] right-[-15%] w-[70%] h-[65%] rounded-full mix-blend-screen" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.30) 0%, transparent 70%)" }} />
            <div className="absolute bottom-[-20%] left-[0%] w-[65%] h-[60%] rounded-full mix-blend-screen" style={{ background: "radial-gradient(circle, rgba(52,211,153,0.20) 0%, transparent 70%)" }} />
            <div className="absolute top-[25%] left-[20%] w-[50%] h-[50%] rounded-full mix-blend-screen" style={{ background: "radial-gradient(circle, rgba(217,70,239,0.20) 0%, transparent 70%)" }} />
            <div className="absolute top-[-5%] left-[35%] w-[40%] h-[55%] rounded-full mix-blend-screen" style={{ background: "radial-gradient(circle, rgba(103,232,249,0.25) 0%, transparent 70%)" }} />
            <div className="absolute bottom-[5%] right-[0%] w-[50%] h-[50%] rounded-full mix-blend-screen" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)" }} />
          </div>

          <NavBar />

          {/* Spacer for fixed nav */}
          <div className="h-20" />

          <main className="flex-1 relative z-10">{children}</main>

          <Chatbox />

          <Footer />
          <Analytics />
          <SpeedInsights />
        </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
