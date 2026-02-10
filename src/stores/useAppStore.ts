import { create } from 'zustand';
import { devtools } from "zustand/middleware";
import { createRecipeSlice, type RecipeSliceType } from './recipeSlice';
import { createFavoriteSlice, type FavoriteSliceType } from './favoriteSlice';
import { createNotificationSlice, type NotificationSliceType } from './notificationSlice';
import { createAiSlice, type AiSliceType } from './aiSlice';

export const useAppStore = create<RecipeSliceType & FavoriteSliceType & NotificationSliceType & AiSliceType>()(devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a),
    ...createAiSlice(...a),
})));