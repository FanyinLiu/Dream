"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Locale = "en" | "zh";

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.create": "Create",
    "nav.categories": "Categories",
    "nav.recommend": "Recommend",
    "nav.top": "Rankings",
    "nav.compare": "Compare",
    "nav.pricing": "Pricing",
    "nav.about": "About",
    "nav.login": "Login",
    "nav.favorites": "Favorites",

    // Hero
    "hero.title.1": "Find the Best",
    "hero.title.2": "AI Tools",
    "hero.subtitle": "Tell me what you need, I'll find the right AI tool for you",
    "hero.placeholder": "Ask me anything...",
    "hero.scene.report": "Write Report",
    "hero.scene.poster": "Make Poster",
    "hero.scene.video": "Edit Video",
    "hero.scene.code": "Write Code",
    "hero.scene.music": "Make Music",
    "hero.scene.website": "Build Site",

    // Quick actions
    "action.recommend": "Recommend",
    "action.compare": "Compare",
    "action.writing": "Writing",
    "action.ideas": "Ideas",
    "action.chat": "Chat",

    // Model selector
    "model.title": "Select Model",
    "model.free": "Free Models",
    "model.mid": "Advanced Models",
    "model.flagship": "Flagship Models",
    "model.upgrade": "Upgrade to Pro for all models →",
    "model.comingSoon": "More models coming soon",

    // Categories
    "cat.browse": "Browse by Category",
    "cat.browseDesc": "Find the right AI tool for your workflow.",
    "cat.all": "All Categories",
    "cat.tools": "tools",
    "cat.viewAll": "View All",
    "cat.filter.all": "All",
    "cat.filter.free": "Free",
    "cat.filter.freemium": "Free Trial",
    "cat.filter.chinese": "Chinese OK",
    "cat.filter.beginner": "Beginner",
    "cat.filter.api": "Has API",
    "cat.filter.mobile": "Mobile",
    "cat.sort.recommend": "Recommended",
    "cat.sort.rating": "Top Rated",
    "cat.sort.free": "Free First",
    "cat.sort.easy": "Easiest",
    "cat.sort": "Sort",
    "cat.smartRecommend": "Not sure? Try Smart Recommend →",
    "cat.noresult": "No tools match",
    "cat.clearFilter": "Clear filters",
    "cat.otherCats": "Other Categories",
    "cat.backToCategories": "Back to categories",

    // Tool detail
    "tool.visit": "Visit",
    "tool.favorite": "Favorite",
    "tool.advantages": "Advantages",
    "tool.info": "Info",
    "tool.chineseSupport": "Chinese Support",
    "tool.supported": "Supported",
    "tool.notSupported": "Not Supported",
    "tool.difficulty": "Difficulty",
    "tool.platforms": "Platforms",
    "tool.rating": "Rating",
    "tool.useCases": "Use Cases",
    "tool.bestFor": "Best For",
    "tool.scores": "Score Breakdown",
    "tool.scoresNote": "Based on editorial hands-on testing, 1-10",
    "tool.lastUpdated": "Last updated",
    "tool.editorReview": "— Editor's Take",
    "tool.quickCompare": "Quick Compare",
    "tool.alternatives": "Similar Tools",
    "tool.pricing": "Pricing",
    "tool.details": "Details",
    "tool.backHome": "Back",
    "tool.ease": "Ease of Use",
    "tool.quality": "Output Quality",
    "tool.cost": "Value",
    "tool.chinese": "Chinese",
    "tool.features": "Features",

    // Recommend
    "rec.title": "Smart Recommendation",
    "rec.subtitle": "Answer 5 questions, find your perfect AI tool",
    "rec.result": "Results",
    "rec.resultTitle": "Your Top Picks",
    "rec.yourNeeds": "Your needs:",
    "rec.bestPick": "Best Match",
    "rec.others": "Other Picks",
    "rec.workflow": "Recommended Workflow",
    "rec.retry": "Start Over",
    "rec.browseAll": "Browse All",
    "rec.askAI": "Ask AI",
    "rec.suitable": "Best for",
    "rec.limitation": "Limitation",
    "rec.start": "Start Smart Recommend",
    "rec.browse": "Browse Categories",

    // Rankings
    "top.title": "AI Tool Rankings",
    "top.subtitle": "Curated picks to help you find the best fit",
    "top.beginner": "Best for Beginners",
    "top.beginnerDesc": "Zero learning curve, easy to get started",
    "top.chinese": "Best for Chinese Users",
    "top.chineseDesc": "Chinese interface, great Chinese support",
    "top.free": "Best Free AI Tools",
    "top.freeDesc": "Completely free or generous free tier",
    "top.featured": "Editor's Choice",
    "top.featuredDesc": "Hand-picked favorites from our editorial team",

    // Compare
    "compare.title": "Tool Comparison",
    "compare.subtitle": "Compare up to 3 tools side by side",
    "compare.search": "Search tool name...",
    "compare.popular": "Popular Comparisons",
    "compare.add": "Add",
    "compare.price": "Price",
    "compare.editorTake": "Editor's Take",

    // Pricing
    "pricing.title": "Choose Your Plan",
    "pricing.subtitle": "Unlock all AI models for a more powerful assistant",
    "pricing.free": "Free",
    "pricing.freePrice": "$0",
    "pricing.freeLabel": "Free forever",
    "pricing.pro": "Pro",
    "pricing.proPrice": "$2.99",
    "pricing.proLabel": "/month",
    "pricing.proYearly": "Yearly $29.9 (save $6)",
    "pricing.currentPlan": "Current Plan",
    "pricing.upgrade": "Upgrade to Pro",

    // Create
    "create.title": "AI Workshop",
    "create.subtitle": "Choose a creation type, let AI help you",
    "create.writing": "AI Writing",
    "create.image": "AI Image",
    "create.music": "AI Music",
    "create.video": "AI Video",
    "create.generate": "Generate",
    "create.generating": "Generating...",
    "create.copy": "Copy",
    "create.copied": "Copied",

    // Auth
    "auth.login": "Login",
    "auth.register": "Register",
    "auth.email": "Email address",
    "auth.password": "Password (min 6 chars)",
    "auth.noAccount": "No account?",
    "auth.hasAccount": "Have an account?",
    "auth.terms": "By logging in you agree to our terms of service",
    "auth.registerSuccess": "Registered! Auto logged in.",
    "auth.wrongCredentials": "Wrong email or password",
    "auth.minPassword": "Password must be at least 6 characters",
    "auth.processing": "Processing...",

    // Favorites
    "fav.title": "My Favorites",
    "fav.loginPrompt": "Login to save favorites",
    "fav.empty": "No favorites yet",
    "fav.discover": "Discover tools →",
    "fav.count": "tools saved",
    "fav.loading": "Loading...",

    // Common
    "common.learnMore": "Learn More",
    "common.backToTop": "↑ Back to Top",
    "common.notSure": "Not sure what to pick?",
    "common.notSureDesc": "Answer 5 questions, AI finds the best tool from 45+ options",

    // Footer
    "footer.tagline": "Find the Best AI Tools",

    // About
    "about.title": "About AI Nav",
    "about.whoTitle": "Who Are We?",
    "about.whoP1": "AI Nav is a curated AI tool directory. New AI tools launch every day, but most people don't know which to use or how to choose.",
    "about.whoP2": "Our goal is simple: help you find the best AI tool for your use case, without wasting money or time.",
    "about.howTitle": "How We Pick Tools",
    "about.howHands": "Hands-on testing",
    "about.howHandsDesc": " \u2014 Every tool is tested through real usage",
    "about.howHonest": "Honest reviews",
    "about.howHonestDesc": " \u2014 We don't charge listing fees",
    "about.howUpdated": "Regular updates",
    "about.howUpdatedDesc": " \u2014 Tool info and new tools are updated regularly",
    "about.contactTitle": "Contact Us",
    "about.contactP1": "If you have suggestions or want to recommend a great AI tool, feel free to reach out.",
    "about.contactP2": "We also welcome AI tool developers to submit their products.",

    // Chatbox
    "chat.assistant": "AI Assistant",
    "chat.fullscreen": "Fullscreen",
    "chat.greeting": "Hi! I'm your AI assistant. I can help with image generation, writing, and tool recommendations.",
    "chat.placeholder": "Type your question...",
    "chat.viewFull": "View full image",
    "chat.viewCategory": "View",
    "chat.sorry": "Sorry, an error occurred:",
    "chat.retry": "Please try again",

    // Recommend extra
    "rec.dontKnow": "Not sure what to use?",
    "rec.dontKnowDesc": "Answer a few simple questions to find the best AI tool for you.",
    "rec.step": "Step",
    "rec.prev": "\u2190 Previous",
    "rec.viewResults": "View Results",
    "rec.next": "Next \u2192",
    "rec.noResults": "No matching results",
    "rec.adjustFilters": "Try adjusting your selection criteria",
    "rec.match": "Match",
    "rec.visitSite": "Visit Site",
    "rec.site": "Site",

    // Compare extra
    "compare.rating": "Rating",
    "compare.chineseSupport": "Chinese",
    "compare.difficulty": "Difficulty",
    "compare.platforms": "Platforms",
    "compare.beginner": "Beginner",
    "compare.intermediate": "Intermediate",
    "compare.advanced": "Advanced",

    // Tool detail extra
    "tool.skillBeginner": "Beginner Friendly",
    "tool.skillIntermediate": "Some Experience Needed",
    "tool.skillAdvanced": "Advanced Users",

    // Create extra
    "create.writingTab": "AI Writing",
    "create.imageTab": "AI Image",
    "create.musicTab": "AI Music",
    "create.videoTab": "AI Video",
    "create.recommend": "Picks",
    "create.curated": "Here are our curated",
    "create.curatedSuffix": "tools, click for details",
    "create.viewAllTools": "View all",
    "create.tools": "tools",

    // Category page extra
    "cat.total": "total",
    "cat.toolsCount": "tools",

    // ToolCard
    "toolcard.details": "Details",
    "toolcard.visitSite": "Visit Site",

    // Pricing features (keep short)
    "pricing.freeFeature1": "4 free AI models",
    "pricing.freeFeature2": "GPT-4o mini / Qwen3 / GLM / Gemini",
    "pricing.freeFeature3": "Tool recommendations & comparisons",
    "pricing.freeFeature4": "Smart recommendation quiz",
    "pricing.freeFeature5": "Unlimited conversations",
    "pricing.proFeature1": "All 12 AI models",
    "pricing.proFeature2": "GPT-4.1 / Claude Sonnet 4.6 / Gemini 2.5 Pro",
    "pricing.proFeature3": "DeepSeek R1 deep reasoning",
    "pricing.proFeature4": "Priority response speed",
    "pricing.proFeature5": "Favorites & history sync",
    "pricing.proFeature6": "First access to new models",
    "pricing.recommended": "Recommended",
    "pricing.paymentSoon": "Payment feature coming soon",
  },
  zh: {
    "nav.home": "首页",
    "nav.create": "创作",
    "nav.categories": "分类",
    "nav.recommend": "推荐",
    "nav.top": "排行",
    "nav.compare": "对比",
    "nav.pricing": "定价",
    "nav.about": "关于",
    "nav.login": "登录",
    "nav.favorites": "收藏",

    "hero.title.1": "发现最好用的",
    "hero.title.2": "AI 工具",
    "hero.subtitle": "告诉我你想做什么，帮你找到最趁手的 AI 工具",
    "hero.placeholder": "问我任何问题...",
    "hero.scene.report": "写周报",
    "hero.scene.poster": "做海报",
    "hero.scene.video": "剪视频",
    "hero.scene.code": "写代码",
    "hero.scene.music": "做音乐",
    "hero.scene.website": "建网站",

    "action.recommend": "工具推荐",
    "action.compare": "工具对比",
    "action.writing": "AI 写作",
    "action.ideas": "创意灵感",
    "action.chat": "对话",

    "model.title": "选择模型",
    "model.free": "免费模型",
    "model.mid": "进阶模型",
    "model.flagship": "旗舰模型",
    "model.upgrade": "升级 Pro 解锁全部模型 →",
    "model.comingSoon": "更多模型即将开放",

    "cat.browse": "按分类浏览",
    "cat.browseDesc": "找到适合你场景的专属 AI 工具。",
    "cat.all": "AI 工具分类",
    "cat.tools": "款工具",
    "cat.viewAll": "查看全部",
    "cat.filter.all": "全部",
    "cat.filter.free": "免费",
    "cat.filter.freemium": "免费试用",
    "cat.filter.chinese": "中文友好",
    "cat.filter.beginner": "新手友好",
    "cat.filter.api": "支持 API",
    "cat.filter.mobile": "手机可用",
    "cat.sort.recommend": "推荐优先",
    "cat.sort.rating": "评分优先",
    "cat.sort.free": "免费优先",
    "cat.sort.easy": "易用优先",
    "cat.sort": "排序",
    "cat.smartRecommend": "不知道怎么选？去做智能推荐 →",
    "cat.noresult": "没有符合条件的工具",
    "cat.clearFilter": "清除筛选",
    "cat.otherCats": "其他分类",
    "cat.backToCategories": "返回分类",

    "tool.visit": "访问",
    "tool.favorite": "收藏工具",
    "tool.advantages": "优势",
    "tool.info": "基本信息",
    "tool.chineseSupport": "中文支持",
    "tool.supported": "支持",
    "tool.notSupported": "不支持",
    "tool.difficulty": "上手难度",
    "tool.platforms": "平台",
    "tool.rating": "评分",
    "tool.useCases": "适用场景",
    "tool.bestFor": "最适合",
    "tool.scores": "评分维度",
    "tool.scoresNote": "基于编辑实际体验评分，1-10 分",
    "tool.lastUpdated": "最近更新",
    "tool.editorReview": "—— 编辑点评",
    "tool.quickCompare": "平替对比",
    "tool.alternatives": "相似工具推荐",
    "tool.pricing": "定价",
    "tool.details": "查看详情",
    "tool.backHome": "返回",
    "tool.ease": "易用性",
    "tool.quality": "输出质量",
    "tool.cost": "性价比",
    "tool.chinese": "中文友好度",
    "tool.features": "功能丰富度",

    "rec.title": "智能推荐",
    "rec.subtitle": "回答 5 个问题，找到最适合你的 AI 工具",
    "rec.result": "推荐结果",
    "rec.resultTitle": "为你精选的工具",
    "rec.yourNeeds": "你的需求：",
    "rec.bestPick": "最佳推荐",
    "rec.others": "其他推荐",
    "rec.workflow": "推荐工作流",
    "rec.retry": "重新选择",
    "rec.browseAll": "浏览全部分类",
    "rec.askAI": "问 AI 助手",
    "rec.suitable": "适合",
    "rec.limitation": "局限",
    "rec.start": "开始智能推荐",
    "rec.browse": "按分类浏览",

    "top.title": "AI 工具排行榜",
    "top.subtitle": "按场景精选，帮你快速找到最合适的",
    "top.beginner": "最适合新手的 AI 工具",
    "top.beginnerDesc": "零基础也能上手，学习成本最低",
    "top.chinese": "最适合中文用户的 AI 工具",
    "top.chineseDesc": "中文界面、中文支持好、国内可用",
    "top.free": "最佳免费 AI 工具",
    "top.freeDesc": "完全免费或免费额度慷慨，不花钱也能用好",
    "top.featured": "编辑精选",
    "top.featuredDesc": "编辑团队亲测推荐，各领域最值得一试的工具",

    "compare.title": "工具对比",
    "compare.subtitle": "最多选 3 款工具，直观对比差异",
    "compare.search": "搜索工具名称...",
    "compare.popular": "热门对比",
    "compare.add": "添加",
    "compare.price": "价格",
    "compare.editorTake": "编辑点评",

    "pricing.title": "选择你的计划",
    "pricing.subtitle": "解锁全部 AI 模型，获得更强大的 AI 助手",
    "pricing.free": "免费版",
    "pricing.freePrice": "¥0",
    "pricing.freeLabel": "永久免费",
    "pricing.pro": "Pro 会员",
    "pricing.proPrice": "¥19.9",
    "pricing.proLabel": "/月",
    "pricing.proYearly": "年付 ¥199（省 ¥40）",
    "pricing.currentPlan": "当前方案",
    "pricing.upgrade": "升级 Pro",

    "create.title": "AI 创作工坊",
    "create.subtitle": "选择创作类型，让 AI 帮你完成",
    "create.writing": "AI 写作",
    "create.image": "AI 绘画",
    "create.music": "AI 音乐",
    "create.video": "AI 视频",
    "create.generate": "开始写作",
    "create.generating": "生成中...",
    "create.copy": "复制全文",
    "create.copied": "已复制",

    "auth.login": "登录",
    "auth.register": "注册",
    "auth.email": "邮箱地址",
    "auth.password": "密码（至少 6 位）",
    "auth.noAccount": "还没有账号？",
    "auth.hasAccount": "已有账号？",
    "auth.terms": "登录即表示同意我们的服务条款",
    "auth.registerSuccess": "注册成功，已自动登录",
    "auth.wrongCredentials": "邮箱或密码错误",
    "auth.minPassword": "密码至少 6 位",
    "auth.processing": "处理中...",

    "fav.title": "我的收藏",
    "fav.loginPrompt": "登录后即可收藏工具，随时查看",
    "fav.empty": "还没有收藏",
    "fav.discover": "去发现工具 →",
    "fav.count": "款工具已收藏",
    "fav.loading": "加载中...",

    "common.learnMore": "了解更多",
    "common.backToTop": "↑ 回到顶部",
    "common.notSure": "不知道用哪个？",
    "common.notSureDesc": "回答 5 个问题，AI 帮你从 45 款工具中找到最适合你的",

    "footer.tagline": "发现最好用的 AI 工具",

    "about.title": "关于 AI Nav",
    "about.whoTitle": "我们是谁？",
    "about.whoP1": "AI Nav 是一个精选 AI 工具导航站。每天都有大量新的 AI 工具诞生，但大多数人不知道该用哪个、怎么选。",
    "about.whoP2": "我们的目标很简单：帮你按使用场景，快速找到最适合的 AI 工具，不花冤枉钱，不浪费时间。",
    "about.howTitle": "我们怎么选工具？",
    "about.howHands": "亲自体验",
    "about.howHandsDesc": " — 每个工具都经过实际使用测试",
    "about.howHonest": "真实评价",
    "about.howHonestDesc": " — 不收取工具方的上架费用",
    "about.howUpdated": "持续更新",
    "about.howUpdatedDesc": " — 定期更新工具信息和新增优质工具",
    "about.contactTitle": "联系我们",
    "about.contactP1": "如果你有任何建议，或者想推荐一款好用的 AI 工具，欢迎联系我们。",
    "about.contactP2": "我们也欢迎 AI 工具开发者主动提交自己的产品。",

    "chat.assistant": "AI 助手",
    "chat.fullscreen": "全屏",
    "chat.greeting": "你好！我是 AI 助手，可以帮你生图、写作、推荐工具。",
    "chat.placeholder": "输入你的问题...",
    "chat.viewFull": "查看大图 ↗",
    "chat.viewCategory": "查看",
    "chat.sorry": "抱歉，出错了：",
    "chat.retry": "请重试",

    "rec.dontKnow": "不知道用什么？",
    "rec.dontKnowDesc": "回答几个简单问题，帮你找到最合适的 AI 工具。",
    "rec.step": "步",
    "rec.prev": "← 上一步",
    "rec.viewResults": "查看推荐结果",
    "rec.next": "下一步 →",
    "rec.noResults": "暂无匹配结果",
    "rec.adjustFilters": "试试调整选择条件",
    "rec.match": "匹配度",
    "rec.visitSite": "访问官网",
    "rec.site": "官网",

    "compare.rating": "评分",
    "compare.chineseSupport": "中文支持",
    "compare.difficulty": "难度",
    "compare.platforms": "平台",
    "compare.beginner": "新手",
    "compare.intermediate": "进阶",
    "compare.advanced": "高阶",

    "tool.skillBeginner": "新手友好",
    "tool.skillIntermediate": "需要一定基础",
    "tool.skillAdvanced": "进阶用户",

    "create.writingTab": "AI 写作",
    "create.imageTab": "AI 绘画",
    "create.musicTab": "AI 音乐",
    "create.videoTab": "AI 视频",
    "create.recommend": "推荐",
    "create.curated": "以下是我们精选的",
    "create.curatedSuffix": "工具，点击直达详情",
    "create.viewAllTools": "查看全部",
    "create.tools": "工具",

    "cat.total": "共",
    "cat.toolsCount": "款工具",

    "toolcard.details": "查看详情",
    "toolcard.visitSite": "直达官网",

    "pricing.freeFeature1": "4 个免费 AI 模型",
    "pricing.freeFeature2": "GPT-4o mini / Qwen3 / GLM / Gemini",
    "pricing.freeFeature3": "工具推荐和对比",
    "pricing.freeFeature4": "智能推荐问卷",
    "pricing.freeFeature5": "无限次对话",
    "pricing.proFeature1": "全部 12 个 AI 模型",
    "pricing.proFeature2": "GPT-4.1 / Claude Sonnet 4.6 / Gemini 2.5 Pro",
    "pricing.proFeature3": "DeepSeek R1 深度推理",
    "pricing.proFeature4": "优先响应速度",
    "pricing.proFeature5": "收藏和历史记录同步",
    "pricing.proFeature6": "未来新模型第一时间解锁",
    "pricing.recommended": "推荐",
    "pricing.paymentSoon": "支付功能即将上线",
  },
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved && (saved === "en" || saved === "zh")) {
      setLocaleState(saved);
    }
    // Default stays "en" if no saved preference
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("locale", l);
  }, []);

  const t = useCallback((key: string) => {
    return translations[locale][key] ?? translations.en[key] ?? key;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
