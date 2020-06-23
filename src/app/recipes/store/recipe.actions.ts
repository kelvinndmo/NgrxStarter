import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const ADD_RECIPE = "[Recipes] Add Recipes";
export const SET_RECIPES = "[Recipes] set Recipes";
export const FETCH_RECIPES = "[Recipes] Fetch Recipes";
export const UPDATE_RECIPE = "[Recipes] Update Recipe";
export const Delete_RECIPE = "[Recipes] Delete Recipe";
export const STORE_RECIPES = "[Recipes] store Recipes";

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class AddRecipes implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload: { index: number; newRecipe: Recipe }) {}
}

export class DeleteRecipe implements Action {
  readonly type = Delete_RECIPE;

  constructor(public payload: number) {}
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}
export type RecipeActions =
  | SetRecipes
  | FetchRecipes
  | AddRecipes
  | UpdateRecipe
  | DeleteRecipe
  | StoreRecipes;
