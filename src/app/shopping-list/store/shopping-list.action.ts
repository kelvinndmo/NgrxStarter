import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGRIDIENT = "ADD_INGRIDIENT";
export const ADD_INGRIDIENTS = "ADD_INGRIDIENTS";
export const UPDATE_INGRIDIENT = "UPDATE_INGRIDIENTS";
export const DELETE_INGRIDIENT = "DELETE_INGRIDIENT";
export const START_EDIT = "START_EDIT";
export const STOP_EDIT = "STOP_EDIT";
export class AddIngridient implements Action {
  readonly type = ADD_INGRIDIENT;
  constructor(public payload: Ingredient) {}
}

export class AddIngridients implements Action {
  readonly type = ADD_INGRIDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngridient implements Action {
  readonly type = UPDATE_INGRIDIENT;
  constructor(public payload: Ingredient) {}
}

export class DeleteIngridients implements Action {
  readonly type = DELETE_INGRIDIENT;
  constructor() {}
}

export class StartEdit implements Action {
  readonly type = START_EDIT;
  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}
export type ShoppingListActions =
  | AddIngridient
  | AddIngridients
  | DeleteIngridients
  | UpdateIngridient
  | StartEdit
  | StopEdit;
