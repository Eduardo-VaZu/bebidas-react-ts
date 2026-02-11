import { createOpenAI } from "@ai-sdk/openai";
import { env } from "./env";

export const openRouterClient = createOpenAI({
  apiKey: env.openRouterApiKey,
  baseURL: "https://openrouter.ai/api/v1",
  headers: {
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Bebidas React TS',
    },
});
