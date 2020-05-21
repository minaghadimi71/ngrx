import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Ingredient} from "../class/ingredient";
import {environment} from "../class/enviroment";
import {map} from "rxjs/operators";
import * as ShoppingListActions from "../components/shopping-components/store/shopping-list.actions";
import {Store} from "@ngrx/store";
import * as fromApp from "../../app/components/store/app.reducer"

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  ingredients = new BehaviorSubject<Ingredient[]>([]);


  constructor(public http: HttpClient, public store: Store<fromApp.AppState>) { }
  fetchData() {
    return this.http.get(environment.url + 'ingredient.json').pipe(
      map(data => {
        const ingredients = [];
        for (const key in data) {
          ingredients.push(data[key]);
        }
        return ingredients[0];
      })
    );
  }
  addIngredients(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

}
