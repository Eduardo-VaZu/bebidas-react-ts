import type { StateCreator } from "zustand";
import type { RecipeApiResponseSchema } from "../types";
import type { RecipeSliceType } from "./recipeSlice";
import type { NotificationSliceType } from "./notificationSlice";


export type FavoriteSliceType = {
    favoriteRecipes: RecipeApiResponseSchema[];
    handleAddFavoriteRecipe: (recipe: RecipeApiResponseSchema) => void;
    existFavoriteRecipe: (idDrink: RecipeApiResponseSchema['idDrink']) => boolean;
    removeFavoriteRecipe: (idDrink: RecipeApiResponseSchema['idDrink']) => void;
}



export const createFavoriteSlice: StateCreator<FavoriteSliceType> = (set, get) => ({
    favoriteRecipes: (() => {
        try {
            const raw = localStorage.getItem('favoriteRecipes');
            const parsed = raw ? JSON.parse(raw) : [];
            return Array.isArray(parsed) ? parsed as RecipeApiResponseSchema[] : [];
        } catch {
            return [];
        }
    })(),
    handleAddFavoriteRecipe: (recipe) => {
        const { favoriteRecipes } = get();
        if (favoriteRecipes.some((drink) => drink.idDrink === recipe.idDrink)) {
            return;
        }
        set((state) => {
            const updated = [...state.favoriteRecipes, recipe];
            localStorage.setItem('favoriteRecipes', JSON.stringify(updated));
            return { favoriteRecipes: updated };
        });
        (get()as unknown as NotificationSliceType).showNotification({
            text: 'Receta agregada a favoritos',
            error: false,
            time: 3000,
        });
        (get() as RecipeSliceType & FavoriteSliceType).setModal(false);

    },
    existFavoriteRecipe: (idDrink) => {
        const { favoriteRecipes } = get();
        return favoriteRecipes.some((drink) => drink.idDrink === idDrink);
    },
    removeFavoriteRecipe: (idDrink) => {
        set((state) => {
            const updated = state.favoriteRecipes.filter((drink) => drink.idDrink !== idDrink);
            localStorage.setItem('favoriteRecipes', JSON.stringify(updated));
            return { favoriteRecipes: updated };
        });
        (get()as unknown as NotificationSliceType).showNotification({
            text: 'Receta eliminada de favoritos',
            error: false,
            time: 3000,
        });

        (get() as RecipeSliceType & FavoriteSliceType).setModal(false);
    }

})
