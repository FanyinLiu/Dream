// ─── 基础枚举类型 ───

export type CategoryId = "image" | "video" | "writing" | "coding" | "music" | "webdev" | "prompt";

export type PriceType = "free" | "freemium" | "paid";

export type SkillLevel = "beginner" | "intermediate" | "advanced";

export type ToolStatus = "active" | "beta" | "deprecated";

export type Platform = "web" | "desktop" | "mobile" | "api" | "plugin";

export type UserType =
  | "creator"
  | "marketer"
  | "developer"
  | "designer"
  | "student"
  | "business";

// ─── 分类 ───

export interface Category {
  id: CategoryId;
  slug: string;
  name: string;
  icon: string;
  description: string;
  featured: boolean;
  sort: number;
  useCases: string[];
}

// ─── 工具评分维度 ───

export interface ToolScoreProfile {
  easeOfUse: number; // 1-10
  outputQuality: number; // 1-10
  costEfficiency: number; // 1-10
  chineseFriendly: number; // 1-10
  featureRichness: number; // 1-10
}

// ─── 核心工具模型 ───

export interface Tool {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  categories: CategoryId[];
  subcategories: string[];
  tags: string[];
  officialUrl: string;
  priceType: PriceType;
  priceNote: string;
  chineseSupport: boolean;
  platforms: Platform[];
  skillLevel: SkillLevel;
  targetUsers: UserType[];
  bestFor: string;
  useCases: string[];
  pros: string[];
  cons: string[];
  featured: boolean;
  status: ToolStatus;
  rating: number; // 1-5
  logoText: string;
  scoreProfile: ToolScoreProfile;
  alternatives: string[]; // tool ids
  realTalk?: string; // 一句真实体验点评
}

// ─── 推荐系统 ───

export interface RecommendOption {
  value: string;
  label: string;
  description?: string;
}

export interface RecommendQuestion {
  id: string;
  question: string;
  type: "single" | "multi";
  options: RecommendOption[];
}

export interface RecommendScoreResult {
  toolId: string;
  score: number;
  matchReasons: string[];
}
