import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {exhaustMap, map, take} from "rxjs/operators";
import {Injectable} from "@angular/core";
import * as fromApp from "../components/store/app.reducer"
import {Store} from "@ngrx/store";
@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private store: Store<fromApp.AppState>) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      map((appUser) => {
        return appUser.user;
      }),
      take(1),
      exhaustMap(userData => {
        if(!userData) {
          return next.handle(req);
        }
        const modifiedRequest = req.clone({
          params: new HttpParams().set('auth', userData.token)
        });
        return next.handle(modifiedRequest);
      })
    )
  }

}
