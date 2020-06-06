import { Component, OnInit } from '@angular/core';
import {ShoppingService} from "../../service/shopping.service";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {Ingredient} from "../../class/ingredient";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public shoppingService: ShoppingService,
              private authService: AuthService,
              private route: Router) { }

  ngOnInit() {
  }
  fetchData() {
    this.shoppingService.fetchData().subscribe(
      res => {
        console.log(res, 'mina');
           this.shoppingService.addIngredients(res);
      }
    )

  }
  logOut() {
    this.authService.logOut();
    this.route.navigate(['/auth'])
  }
}
