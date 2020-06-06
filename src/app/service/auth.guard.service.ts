// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import {Store} from "@ngrx/store";
import * as AppState from "../components/store/app.reducer"
import {map} from "rxjs/operators";
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router, private store: Store<AppState.AppState>) {}
  canActivate(): boolean {
    let userItem
    this.store.select('auth').pipe(
      map(userData => {
        return userData.user;
      })
    ).subscribe(
      user => {
        userItem = user;
      }
    )
    if (!!userItem) {
      return true;
    }
    this.router.navigate(['/auth']);
    return true;
  }
}
