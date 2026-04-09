import type { Tool, RecommendScoreResult } from "@/types/tool";
import { tools } from "@/data/tools";

export interface RecommendAnswers {
  category?: string;
  userType?: string;
  budget?: string;
  priority?: string;
  requirements?: string[];
}

export function getRecommendations(answers: RecommendAnswers): RecommendScoreResult[] {
  const candidates = answers.category
    ? tools.filter((t) => t.categories.includes(answers.category as Tool["categories"][number]))
    : tools;

  const scored = candidates.map((tool) => {
    let score = 0;
    const matchReasons: string[] = [];

    // 基础匹配分
    score += 10;

    // 用户类型匹配
    if (answers.userType && tool.targetUsers.includes(answers.userType as Tool["targetUsers"][number])) {
      score += 15;
      const userLabels: Record<string, string> = {
        creator: "适合内容创作者", marketer: "适合营销人员", developer: "适合开发者",
        designer: "适合设计师", student: "适合学生", business: "适合企业用户",
      };
      matchReasons.push(userLabels[answers.userType] ?? "适合你的身份");
    }

    // 预算匹配
    if (answers.budget) {
      const budgetScore = calcBudgetScore(tool, answers.budget);
      score += budgetScore;
      if (budgetScore > 0) {
        if (tool.priceType === "free") matchReasons.push("完全免费");
        else if (tool.priceType === "freemium") matchReasons.push("免费可试用");
        else matchReasons.push("符合预算");
      }
    }

    // 优先级匹配
    if (answers.priority) {
      const priorityScore = calcPriorityScore(tool, answers.priority);
      score += priorityScore;
      if (priorityScore > 0) matchReasons.push(getPriorityLabel(answers.priority));
    }

    // 特殊需求匹配
    if (answers.requirements?.length) {
      const reqResults = calcRequirementsDetail(tool, answers.requirements);
      score += reqResults.score;
      matchReasons.push(...reqResults.reasons);
    }

    // 具体优势标签
    if (tool.scoreProfile.chineseFriendly >= 8 && answers.priority !== "chinese") matchReasons.push("中文体验好");
    if (tool.scoreProfile.easeOfUse >= 9 && answers.priority !== "ease") matchReasons.push("新手友好");
    if (tool.platforms.includes("api") && !answers.requirements?.includes("api")) matchReasons.push("支持 API");

    // Featured 加分
    if (tool.featured) {
      score += 5;
      matchReasons.push("编辑精选");
    }

    // 评分加权
    score += Math.round(tool.rating * 2);

    return { toolId: tool.id, score, matchReasons };
  });

  return scored.sort((a, b) => b.score - a.score);
}

function calcBudgetScore(tool: Tool, budget: string): number {
  const map: Record<string, string[]> = {
    free: ["free"],
    low: ["free", "freemium"],
    medium: ["free", "freemium", "paid"],
    high: ["free", "freemium", "paid"],
  };
  const acceptable = map[budget] ?? [];

  if (!acceptable.includes(tool.priceType)) return 0;

  // 预算越低，免费工具得分越高
  if (budget === "free" && tool.priceType === "free") return 20;
  if (budget === "free" && tool.priceType === "freemium") return 10;
  if (budget === "low" && tool.priceType === "freemium") return 15;
  if (budget === "high") return 10; // 不差钱，都行

  return 10;
}

function calcPriorityScore(tool: Tool, priority: string): number {
  const profile = tool.scoreProfile;
  switch (priority) {
    case "ease":
      return profile.easeOfUse >= 8 ? 20 : profile.easeOfUse >= 6 ? 10 : 0;
    case "quality":
      return profile.outputQuality >= 8 ? 20 : profile.outputQuality >= 6 ? 10 : 0;
    case "chinese":
      return profile.chineseFriendly >= 8 ? 20 : profile.chineseFriendly >= 5 ? 10 : 0;
    case "cost":
      return profile.costEfficiency >= 8 ? 20 : profile.costEfficiency >= 6 ? 10 : 0;
    default:
      return 0;
  }
}

function getPriorityLabel(priority: string): string {
  const labels: Record<string, string> = {
    ease: "上手简单",
    quality: "输出质量高",
    chinese: "中文支持好",
    cost: "性价比高",
  };
  return labels[priority] ?? "";
}

function calcRequirementsDetail(tool: Tool, requirements: string[]): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];
  for (const req of requirements) {
    switch (req) {
      case "api":
        if (tool.platforms.includes("api")) { score += 10; reasons.push("支持 API 接入"); }
        break;
      case "team":
        if (tool.targetUsers.includes("business")) { score += 10; reasons.push("适合团队协作"); }
        break;
      case "mobile":
        if (tool.platforms.includes("mobile")) { score += 10; reasons.push("手机端可用"); }
        break;
      case "offline":
        if (tool.platforms.includes("desktop")) { score += 5; reasons.push("支持桌面端"); }
        break;
    }
  }
  return { score, reasons };
}
