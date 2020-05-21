import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Ingredient} from "../../../class/ingredient";
import {Observable} from "rxjs";
import * as fromApp from "../../store/app.reducer"
import * as ShoppingListAction from "../store/shopping-list.actions";


@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  constructor(public store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.update();
  }
  editIngredient(data: number){
    this.store.dispatch(new ShoppingListAction.StartEdit(data))
  }
  update() {
    this.ingredients = this.store.select('shoppingList');

  }
}
