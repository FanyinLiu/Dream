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
    <div className={cn("mb-12", className)}>
      <div className="flex items-center gap-3 mb-2">
        {icon && <span className="text-4xl">{icon}</span>}
        <h1 className="text-4xl md:text-5xl text-white">{title}</h1>
      </div>
      {description && <p className="text-on-surface/40 font-light mt-2">{description}</p>}
      {children}
    </div>
  );
}
