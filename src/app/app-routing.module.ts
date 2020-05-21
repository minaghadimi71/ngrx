import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShoppingComponent} from "./components/shopping-components/shopping/shopping.component";
import {RecipesComponent} from "./components/recipes/recipes.component";
import {AuthComponent} from "./components/auth/auth.component";


const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'shopping', component: ShoppingComponent},
  {path: 'recipes', component: RecipesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
