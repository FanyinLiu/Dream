"use client";

import Link from "next/link";
import { siteConfig } from "@/data/site";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="px-6 py-20 border-t border-white/5 text-center relative z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl text-white mb-8 brand-serif">AI Nav</h2>
        <div className="flex flex-wrap justify-center gap-8 text-sm text-on-surface/40 mb-12">
          {siteConfig.footerLinks.map((group) =>
            group.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))
          )}
        </div>
        <p className="text-xs text-on-surface/20">
          &copy; 2026 AI Nav. {t("footer.tagline")}
        </p>
      </div>
    </footer>
  );
}
