import type { StateCreator } from "zustand";
import { generateRecipe } from "../services/aiService.ts";

export type AiSliceType = {
    recipe: string,
    loading: boolean,
    generateRecipe: (payload: string) => void,
}

export const createAiSlice: StateCreator<AiSliceType> = (set) => ({
    recipe: '',
    loading: false,
    generateRecipe: async (payload) => {
        set({ recipe: '', loading: true });
        try {
            const stream = await generateRecipe(payload);
            for await (const part of stream as AsyncIterable<string>) {
                set((state) => ({ recipe: state.recipe + part }));
            }
            set({ loading: false });
        } catch {
            set({ recipe: 'Error generando receta', loading: false });
        }
    }
})
