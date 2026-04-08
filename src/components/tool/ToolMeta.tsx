import type { Tool } from "@/types/tool";

interface ToolMetaProps {
  tool: Tool;
}

const skillLabels = {
  beginner: "新手友好",
  intermediate: "需要一定基础",
  advanced: "进阶用户",
};

export function ToolMeta({ tool }: ToolMetaProps) {
  return (
    <div className="grid grid-cols-2 gap-4 text-sm">
      <MetaItem label="定价" value={tool.priceNote} />
      <MetaItem label="中文支持" value={tool.chineseSupport ? "✅ 支持" : "❌ 不支持"} />
      <MetaItem label="上手难度" value={skillLabels[tool.skillLevel]} />
      <MetaItem label="平台" value={tool.platforms.join(" / ")} />
      <MetaItem label="评分" value={`${tool.rating} / 5`} />
      <MetaItem label="状态" value={tool.status === "active" ? "可用" : tool.status} />
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted text-xs uppercase tracking-wider">{label}</dt>
      <dd className="text-foreground font-medium mt-0.5">{value}</dd>
    </div>
  );
}
