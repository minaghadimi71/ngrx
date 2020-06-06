import { Component } from '@angular/core';
import {AuthService} from "./service/auth.service";
import {Store} from "@ngrx/store";
import * as AppState from "./components/store/app.reducer"
import {map} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ngrx-project';
  public showHeader: boolean = false;
  constructor(private authService: AuthService,
              private store: Store<AppState.AppState>) {
    this.authService.handelAutoLogIn();
    this.store.select('auth').pipe(
      map(userData => {
        return userData.user;
      })
    ).subscribe(
      user => {
        if(user && user.token) {
          this.showHeader = true;
        } else {
          this.showHeader = false;
        }
      }
    )
  }
}
