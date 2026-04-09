import { NextRequest } from "next/server";
import OpenAI from "openai";
import type { ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources/chat/completions";

const ALLOWED_MODELS = new Set([
  // 免费
  "qwen/qwen3-235b-a22b-2507",
  "z-ai/glm-4.5-air:free",
  "google/gemini-2.0-flash-001",
  "openai/gpt-4o-mini",
  // 付费
  "deepseek/deepseek-chat",
  "deepseek/deepseek-r1",
  "google/gemini-2.5-flash",
  "openai/gpt-4.1-mini",
  "anthropic/claude-3-haiku",
  "openai/gpt-4.1",
  "google/gemini-2.5-pro",
  "anthropic/claude-sonnet-4-6",
]);

const DEFAULT_MODEL = "openai/gpt-4o-mini";

const tools: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "recommend_tool",
      description: "Recommend AI tools from our site's database. Use when users ask about AI tools, want recommendations, comparisons, or need help choosing the right tool for their task. Categories: image (AI绘画), video (AI视频), writing (AI写作), coding (AI编程), music (AI音乐), webdev (AI建站), prompt (提示词).",
      parameters: {
        type: "object",
        properties: {
          task: { type: "string", description: "What the user wants to do" },
          category: { type: "string", enum: ["image", "video", "writing", "coding", "music", "webdev", "prompt"], description: "Best matching category" },
        },
        required: ["task", "category"],
      },
    },
  },
];

const SYSTEM_PROMPT = `你是 AI Nav 的智能助手，一个 AI 工具导航网站的 Copilot。

你的核心能力：
1. **推荐 AI 工具** - 根据用户需求推荐站内收录的 AI 工具（调用 recommend_tool）
2. **对比分析** - 帮用户对比不同 AI 工具的优缺点、价格、适用场景
3. **AI 写作** - 帮用户写文案、文章、翻译等文本内容
4. **创意灵感** - 提供 AI 创作思路和灵感
5. **答疑解惑** - 解答关于 AI 工具使用的问题

规则：
- 用中文和用户交流，保持友好专业
- 当用户想生成图片/视频/音乐时，推荐站内对应的工具而不是自己生成
- 对比工具时要客观，列出各自优缺点
- 推荐工具时调用 recommend_tool 让用户可以直接跳转到工具页面
- 保持简洁，不要长篇大论`;

function createClient() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY not configured");
  return new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
  });
}

export async function POST(req: NextRequest) {
  let openai: OpenAI;
  try {
    openai = createClient();
  } catch {
    return Response.json({ error: "API key not configured" }, { status: 500 });
  }

  const { messages, model } = await req.json() as {
    messages: ChatCompletionMessageParam[];
    model?: string;
  };

  const resolvedModel = model && ALLOWED_MODELS.has(model) ? model : DEFAULT_MODEL;

  try {
    const response = await openai.chat.completions.create({
      model: resolvedModel,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      tools,
      tool_choice: "auto",
    });

    const choice = response.choices[0];
    const assistantMessage = choice.message;

    if (!assistantMessage.tool_calls?.length) {
      return Response.json({ reply: assistantMessage.content, toolResults: [] });
    }

    const toolResults: Array<{ type: string; data: Record<string, unknown> }> = [];
    const toolMessages: ChatCompletionMessageParam[] = [
      ...messages,
      assistantMessage as ChatCompletionMessageParam,
    ];

    for (const toolCall of assistantMessage.tool_calls) {
      if (toolCall.type !== "function") continue;
      const args = JSON.parse(toolCall.function.arguments);
      let result: Record<string, unknown> = {};

      if (toolCall.function.name === "recommend_tool") {
        result = { success: true, task: args.task, category: args.category };
        toolResults.push({ type: "recommend", data: result });
      }

      toolMessages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
      });
    }

    const finalResponse = await openai.chat.completions.create({
      model: resolvedModel,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...toolMessages],
    });

    return Response.json({
      reply: finalResponse.choices[0].message.content,
      toolResults,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Chat failed";
    // Friendly error messages for common issues
    if (msg.includes("rate limit") || msg.includes("429")) {
      return Response.json({ error: "当前模型请求繁忙，请稍后再试或切换其他模型" }, { status: 429 });
    }
    if (msg.includes("context length") || msg.includes("too long")) {
      return Response.json({ error: "对话内容过长，请开启新对话" }, { status: 400 });
    }
    return Response.json({ error: `请求失败：${msg}` }, { status: 500 });
  }
}
