import type { CategoryId, RecommendQuestion } from "@/types/tool";

export const recommendQuestions: RecommendQuestion[] = [
  {
    id: "category",
    question: "你想用 AI 做什么？",
    type: "single",
    options: [
      { value: "image", label: "生成图片 / 绘画", description: "海报、插画、产品图、艺术创作" },
      { value: "video", label: "制作视频", description: "短视频、数字人口播、广告片" },
      { value: "writing", label: "写作 / 文案", description: "文章、营销文案、翻译、润色" },
      { value: "coding", label: "编程 / 开发", description: "代码补全、全栈开发、Bug 修复" },
    ],
  },
  {
    id: "userType",
    question: "你的身份是？",
    type: "single",
    options: [
      { value: "creator", label: "内容创作者", description: "自媒体、博主、UP主" },
      { value: "marketer", label: "市场营销人员", description: "品牌、运营、增长" },
      { value: "developer", label: "开发者 / 程序员" },
      { value: "designer", label: "设计师" },
      { value: "student", label: "学生 / 学习者" },
      { value: "business", label: "企业用户 / 团队" },
    ],
  },
  {
    id: "budget",
    question: "你的预算是？",
    type: "single",
    options: [
      { value: "free", label: "只用免费的", description: "不想花钱，免费够用就行" },
      { value: "low", label: "少量付费", description: "每月 $10-20，能接受" },
      { value: "medium", label: "中等预算", description: "每月 $20-50，愿意为好工具付费" },
      { value: "high", label: "不差钱", description: "效果好就行，预算不是问题" },
    ],
  },
  {
    id: "priority",
    question: "你最看重什么？",
    type: "single",
    options: [
      { value: "ease", label: "简单易用", description: "上手快，不用学太多" },
      { value: "quality", label: "输出质量", description: "效果要最好的" },
      { value: "chinese", label: "中文支持好", description: "界面和内容都要支持中文" },
      { value: "cost", label: "性价比高", description: "花最少的钱办最多的事" },
    ],
  },
  {
    id: "requirements",
    question: "你还有什么特殊需求？",
    type: "multi",
    options: [
      { value: "api", label: "需要 API 接入" },
      { value: "team", label: "团队协作" },
      { value: "mobile", label: "手机端可用" },
      { value: "offline", label: "支持离线 / 本地运行" },
    ],
  },
];

// 按分类动态切换的二级任务选项
export const taskOptionsByCategory: Record<CategoryId, { value: string; label: string }[]> = {
  image: [
    { value: "generate", label: "从文字生成图片" },
    { value: "edit", label: "编辑 / 修改现有图片" },
    { value: "style", label: "风格转换" },
    { value: "remove-bg", label: "抠图 / 去背景" },
    { value: "upscale", label: "图片放大 / 增强" },
  ],
  video: [
    { value: "text-to-video", label: "文字生成视频" },
    { value: "avatar", label: "数字人 / 口播视频" },
    { value: "edit", label: "视频剪辑" },
    { value: "subtitle", label: "自动字幕" },
    { value: "effect", label: "特效 / 风格转换" },
  ],
  writing: [
    { value: "copywriting", label: "营销文案" },
    { value: "blog", label: "博客 / 长文" },
    { value: "translate", label: "翻译" },
    { value: "polish", label: "润色 / 改写" },
    { value: "summary", label: "总结 / 摘要" },
  ],
  coding: [
    { value: "completion", label: "代码补全" },
    { value: "generation", label: "从描述生成代码" },
    { value: "review", label: "代码审查" },
    { value: "debug", label: "调试 / 修 Bug" },
    { value: "fullstack", label: "全栈应用开发" },
  ],
};
