import { Component, OnInit } from '@angular/core';
import {ShoppingService} from "../../service/shopping.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public shoppingService: ShoppingService) { }

  ngOnInit() {
  }
  fetchData() {
    this.shoppingService.fetchData().subscribe(
      res => {
       this.shoppingService.addIngredients(res);
      }
    )

  }
}
