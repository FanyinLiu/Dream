import { cn } from "@/lib/utils";

interface ToolFeatureListProps {
  pros: string[];
  cons: string[];
  className?: string;
}

export function ToolFeatureList({ pros, cons, className }: ToolFeatureListProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-6", className)}>
      <div>
        <h4 className="text-sm font-semibold text-green-700 mb-2">✅ 优势</h4>
        <ul className="space-y-1.5">
          {pros.map((pro) => (
            <li key={pro} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-green-500 mt-0.5 shrink-0">•</span>
              {pro}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-red-700 mb-2">⚠️ 不足</h4>
        <ul className="space-y-1.5">
          {cons.map((con) => (
            <li key={con} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-red-500 mt-0.5 shrink-0">•</span>
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
