import type { StateCreator } from "zustand";
import { chatMessageSchema } from "../schema/chat-schema";
import { sendChat } from "../services/aiService";

type CharRole = 'user' | 'assistant'

export interface ChatMessage {
    role: CharRole;
    content: string;
}

export type AiSliceType = {
    message: ChatMessage[]
    loading: boolean;
    error: string | null;
    sendMessage: (content: string) => Promise<void>;
}

export const createAiSlice: StateCreator<AiSliceType> = (set, get) => ({
    message: [],
    loading: false,
    error: null,
    sendMessage: async (content) => {
        const validation = chatMessageSchema.parse({ content })
        if (!validation) {
            set({ error: 'Invalid message content' });
            return
        }

        const userMessage: ChatMessage = {
            role: 'user',
            content,
        }
        set((state) => ({
            message: [...state.message, userMessage],
            loading: true,
            error: null,
        }))
        try {
            const stream = await sendChat([
                ...get().message,
                userMessage,
            ]);

            // Añadir mensaje inicial vacío del asistente
            set((state) => ({
                message: [
                    ...state.message,
                    { role: 'assistant', content: '' },
                ],
            }));

            let fullContent = '';
            for await (const chunk of stream) {
                fullContent += chunk;
                set((state) => {
                    const newMessages = [...state.message];
                    const lastMessageIndex = newMessages.length - 1;
                    if (newMessages[lastMessageIndex].role === 'assistant') {
                        newMessages[lastMessageIndex] = {
                            ...newMessages[lastMessageIndex],
                            content: fullContent
                        };
                    }
                    return { message: newMessages };
                });
            }
            
            set({ loading: false });
        } catch (e) {
            const msg = e instanceof Error ? e.message : "Error con la IA";
            set({ error: msg, loading: false });
        }
    },
})
