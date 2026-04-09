import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  const { prompt, size = "1024x1024" } = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  try {
    const openai = new OpenAI({ apiKey, baseURL: "https://openrouter.ai/api/v1" });
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: size as "1024x1024" | "1792x1024" | "1024x1792",
      quality: "standard",
    });

    const image = response.data?.[0];
    return NextResponse.json({
      url: image?.url ?? "",
      revisedPrompt: image?.revised_prompt ?? "",
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Image generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
