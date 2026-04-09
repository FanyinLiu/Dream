export interface Model {
  id: string;
  name: string;
  icon: string;
  free?: boolean;
}

export const MODELS: { tier: string; models: Model[] }[] = [
  {
    tier: "免费模型",
    models: [
      { id: "openai/gpt-4o-mini", name: "GPT-4o mini", icon: "◎", free: true },
      { id: "qwen/qwen3-235b-a22b-2507", name: "Qwen3 235B", icon: "◈", free: true },
      { id: "z-ai/glm-4.5-air:free", name: "GLM-4.5 Air", icon: "◆", free: true },
      { id: "google/gemini-2.0-flash-001", name: "Gemini 2.0 Flash", icon: "◆", free: true },
    ],
  },
  {
    tier: "进阶模型",
    models: [
      { id: "deepseek/deepseek-chat", name: "DeepSeek V3", icon: "◈" },
      { id: "openai/gpt-4.1-mini", name: "GPT-4.1 mini", icon: "◎" },
      { id: "google/gemini-2.5-flash", name: "Gemini 2.5 Flash", icon: "◆" },
      { id: "anthropic/claude-3-haiku", name: "Claude 3 Haiku", icon: "Ⓐ" },
      { id: "deepseek/deepseek-r1", name: "DeepSeek R1", icon: "◈" },
    ],
  },
  {
    tier: "旗舰模型",
    models: [
      { id: "openai/gpt-4.1", name: "GPT-4.1", icon: "◎" },
      { id: "google/gemini-2.5-pro", name: "Gemini 2.5 Pro", icon: "◆" },
      { id: "anthropic/claude-sonnet-4-6", name: "Claude Sonnet 4.6", icon: "Ⓐ" },
    ],
  },
];

export const FREE_MODEL_IDS = new Set(
  MODELS.flatMap((g) => g.models.filter((m) => m.free).map((m) => m.id))
);

export const ALL_MODEL_IDS = new Set(
  MODELS.flatMap((g) => g.models.map((m) => m.id))
);

export const DEFAULT_MODEL = MODELS[0].models[0];
