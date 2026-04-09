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
      name: "generate_image",
      description: "Generate an image based on a text description. Use when the user wants to create, draw, design any kind of image, illustration, poster, logo, photo, etc.",
      parameters: {
        type: "object",
        properties: {
          prompt: { type: "string", description: "Detailed English prompt for DALL-E image generation" },
          size: { type: "string", enum: ["1024x1024", "1792x1024", "1024x1792"], description: "Image size" },
        },
        required: ["prompt"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "generate_text",
      description: "Generate long-form text content. Use when the user wants to write an article, essay, email, marketing copy, story, translation, or any substantial text content.",
      parameters: {
        type: "object",
        properties: {
          prompt: { type: "string", description: "The writing task description" },
          style: { type: "string", enum: ["general", "marketing", "academic", "creative", "translate"], description: "Writing style" },
        },
        required: ["prompt"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "recommend_tool",
      description: "Recommend an AI tool for tasks we can't do directly (video, music, 3D, etc). Use when the user wants something we can't generate in-house.",
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

const SYSTEM_PROMPT = `你是 AI Nav 的智能助手。你的工作是帮用户完成 AI 创作任务。

你有以下能力：
1. **generate_image** - 用 DALL-E 3 生成图片（绘画、海报、Logo、插画等）
2. **generate_text** - 用 AI 写文章、文案、翻译、邮件等
3. **recommend_tool** - 推荐外部 AI 工具（视频、音乐、编程等我们暂时不能直接生成的）

规则：
- 用中文和用户交流
- 当用户描述需求时，主动调用对应的工具帮他完成
- 生成图片时，把用户的中文描述翻译成详细的英文 prompt 再调用
- 如果不确定用户要什么，先问清楚再执行
- 保持友好简洁，像一个专业的 AI 创作助手`;

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

      if (toolCall.function.name === "generate_image") {
        try {
          const imgResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt: args.prompt,
            n: 1,
            size: args.size || "1024x1024",
            quality: "standard",
          });
          const image = imgResponse.data?.[0];
          result = { success: true, url: image?.url ?? "", revisedPrompt: image?.revised_prompt ?? "" };
          toolResults.push({ type: "image", data: result });
        } catch (e: unknown) {
          result = { success: false, error: e instanceof Error ? e.message : "Image generation failed" };
          toolResults.push({ type: "image", data: result });
        }
      } else if (toolCall.function.name === "generate_text") {
        try {
          const stylePrompts: Record<string, string> = {
            general: "你是一个专业写作助手。",
            marketing: "你是资深营销文案专家。",
            academic: "你是学术写作专家。",
            creative: "你是创意写作大师。",
            translate: "你是专业翻译。",
          };
          const textResponse = await openai.chat.completions.create({
            model: resolvedModel,
            messages: [
              { role: "system", content: stylePrompts[args.style] || stylePrompts.general },
              { role: "user", content: args.prompt },
            ],
          });
          result = { success: true, text: textResponse.choices[0].message.content };
          toolResults.push({ type: "text", data: result });
        } catch (e: unknown) {
          result = { success: false, error: e instanceof Error ? e.message : "Text generation failed" };
          toolResults.push({ type: "text", data: result });
        }
      } else if (toolCall.function.name === "recommend_tool") {
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
    const message = e instanceof Error ? e.message : "Chat failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
