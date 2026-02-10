import axios from "axios";
import { CategoriesApiResponseSchema, DrinksApiResponseSchema, RecipeApiResponseSchema } from "../schema/recipes-schema";
import type { SearchFilter } from "../types";

export const getCategory = async () => {
    const urlCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const categoriesData = await axios.get(urlCategories);
    const categoriesResult = CategoriesApiResponseSchema.parse(categoriesData.data);

    return categoriesResult;
}

export const getRecipes = async (searchFilter: SearchFilter) => {
    const urlRecipe = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${searchFilter.category}&i=${searchFilter.search}`;
    const { data: recipeData } = await axios.get(urlRecipe);
    const recipeResult = DrinksApiResponseSchema.parse(recipeData);
    return recipeResult;
}

export const getRecipeDetail = async (id: string) => {
    const urlRecipeDetail = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const { data: recipeDetailData } = await axios.get(urlRecipeDetail);
    const recipeDetailResult = RecipeApiResponseSchema.parse(recipeDetailData.drinks[0]);
    return recipeDetailResult;
}
