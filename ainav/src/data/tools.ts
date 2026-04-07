export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  pricing: "free" | "freemium" | "paid";
  pricingNote?: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "writing",
    name: "AI 写作",
    icon: "✍️",
    description: "文案生成、文章润色、翻译改写",
  },
  {
    id: "image",
    name: "AI 绘画",
    icon: "🎨",
    description: "图片生成、图片编辑、风格转换",
  },
  {
    id: "video",
    name: "AI 视频",
    icon: "🎬",
    description: "视频生成、视频编辑、字幕生成",
  },
  {
    id: "audio",
    name: "AI 音频",
    icon: "🎵",
    description: "语音合成、音乐生成、语音转文字",
  },
  {
    id: "coding",
    name: "AI 编程",
    icon: "💻",
    description: "代码生成、代码补全、代码审查",
  },
  {
    id: "productivity",
    name: "AI 效率",
    icon: "⚡",
    description: "会议纪要、PPT生成、表格处理",
  },
  {
    id: "chat",
    name: "AI 对话",
    icon: "💬",
    description: "智能对话、知识问答、角色扮演",
  },
  {
    id: "design",
    name: "AI 设计",
    icon: "🎯",
    description: "UI设计、Logo生成、海报制作",
  },
];

export const tools: Tool[] = [
  // AI 写作
  {
    id: "chatgpt",
    name: "ChatGPT",
    description:
      "OpenAI 出品的通用 AI 助手，擅长写作、问答、翻译、编程等多种任务。全球用户量最大的 AI 工具。",
    url: "https://chat.openai.com",
    category: "writing",
    tags: ["写作", "翻译", "通用"],
    pricing: "freemium",
    pricingNote: "免费版可用，Plus $20/月",
    featured: true,
  },
  {
    id: "claude",
    name: "Claude",
    description:
      "Anthropic 出品的 AI 助手，擅长长文写作、深度分析和代码生成。以安全和准确著称。",
    url: "https://claude.ai",
    category: "writing",
    tags: ["写作", "分析", "编程"],
    pricing: "freemium",
    pricingNote: "免费版可用，Pro $20/月",
    featured: true,
  },
  {
    id: "jasper",
    name: "Jasper",
    description:
      "专注营销内容创作的 AI 工具。支持广告文案、博客文章、社交媒体内容一键生成。",
    url: "https://www.jasper.ai",
    category: "writing",
    tags: ["营销", "文案", "社交媒体"],
    pricing: "paid",
    pricingNote: "$49/月起",
  },
  {
    id: "copy-ai",
    name: "Copy.ai",
    description:
      "AI 文案写作助手，提供 90+ 种内容模板，适合电商、广告、社交媒体等场景。",
    url: "https://www.copy.ai",
    category: "writing",
    tags: ["文案", "电商", "模板"],
    pricing: "freemium",
    pricingNote: "免费版 2000 字/月",
  },
  {
    id: "notion-ai",
    name: "Notion AI",
    description:
      "内置在 Notion 中的 AI 助手，帮你写文档、总结笔记、生成待办事项。与 Notion 生态深度整合。",
    url: "https://www.notion.so/product/ai",
    category: "writing",
    tags: ["笔记", "文档", "总结"],
    pricing: "paid",
    pricingNote: "$10/月附加功能",
  },

  // AI 绘画
  {
    id: "midjourney",
    name: "Midjourney",
    description:
      "目前画质最高的 AI 绘画工具之一。通过文字描述生成高质量艺术图片，风格多样。",
    url: "https://www.midjourney.com",
    category: "image",
    tags: ["绘画", "艺术", "高画质"],
    pricing: "paid",
    pricingNote: "$10/月起",
    featured: true,
  },
  {
    id: "dall-e",
    name: "DALL-E 3",
    description:
      "OpenAI 的图片生成模型，内置于 ChatGPT 中。理解力强，生成图片与描述高度一致。",
    url: "https://openai.com/dall-e-3",
    category: "image",
    tags: ["绘画", "生成", "OpenAI"],
    pricing: "freemium",
    pricingNote: "ChatGPT Plus 用户可用",
  },
  {
    id: "stable-diffusion",
    name: "Stable Diffusion",
    description:
      "开源的图片生成模型，可在本地运行。完全免费，可定制性强，社区生态丰富。",
    url: "https://stability.ai",
    category: "image",
    tags: ["开源", "免费", "可定制"],
    pricing: "free",
    pricingNote: "开源免费，本地运行",
  },
  {
    id: "remove-bg",
    name: "Remove.bg",
    description:
      "一键去除图片背景的 AI 工具。上传图片即可自动抠图，5秒出结果。",
    url: "https://www.remove.bg",
    category: "image",
    tags: ["抠图", "去背景", "简单"],
    pricing: "freemium",
    pricingNote: "免费版有分辨率限制",
  },

  // AI 视频
  {
    id: "runway",
    name: "Runway",
    description:
      "强大的 AI 视频生成和编辑工具。支持文字生成视频、视频风格转换、绿幕抠像等。",
    url: "https://runwayml.com",
    category: "video",
    tags: ["视频生成", "编辑", "特效"],
    pricing: "freemium",
    pricingNote: "免费试用，$12/月起",
    featured: true,
  },
  {
    id: "heygen",
    name: "HeyGen",
    description:
      "AI 数字人视频制作工具。输入文字即可生成真人口播视频，支持 100+ 种语言。",
    url: "https://www.heygen.com",
    category: "video",
    tags: ["数字人", "口播", "多语言"],
    pricing: "freemium",
    pricingNote: "免费 1 条，$24/月起",
  },
  {
    id: "capcut",
    name: "剪映 / CapCut",
    description:
      "字节跳动出品的视频编辑工具。AI 字幕、AI 剪辑、AI 特效一应俱全，新手友好。",
    url: "https://www.capcut.com",
    category: "video",
    tags: ["剪辑", "字幕", "免费"],
    pricing: "freemium",
    pricingNote: "基础功能免费",
  },

  // AI 音频
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    description:
      "最逼真的 AI 语音合成工具。支持克隆你自己的声音，生成的语音几乎无法辨别真假。",
    url: "https://elevenlabs.io",
    category: "audio",
    tags: ["语音合成", "声音克隆", "逼真"],
    pricing: "freemium",
    pricingNote: "免费 10000 字符/月",
    featured: true,
  },
  {
    id: "suno",
    name: "Suno",
    description:
      "AI 音乐生成工具。输入描述或歌词，自动生成完整歌曲（含人声），支持多种风格。",
    url: "https://suno.com",
    category: "audio",
    tags: ["音乐", "歌曲", "创作"],
    pricing: "freemium",
    pricingNote: "免费 5 首/天",
  },
  {
    id: "whisper",
    name: "Whisper",
    description:
      "OpenAI 开源的语音识别模型。支持 99 种语言的语音转文字，准确率极高。",
    url: "https://openai.com/research/whisper",
    category: "audio",
    tags: ["语音转文字", "开源", "多语言"],
    pricing: "free",
    pricingNote: "开源免费",
  },

  // AI 编程
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    description:
      "GitHub 出品的 AI 编程助手。在编辑器中实时补全代码，支持几乎所有编程语言。",
    url: "https://github.com/features/copilot",
    category: "coding",
    tags: ["代码补全", "编辑器", "GitHub"],
    pricing: "paid",
    pricingNote: "$10/月",
    featured: true,
  },
  {
    id: "cursor",
    name: "Cursor",
    description:
      "AI 原生的代码编辑器。基于 VS Code 打造，内置 AI 对话、代码生成和重构功能。",
    url: "https://cursor.sh",
    category: "coding",
    tags: ["编辑器", "AI原生", "重构"],
    pricing: "freemium",
    pricingNote: "免费版可用，Pro $20/月",
  },
  {
    id: "replit",
    name: "Replit",
    description:
      "在线编程平台 + AI 编程助手。无需配置环境，打开浏览器就能写代码和部署。",
    url: "https://replit.com",
    category: "coding",
    tags: ["在线", "零配置", "部署"],
    pricing: "freemium",
    pricingNote: "免费版可用",
  },

  // AI 效率
  {
    id: "gamma",
    name: "Gamma",
    description:
      "AI PPT/文档生成工具。输入主题自动生成精美的演示文稿，告别手动排版。",
    url: "https://gamma.app",
    category: "productivity",
    tags: ["PPT", "演示", "自动排版"],
    pricing: "freemium",
    pricingNote: "免费 10 次，$8/月起",
    featured: true,
  },
  {
    id: "otter",
    name: "Otter.ai",
    description:
      "AI 会议纪要工具。自动录音、转文字、生成摘要和待办事项，支持 Zoom/Teams/Meet。",
    url: "https://otter.ai",
    category: "productivity",
    tags: ["会议", "录音", "纪要"],
    pricing: "freemium",
    pricingNote: "免费 300 分钟/月",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    description:
      "AI 搜索引擎。直接给出带来源的准确回答，不用再翻无数网页找信息。",
    url: "https://www.perplexity.ai",
    category: "productivity",
    tags: ["搜索", "问答", "来源"],
    pricing: "freemium",
    pricingNote: "免费版可用，Pro $20/月",
  },

  // AI 对话
  {
    id: "character-ai",
    name: "Character.AI",
    description:
      "AI 角色扮演对话平台。可以和各种虚拟角色聊天，包括历史人物、动漫角色、虚拟朋友。",
    url: "https://character.ai",
    category: "chat",
    tags: ["角色扮演", "聊天", "娱乐"],
    pricing: "freemium",
    pricingNote: "免费版可用",
  },
  {
    id: "poe",
    name: "Poe",
    description:
      "Quora 出品的 AI 聊天平台。集合了 ChatGPT、Claude、Gemini 等多个 AI 模型，一站式使用。",
    url: "https://poe.com",
    category: "chat",
    tags: ["多模型", "聚合", "对比"],
    pricing: "freemium",
    pricingNote: "免费版有限制",
  },

  // AI 设计
  {
    id: "canva-ai",
    name: "Canva AI",
    description:
      "Canva 内置的 AI 设计功能。一键生成海报、Logo、社交媒体图片，模板丰富，新手友好。",
    url: "https://www.canva.com",
    category: "design",
    tags: ["海报", "Logo", "模板"],
    pricing: "freemium",
    pricingNote: "免费版可用，Pro $12.99/月",
    featured: true,
  },
  {
    id: "looka",
    name: "Looka",
    description:
      "AI Logo 设计工具。输入品牌名和偏好，自动生成数十种 Logo 方案。",
    url: "https://looka.com",
    category: "design",
    tags: ["Logo", "品牌", "自动"],
    pricing: "paid",
    pricingNote: "$20 起（一次性）",
  },
  {
    id: "figma-ai",
    name: "Figma AI",
    description:
      "Figma 内置的 AI 设计功能。支持自动布局、AI 生成设计稿、智能组件建议。",
    url: "https://www.figma.com",
    category: "design",
    tags: ["UI", "设计稿", "协作"],
    pricing: "freemium",
    pricingNote: "免费版可用",
  },
];

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter((tool) => tool.category === categoryId);
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((tool) => tool.featured);
}

export function getCategoryById(categoryId: string): Category | undefined {
  return categories.find((cat) => cat.id === categoryId);
}
