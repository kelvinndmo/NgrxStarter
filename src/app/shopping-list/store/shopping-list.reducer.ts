import * as ShoppingListActions from "./shopping-list.action";

import { Ingredient } from "../../shared/ingredient.model";

export interface State {
  ingridients: Ingredient[];
  editedIngridient: Ingredient;
  editedIngridientIndex: number;
}

const initialState: State = {
  ingridients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
  editedIngridient: null,
  editedIngridientIndex: -1,
};

//state should be a javascript object
export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGRIDIENT:
      return {
        ...state,
        ingridients: [...state.ingridients, action.payload],
      };
    case ShoppingListActions.ADD_INGRIDIENTS:
      return {
        ...state,
        ingridients: [...state.ingridients, ...action.payload],
      };
    case ShoppingListActions.UPDATE_INGRIDIENT:
      const ingridient = state.ingridients[state.editedIngridientIndex];

      const updateIngridient = {
        ...ingridient,
        ...action.payload,
      };

      const updatedIngridients = [...state.ingridients];

      updatedIngridients[state.editedIngridientIndex] = updateIngridient;
      return {
        ...state,
        ingridients: updatedIngridients,
        editedIngridient: null,
        editedIngridientIndex: -1,
      };
    case ShoppingListActions.DELETE_INGRIDIENT:
      return {
        ...state,
        ingridients: state.ingridients.filter(
          (ingridient, index) => index !== state.editedIngridientIndex
        ),
      };

    case ShoppingListActions.START_EDIT:
      console.log(action.payload);
      return {
        ...state,
        editedIngridientIndex: action.payload,
        editedIngridient: { ...state.ingridients[action.payload] },
      };

    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngridient: null,
        editedIngridientIndex: -1,
      };
    default:
      return state;
  }
}
