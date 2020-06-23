import * as RecipesActions from "./recipe.actions";

import { Recipe } from "../recipe.model";

export interface State {
  recipes: Recipe[];
  editingRecipe: Recipe;
  editingRecipeIndex: number;
}

const initialState: State = {
  recipes: [],
  editingRecipe: null,
  editingRecipeIndex: -1,
};

export function recipeReducer(
  state = initialState,
  action: RecipesActions.RecipeActions
) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case RecipesActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe,
      };

      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes,
      };
    case RecipesActions.Delete_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(
          (recipe, index) => index !== action.payload
        ),
      };
    default:
      return state;
  }
}
