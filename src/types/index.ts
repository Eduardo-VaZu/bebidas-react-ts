import {
    CategoriesApiResponseSchema,
    DrinkApiResponseSchema,
    DrinksApiResponseSchema,
    RecipeApiResponseSchema,
    SearchFilterSchema,
    SearchRecipeWithIdSchema
} from "../schema/recipes-schema";
import { z } from "zod"

export type Categories = z.infer<typeof CategoriesApiResponseSchema>;
export type SearchFilter = z.infer<typeof SearchFilterSchema>;
export type SearchRecipeWithId = z.infer<typeof SearchRecipeWithIdSchema>;
export type DrinksApiResponseSchema = z.infer<typeof DrinksApiResponseSchema>;
export type DrinkApiResponseSchema = z.infer<typeof DrinkApiResponseSchema>;
export type RecipeApiResponseSchema = z.infer<typeof RecipeApiResponseSchema>;
