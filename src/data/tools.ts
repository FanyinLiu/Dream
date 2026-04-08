import type { Tool } from "@/types/tool";

// ─── 图片类工具 ───

const midjourney: Tool = {
  id: "midjourney",
  slug: "midjourney",
  name: "Midjourney",
  tagline: "最受欢迎的 AI 绘画工具，画质天花板",
  description:
    "Midjourney 是目前画质最高的 AI 绘画工具之一。通过文字描述即可生成高质量艺术图片，支持多种风格（写实、动漫、油画、3D 等），社区生态丰富，适合设计师和创作者。",
  categories: ["image"],
  subcategories: ["图片生成", "艺术创作"],
  tags: ["绘画", "艺术", "高画质", "Discord"],
  officialUrl: "https://www.midjourney.com",
  priceType: "paid",
  priceNote: "基础版 $10/月，标准版 $30/月",
  chineseSupport: false,
  platforms: ["web"],
  skillLevel: "intermediate",
  targetUsers: ["creator", "designer"],
  bestFor: "高质量艺术图片生成、商业设计素材",
  useCases: ["海报设计", "插画创作", "概念设计", "产品展示图"],
  pros: ["画质业界领先", "风格多样灵活", "社区生态丰富", "持续快速迭代"],
  cons: ["无中文界面", "需通过 Discord 使用", "无免费版", "提示词有学习门槛"],
  featured: true,
  status: "active",
  rating: 4.8,
  logoText: "MJ",
  scoreProfile: {
    easeOfUse: 6,
    outputQuality: 10,
    costEfficiency: 6,
    chineseFriendly: 3,
    featureRichness: 8,
  },
  alternatives: ["leonardo-ai", "dall-e", "ideogram"],
};

const leonardoAi: Tool = {
  id: "leonardo-ai",
  slug: "leonardo-ai",
  name: "Leonardo AI",
  tagline: "免费额度慷慨的 AI 绘画平台",
  description:
    "Leonardo AI 提供强大的图片生成能力，拥有丰富的预训练模型和风格选项。免费额度慷慨，支持自定义训练模型，适合需要批量出图的用户。",
  categories: ["image"],
  subcategories: ["图片生成", "模型训练"],
  tags: ["绘画", "免费额度", "自定义模型"],
  officialUrl: "https://leonardo.ai",
  priceType: "freemium",
  priceNote: "免费 150 tokens/天，付费 $12/月起",
  chineseSupport: false,
  platforms: ["web"],
  skillLevel: "intermediate",
  targetUsers: ["creator", "designer"],
  bestFor: "批量出图、自定义风格训练",
  useCases: ["游戏美术", "插画批量生成", "品牌视觉素材"],
  pros: ["免费额度慷慨", "支持自定义模型", "风格选项丰富", "Web 端直接使用"],
  cons: ["无中文界面", "部分高级功能需付费", "生成速度一般"],
  featured: false,
  status: "active",
  rating: 4.3,
  logoText: "Leo",
  scoreProfile: {
    easeOfUse: 7,
    outputQuality: 8,
    costEfficiency: 9,
    chineseFriendly: 3,
    featureRichness: 8,
  },
  alternatives: ["midjourney", "stable-diffusion"],
};

const adobeFirefly: Tool = {
  id: "adobe-firefly",
  slug: "adobe-firefly",
  name: "Adobe Firefly",
  tagline: "Adobe 官方 AI 生图，商用无忧",
  description:
    "Adobe Firefly 是 Adobe 推出的生成式 AI 工具，深度整合在 Photoshop、Illustrator 等 Adobe 全家桶中。使用经授权的素材训练，生成内容可安全商用。",
  categories: ["image"],
  subcategories: ["图片生成", "图片编辑"],
  tags: ["Adobe", "商用安全", "设计"],
  officialUrl: "https://firefly.adobe.com",
  priceType: "freemium",
  priceNote: "免费版有限额，Creative Cloud 订阅包含",
  chineseSupport: true,
  platforms: ["web", "desktop"],
  skillLevel: "beginner",
  targetUsers: ["designer", "marketer", "business"],
  bestFor: "商用安全的 AI 生图、与 Adobe 工作流整合",
  useCases: ["商业海报", "产品修图", "营销素材", "品牌设计"],
  pros: ["商用版权安全", "与 Adobe 全家桶整合", "支持中文", "上手简单"],
  cons: ["创意自由度不如 MJ", "免费额度有限", "需 Adobe 订阅才能发挥最大价值"],
  featured: false,
  status: "active",
  rating: 4.2,
  logoText: "Ff",
  scoreProfile: {
    easeOfUse: 9,
    outputQuality: 7,
    costEfficiency: 5,
    chineseFriendly: 8,
    featureRichness: 7,
  },
  alternatives: ["canva", "midjourney"],
};

