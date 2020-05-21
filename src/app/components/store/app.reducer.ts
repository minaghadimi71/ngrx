import * as fromShoppingList from '../shopping-components/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import {ActionReducerMap} from "@ngrx/store";
export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}
export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.ShoppingListReducer,
  auth: fromAuth.AuthReducer,
}
