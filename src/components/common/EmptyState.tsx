import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function EmptyState({ icon = "📭", title, description, className, children }: EmptyStateProps) {
  return (
    <div className={cn("text-center py-16", className)}>
      <span className="text-5xl block mb-4">{icon}</span>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {description && (
        <p className="text-gray-500 mt-2 max-w-md mx-auto">{description}</p>
      )}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
