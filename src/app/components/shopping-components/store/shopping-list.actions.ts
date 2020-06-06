import {Action} from "@ngrx/store";
import {Ingredient} from "../../../class/ingredient";

export const ADD_INGREDIENT = '[ShoppingList] Add Ingredient';
export const ADD_INGREDIENTS = '[ShoppingList] Add Ingredients';
export const UPDATE_INGREDIENT = '[ShoppingList] Update Ingredient';
export const DELETE_INGREDIENT = '[ShoppingList] Delete Ingredient';
export const START_EDIT = '[ShoppingList] Start Edit';
export const STOP_EDIT = '[ShoppingList] Stop Edit';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public  payload: Ingredient) {
  }
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public  payload: Ingredient[]) {
  }
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: Ingredient) {
  }
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class StartEdit {
  readonly type = START_EDIT;

  constructor(public payload: number) {
  }

}

export class StopEdit {
  readonly type = STOP_EDIT;
}

export type shoppingListActions =
  AddIngredient |
  AddIngredients |
  UpdateIngredient |
  DeleteIngredient |
  StartEdit |
  StopEdit;
