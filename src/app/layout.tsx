import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.name + " - " + siteConfig.tagline,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark antialiased">
      <body className="min-h-screen flex flex-col">
        {/* Floating Glass Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 mx-auto mt-4 max-w-5xl px-4">
          <div className="flex items-center justify-between px-6 py-3 rounded-full glass-strong">
            <Link href="/" className="text-2xl italic font-serif text-foreground tracking-tighter">
              AI Nav
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            {/* Mobile menu */}
            <div className="md:hidden flex items-center gap-4">
              {siteConfig.navItems.slice(0, 3).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Spacer for fixed nav */}
        <div className="h-20" />

        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-border mt-20">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
              {siteConfig.footerLinks.map((group) => (
                <div key={group.title}>
                  <h4 className="text-xs uppercase tracking-widest text-accent mb-4 font-semibold">
                    {group.title}
                  </h4>
                  <ul className="space-y-2">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted hover:text-foreground transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-accent mb-4 font-semibold">
                  关于
                </h4>
                <p className="text-sm text-muted leading-relaxed">
                  {siteConfig.description}
                </p>
              </div>
            </div>
            <div className="text-center text-xs text-muted/60 border-t border-border pt-6">
              <span className="italic font-serif text-lg text-foreground/40">AI Nav</span>
              <span className="mx-2">·</span>
              {siteConfig.tagline}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
