import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({ title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-10", className)}>
      <h2 className="text-4xl md:text-5xl text-white">{title}</h2>
      {description && <p className="text-on-surface/40 font-light mt-2">{description}</p>}
    </div>
  );
}
