export const siteConfig = {
  name: "AI Nav",
  tagline: "发现最好用的 AI 工具",
  description:
    "精选优质 AI 工具导航，帮你按场景快速找到最适合的 AI 工具。写作、绘画、视频、编程，一站搞定。",
  keywords: ["AI工具", "AI导航", "人工智能", "ChatGPT", "Midjourney", "AI写作", "AI绘画"],

  navItems: [
    { label: "首页", href: "/" },
    { label: "对话", href: "/chat" },
    { label: "创作", href: "/create" },
    { label: "分类", href: "/categories" },
    { label: "关于", href: "/about" },
  ],

  footerLinks: [
    {
      title: "导航",
      links: [
        { label: "首页", href: "/" },
        { label: "全部分类", href: "/categories" },
        { label: "智能推荐", href: "/recommend" },
      ],
    },
    {
      title: "分类",
      links: [
        { label: "AI 绘画", href: "/category/image" },
        { label: "AI 视频", href: "/category/video" },
        { label: "AI 写作", href: "/category/writing" },
        { label: "AI 编程", href: "/category/coding" },
      ],
    },
  ],
};
