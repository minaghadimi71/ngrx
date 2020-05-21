import {Ingredient} from "../class/ingredient";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[];
  editIngredient: Ingredient,
  editIngredientIndex: number,
}

export interface AppState {
  shoppingList: State;

}

export const initialState: State = {
  ingredients: [
    new Ingredient('Apple', 1),
    new Ingredient('Tomato', 2),
  ],
  editIngredient: null,
  editIngredientIndex: -1,
}

export function ShoppingListReducer(state: State = initialState,
                                    action: ShoppingListActions.shoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          action.payload,
        ]
      }
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          ...action.payload,
        ]
      }
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editIngredientIndex];
      const updateIngredient = {
        ...ingredient,
        ...action.payload
      }
      const updateIngredients = [...state.ingredients];
      updateIngredients[state.editIngredientIndex] = updateIngredient;
      return {
        ...state,
        ingredients: updateIngredients,
        editIngredient: null,
        editIngredientIndex: -1,

      }
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== state.editIngredientIndex;
        }),
        editIngredient: null,
        editIngredientIndex: -1,
      }
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editIngredientIndex: action.payload,
        editIngredient: {...state.ingredients[action.payload]},
      }
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editIngredientIndex: -1,
        editIngredient: null,
      }
    default:
      return state;

  }

}
