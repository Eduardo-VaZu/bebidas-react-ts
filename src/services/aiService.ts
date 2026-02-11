import { streamText } from "ai"
import type { ChatMessage } from "../stores/aiSlice";
import { openRouterClient } from "../lib/openrouter.client";
import { env } from "../lib/env";

export const sendChat = async (messages: ChatMessage[]) => {
  const prompt = messages.map(m => `${m.role}: ${m.content}`).join('\n') + '\nassistant:';
  const result = await streamText({
    model: openRouterClient(env.openRouterModel),
    prompt,
    maxRetries: 0,
  })
  return result.textStream
}
