import type { StateCreator } from "zustand";
import { getCategory, getRecipeDetail, getRecipes } from "../services/RecipeService";
import type {
    Categories,
    SearchFilter,
    DrinksApiResponseSchema,
    SearchRecipeWithId,
    RecipeApiResponseSchema
} from "../types";


export type RecipeSliceType = {
    category: Categories;
    recipes: DrinksApiResponseSchema;
    recipeDetail: RecipeApiResponseSchema;
    modal: boolean;
    fetchCategory: () => Promise<void>;
    searchRecipes: (searchFilter: SearchFilter) => Promise<void>;
    searchRecipeWithId: (searchRecipeWithId: SearchRecipeWithId) => Promise<void>
    setModal: (modal: boolean) => void;
}

export const createRecipeSlice: StateCreator<RecipeSliceType> = (set) => ({
    category: {
        drinks: []
    },
    recipeDetail: {} as RecipeApiResponseSchema,
    recipes: {
        drinks: []
    },
    modal: false,
    fetchCategory: async () => {
        const categories = await getCategory();
        set({ category: categories });

    },
    searchRecipes: async (searchFilter) => {
        const recipes = await getRecipes(searchFilter);
        set({ recipes: recipes });
    },
    searchRecipeWithId: async (searchRecipeWithId) => {
        const recipeDetail = await getRecipeDetail(searchRecipeWithId.id);
        set({ recipeDetail: recipeDetail });
        set({ modal: true });
    },
    setModal: (modal) => {
        set({ modal: modal })
    },
});