const canva: Tool = {
  id: "canva",
  slug: "canva",
  name: "Canva",
  tagline: "人人都能用的 AI 设计平台",
  description:
    "Canva 是全球最流行的在线设计平台，内置 AI 生图、AI 文案、一键抠图等功能。模板极其丰富，适合零设计基础的用户快速出图。",
  categories: ["image"],
  subcategories: ["设计", "图片编辑"],
  tags: ["设计", "模板", "新手友好", "抠图"],
  officialUrl: "https://www.canva.com",
  priceType: "freemium",
  priceNote: "免费版可用，Pro $12.99/月",
  chineseSupport: true,
  platforms: ["web", "desktop", "mobile"],
  skillLevel: "beginner",
  targetUsers: ["marketer", "student", "creator", "business"],
  bestFor: "零基础快速出设计图、社交媒体图片",
  useCases: ["社交媒体图", "海报传单", "PPT 演示", "Logo 设计"],
  pros: ["上手极简", "模板海量", "中文支持好", "多平台可用"],
  cons: ["AI 生图质量一般", "高级功能需付费", "设计自由度有限"],
  featured: true,
  status: "active",
  rating: 4.5,
  logoText: "Ca",
  scoreProfile: {
    easeOfUse: 10,
    outputQuality: 6,
    costEfficiency: 8,
    chineseFriendly: 9,
    featureRichness: 8,
  },
  alternatives: ["adobe-firefly", "midjourney"],
};

const ideogram: Tool = {
  id: "ideogram",
  slug: "ideogram",
  name: "Ideogram",
  tagline: "AI 文字排版之王，文字渲染最准",
  description:
    "Ideogram 是一款专注于文字渲染的 AI 绘画工具。在所有 AI 图片生成工具中，Ideogram 对文字的处理最为精准，非常适合需要在图片中嵌入文字的场景。",
  categories: ["image"],
  subcategories: ["图片生成", "文字排版"],
  tags: ["文字渲染", "Logo", "排版"],
  officialUrl: "https://ideogram.ai",
  priceType: "freemium",
  priceNote: "免费 10 张/天，Plus $7/月",
  chineseSupport: false,
  platforms: ["web"],
  skillLevel: "beginner",
  targetUsers: ["designer", "marketer", "creator"],
  bestFor: "需要精准文字的 AI 生图（Logo、海报、封面）",
  useCases: ["Logo 设计", "社交媒体封面", "活动海报", "品牌素材"],
  pros: ["文字渲染业界最强", "免费额度可用", "操作简单", "持续更新迭代"],
  cons: ["无中文界面", "整体画质不如 MJ", "风格选项较少"],
  featured: false,
  status: "active",
  rating: 4.1,
  logoText: "Id",
  scoreProfile: {
    easeOfUse: 8,
    outputQuality: 7,
    costEfficiency: 9,
    chineseFriendly: 4,
    featureRichness: 6,
  },
  alternatives: ["midjourney", "canva"],
};

const dreamStudio: Tool = {
  id: "dreamstudio",
  slug: "dreamstudio",
  name: "DreamStudio",
  tagline: "Stable Diffusion 官方在线版",
  description:
    "DreamStudio 是 Stability AI 推出的在线图片生成平台，基于 Stable Diffusion 模型。提供 Web 界面，无需本地部署即可使用 SD 的强大能力。",
  categories: ["image"],
  subcategories: ["图片生成"],
  tags: ["Stable Diffusion", "开源", "在线"],
  officialUrl: "https://dreamstudio.ai",
  priceType: "freemium",
  priceNote: "注册送 25 积分，后续按量付费",
  chineseSupport: false,
  platforms: ["web", "api"],
  skillLevel: "intermediate",
  targetUsers: ["developer", "creator", "designer"],
  bestFor: "想在线体验 Stable Diffusion、需要 API 接入的开发者",
  useCases: ["API 集成生图", "批量图片生成", "产品原型图"],
  pros: ["基于开源模型", "有 API 可接入", "按量付费灵活", "参数可调性强"],
  cons: ["画质不如 MJ", "界面相对简陋", "社区不如本地 SD 活跃"],
  featured: false,
  status: "active",
  rating: 3.8,
  logoText: "DS",
  scoreProfile: {
    easeOfUse: 6,
    outputQuality: 7,
    costEfficiency: 7,
    chineseFriendly: 2,
    featureRichness: 7,
  },
  alternatives: ["leonardo-ai", "midjourney"],
};

// ─── 视频类工具 ───

