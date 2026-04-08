interface RecommendationSummaryProps {
  answers: Record<string, string | string[]>;
}

const answerLabels: Record<string, Record<string, string>> = {
  category: { image: "AI 绘画", video: "AI 视频", writing: "AI 写作", coding: "AI 编程", music: "AI 音乐", webdev: "AI 建站", prompt: "提示词" },
  userType: { creator: "内容创作者", marketer: "市场营销", developer: "开发者", designer: "设计师", student: "学生", business: "企业用户" },
  budget: { free: "只用免费的", low: "少量付费", medium: "中等预算", high: "不差钱" },
  priority: { ease: "简单易用", quality: "输出质量", chinese: "中文支持好", cost: "性价比高" },
};

export function RecommendationSummary({ answers }: RecommendationSummaryProps) {
  return (
    <div className="glass rounded-xl p-5 mb-8">
      <h3 className="text-xs uppercase tracking-widest text-accent mb-3 font-semibold">你的选择</h3>
      <div className="flex flex-wrap gap-2">
        {Object.entries(answers).map(([key, value]) => {
          const labels = answerLabels[key];
          const displayValue = Array.isArray(value)
            ? value.map((v) => labels?.[v] ?? v).join("、")
            : labels?.[value] ?? value;
          return (
            <span key={key} className="text-sm glass px-3 py-1 rounded-full text-muted">
              {displayValue}
            </span>
          );
        })}
      </div>
    </div>
  );
}
