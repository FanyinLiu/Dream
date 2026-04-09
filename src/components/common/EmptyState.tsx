import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function EmptyState({ icon, title, description, className, children }: EmptyStateProps) {
  return (
    <div className={cn("text-center py-20", className)}>
      {icon && <span className="text-5xl block mb-4">{icon}</span>}
      <h3 className="text-xl text-on-surface/40">{title}</h3>
      {description && <p className="text-sm text-on-surface/20 mt-2 max-w-md mx-auto">{description}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