const runway: Tool = {
  id: "runway",
  slug: "runway",
  name: "Runway",
  tagline: "AI 视频生成领域的领跑者",
  description:
    "Runway 是目前最强大的 AI 视频生成和编辑平台。支持文字/图片生成视频、视频风格转换、绿幕抠像、运动笔刷等功能，是 AI 视频创作的首选工具。",
  categories: ["video"],
  subcategories: ["视频生成", "视频编辑"],
  tags: ["视频生成", "特效", "Gen-3"],
  officialUrl: "https://runwayml.com",
  priceType: "freemium",
  priceNote: "免费试用，Standard $12/月",
  chineseSupport: false,
  platforms: ["web"],
  skillLevel: "intermediate",
  targetUsers: ["creator", "designer", "marketer"],
  bestFor: "高质量 AI 视频生成、专业视频编辑",
  useCases: ["广告短片", "社交媒体视频", "概念视频", "特效制作"],
  pros: ["视频生成质量最高", "功能全面", "持续更新", "专业级工具链"],
  cons: ["无中文界面", "免费额度很少", "生成速度慢", "价格较高"],
  featured: true,
  status: "active",
  rating: 4.7,
  logoText: "Rw",
  scoreProfile: {
    easeOfUse: 6,
    outputQuality: 10,
    costEfficiency: 5,
    chineseFriendly: 3,
    featureRichness: 9,
  },
  alternatives: ["pika", "kling"],
};

const pika: Tool = {
  id: "pika",
  slug: "pika",
  name: "Pika",
  tagline: "简单好玩的 AI 视频生成工具",
  description:
    "Pika 是一款操作简单的 AI 视频生成工具，支持文字、图片生成视频，以及视频风格转换。上手门槛低，适合快速生成创意短视频。",
  categories: ["video"],
  subcategories: ["视频生成"],
  tags: ["视频生成", "简单", "创意"],
  officialUrl: "https://pika.art",
  priceType: "freemium",
  priceNote: "免费版每天可用，Pro $8/月",
  chineseSupport: false,
  platforms: ["web"],
  skillLevel: "beginner",
  targetUsers: ["creator", "student"],
  bestFor: "快速生成创意短视频、零门槛上手",
  useCases: ["社交媒体短视频", "创意动画", "表情包制作"],
  pros: ["操作极简", "免费额度可用", "生成速度快", "趣味性强"],
  cons: ["视频时长短", "画质不如 Runway", "无中文界面", "功能相对单一"],
  featured: false,
  status: "active",
  rating: 4.2,
  logoText: "Pk",
  scoreProfile: {
    easeOfUse: 9,
    outputQuality: 7,
    costEfficiency: 8,
    chineseFriendly: 3,
    featureRichness: 5,
  },
  alternatives: ["runway", "kling"],
};

const kling: Tool = {
  id: "kling",
  slug: "kling",
  name: "Kling（可灵）",
  tagline: "国产最强 AI 视频生成，中文支持最好",
  description:
    "可灵是快手推出的 AI 视频生成工具，支持文字/图片生成高质量视频。是目前中文支持最好的 AI 视频工具，国内用户可直接使用，无需科学上网。",
  categories: ["video"],
  subcategories: ["视频生成"],
  tags: ["国产", "中文", "视频生成"],
  officialUrl: "https://klingai.kuaishou.com",
  priceType: "freemium",
  priceNote: "免费额度可用，会员 ¥66/月",
  chineseSupport: true,
  platforms: ["web", "mobile"],
  skillLevel: "beginner",
  targetUsers: ["creator", "marketer", "business"],
  bestFor: "中文用户的 AI 视频生成首选，国内直接可用",
  useCases: ["短视频创作", "电商产品视频", "营销视频", "创意动画"],
  pros: ["中文支持最好", "国内直接可用", "视频质量高", "免费额度慷慨"],
  cons: ["国际影响力不如 Runway", "高级功能仍在迭代", "导出分辨率有限制"],
  featured: true,
  status: "active",
  rating: 4.5,
  logoText: "可灵",
  scoreProfile: {
    easeOfUse: 8,
    outputQuality: 8,
    costEfficiency: 9,
    chineseFriendly: 10,
    featureRichness: 7,
  },
  alternatives: ["runway", "pika"],
};

