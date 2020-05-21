import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingComponent } from './components/shopping-components/shopping/shopping.component';
import { ManageShoppingComponent } from './components/shopping-components/manage-shopping/manage-shopping.component';
import {FormsModule} from "@angular/forms";
import { RecipesComponent } from './components/recipes/recipes.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule} from "@angular/common/http";
import {AuthComponent} from "./components/auth/auth.component";
import {AuthService} from "./service/auth.service";
import * as fromAppReducer from "../app/components/store/app.reducer"

@NgModule({
  declarations: [
    AppComponent,
    ShoppingComponent,
    ManageShoppingComponent,
    RecipesComponent,
    HeaderComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(fromAppReducer.appReducer),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
