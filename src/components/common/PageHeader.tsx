import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, icon, className, children }: PageHeaderProps) {
  return (
    <div className={cn("mb-10", className)}>
      <div className="flex items-center gap-3 mb-2">
        {icon && <span className="text-4xl">{icon}</span>}
        <h1 className="font-serif italic text-4xl text-foreground glow-text">{title}</h1>
      </div>
      {description && <p className="text-muted mt-1">{description}</p>}
      {children}
    </div>
  );
}
