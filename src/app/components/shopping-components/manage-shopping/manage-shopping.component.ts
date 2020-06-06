import {Component, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Ingredient} from "../../../class/ingredient";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from "../store/shopping-list.actions"
import {Subscription} from "rxjs";
import * as fromApp from '../../store/app.reducer'

@Component({
  selector: 'app-manage-shopping',
  templateUrl: './manage-shopping.component.html',
  styleUrls: ['./manage-shopping.component.scss']
})
export class ManageShoppingComponent implements OnInit, OnDestroy {
  @ViewChild('manageShopping', {static: true}) manageShopping: NgForm;
  public editMode: boolean = false;
  public deleteIndex: number;
  public subscription: Subscription[] = [];

  constructor(public store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    const subscribe = this.store.select('shoppingList').subscribe(
      res => {
        if (res.editIngredientIndex > -1) {
          this.setValue(res.editIngredient);
          this.deleteIndex = res.editIngredientIndex;
          this.editMode = true;
        } else {
          this.editMode = false;
        }
      }
    );
    this.subscription.push(subscribe);
  }

  ngOnDestroy() {
    this.subscription.forEach(fb => {
      fb.unsubscribe();
    });
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  setValue(data: Ingredient) {
    this.editMode = true;
    this.manageShopping.setValue(
      {
        name: data.name,
        amount: data.amount,
      }
    )
  }

  onSubmit() {
    const newIngredient = new Ingredient(this.manageShopping.value.name, this.manageShopping.value.amount);
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.manageShopping.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  delete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.editMode = false;
    this.manageShopping.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());

  }
}
