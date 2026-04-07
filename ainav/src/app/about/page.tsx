import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于 AI Nav",
  description: "AI Nav 是一个精选 AI 工具导航站，帮你按场景找到最好用的 AI 工具。",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">关于 AI Nav</h1>

      <div className="prose prose-gray max-w-none">
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            我们是谁？
          </h2>
          <p className="text-gray-600 leading-relaxed">
            AI Nav 是一个精选 AI
            工具导航站。每天都有大量新的 AI
            工具诞生，但大多数人不知道该用哪个、怎么选。
          </p>
          <p className="text-gray-600 leading-relaxed mt-3">
            我们的目标很简单：帮你按使用场景，快速找到最适合的 AI
            工具，不花冤枉钱，不浪费时间。
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            我们怎么选工具？
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li>
              <strong>亲自体验</strong> — 每个工具都经过实际使用测试
            </li>
            <li>
              <strong>真实评价</strong> — 不收取工具方的上架费用
            </li>
            <li>
              <strong>持续更新</strong> — 定期更新工具信息和新增优质工具
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            联系我们
          </h2>
          <p className="text-gray-600 leading-relaxed">
            如果你有任何建议，或者想推荐一款好用的 AI 工具，欢迎联系我们。
          </p>
          <p className="text-gray-600 leading-relaxed mt-2">
            我们也欢迎 AI 工具开发者主动提交自己的产品。
          </p>
        </div>
      </div>
    </div>
  );
}
