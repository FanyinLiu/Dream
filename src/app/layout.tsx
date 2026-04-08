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
    <html lang="zh-CN" className="antialiased">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
              <span className="text-sm text-gray-500 hidden sm:inline">
                {siteConfig.tagline}
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-8">
              {siteConfig.footerLinks.map((group) => (
                <div key={group.title}>
                  <h4 className="font-semibold text-gray-900 text-sm mb-3">
                    {group.title}
                  </h4>
                  <ul className="space-y-2">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-3">
                  关于
                </h4>
                <p className="text-sm text-gray-500">
                  {siteConfig.description}
                </p>
              </div>
            </div>
            <div className="text-center text-sm text-gray-400 border-t border-gray-100 pt-6">
              {siteConfig.name} - {siteConfig.tagline}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
