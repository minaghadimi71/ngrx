import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../../class/ingredient";
import {ShoppingService} from "../../service/shopping.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  
  constructor(public shoppingService: ShoppingService) {
    this.shoppingService.ingredients.subscribe(
      res => {

      }
    )
  }

  ngOnInit() {
  }
}
