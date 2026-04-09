import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="text-sm text-on-surface/40 mb-8">
      {items.map((item, index) => (
        <span key={item.label}>
          {index > 0 && <span className="mx-2 text-on-surface/20">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-on-surface/80">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