const heygen: Tool = {
  id: "heygen",
  slug: "heygen",
  name: "HeyGen",
  tagline: "AI 数字人视频制作，100+ 种语言",
  description:
    "HeyGen 是专注于 AI 数字人视频的平台。输入文字即可生成逼真的真人口播视频，支持 100+ 种语言和多种数字人形象，适合营销、培训、产品介绍等场景。",
  categories: ["video"],
  subcategories: ["数字人", "口播视频"],
  tags: ["数字人", "口播", "多语言", "营销"],
  officialUrl: "https://www.heygen.com",
  priceType: "freemium",
  priceNote: "免费 1 条视频，Creator $24/月",
  chineseSupport: true,
  platforms: ["web"],
  skillLevel: "beginner",
  targetUsers: ["marketer", "business", "creator"],
  bestFor: "快速制作真人口播视频、多语言营销视频",
  useCases: ["产品介绍视频", "培训教程", "多语言营销", "新闻播报"],
  pros: ["数字人逼真", "多语言支持", "操作简单", "支持中文"],
  cons: ["免费额度极少", "价格偏高", "自定义形象需额外付费"],
  featured: false,
  status: "active",
  rating: 4.4,
  logoText: "HG",
  scoreProfile: {
    easeOfUse: 9,
    outputQuality: 8,
    costEfficiency: 5,
    chineseFriendly: 8,
    featureRichness: 7,
  },
  alternatives: ["synthesia", "runway"],
};

const synthesia: Tool = {
  id: "synthesia",
  slug: "synthesia",
  name: "Synthesia",
  tagline: "企业级 AI 数字人视频平台",
  description:
    "Synthesia 是面向企业的 AI 数字人视频制作平台。提供 150+ 种 AI 形象和 130+ 种语言，广泛用于企业培训、内部沟通和产品演示。",
  categories: ["video"],
  subcategories: ["数字人", "企业视频"],
  tags: ["企业", "培训", "数字人", "多语言"],
  officialUrl: "https://www.synthesia.io",
  priceType: "paid",
  priceNote: "Starter $22/月，Enterprise 定制",
  chineseSupport: true,
  platforms: ["web"],
  skillLevel: "beginner",
  targetUsers: ["business", "marketer"],
  bestFor: "企业培训视频、内部沟通、大规模视频制作",
  useCases: ["员工培训", "产品演示", "企业内部通知", "多语言内容"],
  pros: ["企业级安全合规", "形象丰富", "多语言覆盖广", "可品牌定制"],
  cons: ["价格高", "偏企业市场", "创意自由度一般", "无免费版"],
  featured: false,
  status: "active",
  rating: 4.3,
  logoText: "Sy",
  scoreProfile: {
    easeOfUse: 8,
    outputQuality: 8,
    costEfficiency: 4,
    chineseFriendly: 7,
    featureRichness: 8,
  },
  alternatives: ["heygen"],
};

const capcut: Tool = {
  id: "capcut",
  slug: "capcut",
  name: "剪映 / CapCut",
  tagline: "最受欢迎的免费 AI 视频剪辑工具",
  description:
    "剪映（海外版 CapCut）是字节跳动出品的视频编辑工具。内置 AI 字幕生成、AI 智能剪辑、AI 特效等功能，新手极其友好，基础功能完全免费。",
  categories: ["video"],
  subcategories: ["视频剪辑", "字幕生成"],
  tags: ["剪辑", "字幕", "免费", "新手友好"],
  officialUrl: "https://www.capcut.com",
  priceType: "freemium",
  priceNote: "基础功能免费，Pro $7.99/月",
  chineseSupport: true,
  platforms: ["web", "desktop", "mobile"],
  skillLevel: "beginner",
  targetUsers: ["creator", "student", "marketer"],
  bestFor: "日常视频剪辑、自动字幕、新手入门",
  useCases: ["短视频剪辑", "Vlog 制作", "自动加字幕", "社交媒体内容"],
  pros: ["基础功能免费", "操作极简", "中文支持完美", "全平台覆盖", "AI 功能丰富"],
  cons: ["专业功能不如 Premiere", "部分 AI 功能需会员", "模板偏娱乐向"],
  featured: true,
  status: "active",
  rating: 4.6,
  logoText: "剪",
  scoreProfile: {
    easeOfUse: 10,
    outputQuality: 7,
    costEfficiency: 10,
    chineseFriendly: 10,
    featureRichness: 8,
  },
  alternatives: ["runway"],
};

// ─── 导出 ───

export const tools: Tool[] = [
  // 图片类
  midjourney,
  leonardoAi,
  adobeFirefly,
  canva,
  ideogram,
  dreamStudio,
  // 视频类
  runway,
  pika,
  kling,
  heygen,
  synthesia,
  capcut,
];

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter((tool) => tool.categories.includes(categoryId as Tool["categories"][number]));
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((tool) => tool.featured);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolById(id: string): Tool | undefined {
  return tools.find((tool) => tool.id === id);
}

export function getAlternativeTools(tool: Tool): Tool[] {
  return tool.alternatives
    .map((id) => getToolById(id))
    .filter((t): t is Tool => t !== undefined);
}
