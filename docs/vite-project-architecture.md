# E:\网页 项目架构文档

> 项目框架：React + Vite + TypeScript
> 记录时间：2026-04-08
> 状态：MVP 搭建中（部分已落地，部分待完成）

---

## 一、目录结构

```
src/
├─ app/                    # 路由入口
├─ assets/                 # 静态资源
├─ components/
│  ├─ category/            # 分类模块组件
│  ├─ common/              # 通用区块组件
│  ├─ layout/              # 布局组件
│  ├─ media/               # 媒体相关组件
│  ├─ recommend/           # 推荐流程组件
│  ├─ sections/            # 页面区块组件
│  ├─ tool/                # 工具模块组件
│  └─ ui/                  # 基础 UI 组件
├─ data/                   # 静态数据源
├─ layouts/                # 全站布局
├─ lib/                    # 工具函数 & 引擎
├─ pages/                  # 页面级组件
├─ types/                  # 类型定义
├─ App.tsx
├─ index.css
└─ main.tsx
```

---

## 二、类型层

**文件**: `src/types/tool.ts`

### 已定义类型（Type / Enum）

| 类型名 | 用途 |
|---|---|
| `CategoryId` | 分类 ID 联合类型 |
| `PriceType` | 定价模式（免费/免费增值/付费） |
| `SkillLevel` | 用户技能等级 |
| `ToolStatus` | 工具状态 |
| `Platform` | 支持平台 |
| `UserType` | 用户类型 |

### 已定义接口（Interface）

| 接口名 | 用途 |
|---|---|
| `Category` | 分类数据结构 |
| `ToolScoreProfile` | 工具评分维度 |
| `Tool` | 核心工具数据结构 |
| `RecommendOption` | 推荐选项 |
| `RecommendQuestion` | 推荐问题 |
| `RecommendScoreResult` | 推荐打分结果 |

---

## 三、数据层

### 3.1 分类数据

**文件**: `src/data/categories.ts`

已有 4 大类：`image` / `video` / `writing` / `coding`

每类包含字段：
- `id` / `slug` / `name` / `icon` / `description`
- `featured` / `sort` / `useCases`

驱动范围：首页分类区、分类页头部、导航分类入口。

### 3.2 工具数据

**文件**: `src/data/tools.ts`

已完成 12 个工具（图片类 + 视频类）：

**图片类（6）**：Midjourney、Leonardo AI、Adobe Firefly、Canva、Ideogram、DreamStudio

**视频类（6）**：Runway、Pika、Kling、HeyGen、Synthesia、CapCut

每个工具具备的字段：

```
id, slug, name, tagline, description,
categories, subcategories, tags,
officialUrl, priceType, priceNote, chineseSupport,
platforms, skillLevel, targetUsers, bestFor, useCases,
pros, cons, featured, status, rating,
logoText, scoreProfile, alternatives
```

### 3.3 推荐问题数据

**文件**: `src/data/recommendQuestions.ts`

问题维度：
- `category` — 用户选择的分类
- `userType` — 用户类型
- `budget` — 预算
- `priority` — 优先级
- `requirements` — 具体需求

额外数据：
- `taskOptionsByCategory` — 按分类动态切换的二级任务选项（图片任务、视频任务、写作任务、编程任务）

### 3.4 站点配置

**文件**: `src/data/site.ts`

包含：网站名称、tagline、description、navItems、footerLinks

驱动范围：Navbar、Footer、SEO 基础信息。

---

## 四、工具函数层

### 4.1 样式工具

**文件**: `src/lib/utils.ts`

使用 `clsx` + `tailwind-merge` 实现 `cn()` 函数，解决 Tailwind class 冲突问题。

### 4.2 推荐引擎（TDD 起步）

**文件**: `src/lib/recommendationEngine.test.ts`

已建立测试入口，目标实现：
- `getRecommendations()` — 基于用户答案返回推荐结果
- 支持规则：中文优先 / 新手优先 / API 优先等

当前状态：红灯（测试先行，实现文件 `recommendationEngine.ts` 待编写）。

---

## 五、组件层设计

### 5.1 通用组件 `src/components/common/`

| 组件 | 职责 |
|---|---|
| `PageHeader` | 页面头部 |
| `Breadcrumb` | 面包屑导航 |
| `SectionHeader` | 区块标题 |
| `EmptyState` | 空状态展示 |

### 5.2 分类组件 `src/components/category/`

| 组件 | 职责 |
|---|---|
| `CategoryCard` | 分类卡片 |
| `CategoryStrip` | 分类横条 |

### 5.3 工具组件 `src/components/tool/`

| 组件 | 职责 |
|---|---|
| `ToolCard` | 工具卡片 |
| `ToolMeta` | 工具元信息 |
| `ToolFeatureList` | 工具特性列表 |
| `ToolComparisonMiniTable` | 工具对比迷你表格 |

### 5.4 推荐组件 `src/components/recommend/`

| 组件 | 职责 |
|---|---|
| `QuestionStep` | 问题步骤 |
| `QuestionOption` | 问题选项 |
| `RecommendationCard` | 推荐结果卡片 |
| `RecommendationSummary` | 推荐结果摘要 |

---

## 六、页面层设计

| 页面 | 路径 |
|---|---|
| `HomePage` | `/` |
| `CategoryPage` | `/category/:id` |
| `ToolDetailPage` | `/tool/:slug` |
| `RecommendPage` | `/recommend` |
| `RecommendResultPage` | `/recommend/result` |

布局：`AppLayout`（`src/layouts/`）
路由入口：`router.tsx`（`src/app/`）

---

## 七、架构总览图

```
React + Vite + TypeScript
│
├─ 类型层
│  └─ src/types/tool.ts
│     （CategoryId, PriceType, SkillLevel, Tool, Category,
│       ToolScoreProfile, RecommendQuestion, RecommendScoreResult）
│
├─ 数据层
│  ├─ src/data/categories.ts        ← 4 大分类
│  ├─ src/data/tools.ts             ← 12 个工具（图片+视频）
│  ├─ src/data/recommendQuestions.ts ← 推荐问答配置
│  └─ src/data/site.ts              ← 站点全局配置
│
├─ 工具层
│  ├─ src/lib/utils.ts              ← cn() 样式合并
│  └─ src/lib/recommendationEngine  ← 推荐引擎（TDD 中）
│
├─ 页面层
│  ├─ src/pages/                    ← 5 个页面组件
│  ├─ src/layouts/                  ← AppLayout
│  └─ src/app/                      ← router.tsx
│
└─ 组件层
   ├─ src/components/common/        ← 通用区块
   ├─ src/components/category/      ← 分类模块
   ├─ src/components/tool/          ← 工具模块
   └─ src/components/recommend/     ← 推荐流程
```

---

## 八、待完成部分

### 8.1 页面代码

目录已建，代码待写：
- `router.tsx`
- `AppLayout.tsx`
- 5 个页面组件（HomePage、CategoryPage、ToolDetailPage、RecommendPage、RecommendResultPage）

### 8.2 推荐引擎实现

- `src/lib/recommendationEngine.ts` — 核心推荐逻辑

### 8.3 写作类 & 编程类工具数据

`tools.ts` 还差 12 个工具：

**写作类（6）**：ChatGPT、Claude、Kimi、Notion AI、Jasper、Grammarly

**编程类（6）**：GitHub Copilot、Cursor、Windsurf、Replit、Tabnine、Devin

### 8.4 路由接入

当前站点仍为原 landing page，尚未切换到新 MVP 多页面路由。
