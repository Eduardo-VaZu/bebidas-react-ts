import { api } from "../lib/axios";
import { CategoriesApiResponseSchema, DrinksApiResponseSchema, RecipeApiResponseSchema } from "../schema/recipes-schema";
import type { SearchFilter } from "../types";

export const getCategory = async () => {
    const urlCategories = '/list.php?c=list';
    const categoriesData = await api.get(urlCategories);
    const categoriesResult = CategoriesApiResponseSchema.parse(categoriesData.data);

    return categoriesResult;
}

export const getRecipes = async (searchFilter: SearchFilter) => {
    const urlRecipe = `/filter.php?c=${searchFilter.category}&i=${searchFilter.search}`;
    const { data: recipeData } = await api.get(urlRecipe);
    const recipeResult = DrinksApiResponseSchema.parse(recipeData);
    return recipeResult;
}

export const getRecipeDetail = async (id: string) => {
    const urlRecipeDetail = `/lookup.php?i=${id}`;
    const { data: recipeDetailData } = await api.get(urlRecipeDetail);
    const recipeDetailResult = RecipeApiResponseSchema.parse(recipeDetailData.drinks[0]);
    return recipeDetailResult;
}
