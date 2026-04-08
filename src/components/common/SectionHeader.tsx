import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({ title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      <h2 className="font-serif italic text-3xl text-foreground">{title}</h2>
      {description && <p className="text-muted text-sm mt-1">{description}</p>}
    </div>
  );
}
