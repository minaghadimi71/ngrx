import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {environment} from "../class/enviroment";
import {catchError, tap} from "rxjs/operators";
import {User} from "../class/User";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as AppState from "../components/store/app.reducer";
import * as authAction from "../components/auth/store/auth.action"

export interface AuthData {
  kind: string,
  localId: string,
  email: string,
  displayName: string,
  idToken: string,
  registered?: boolean,
  refreshToken: string,
  expiresIn: string,
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public urlParam = new HttpParams();
  public user = new BehaviorSubject<User>(null);

  constructor(public http: HttpClient,
              public route: Router,
              private store: Store<AppState.AppState>) {
    this.urlParam = this.urlParam.append('key', 'AIzaSyCqvTuu34l2dAXab52diwmk9CD37FpzG7E');

  }

  login(emailInput: string, passwordInput: string): Observable<AuthData> {
    return this.http.post<AuthData>(environment.apiUrl + 'signInWithPassword?' + this.urlParam, {
      email: emailInput,
      password: passwordInput,
      returnSecureToken: true
    }).pipe(catchError(this.handelError),
      tap(
        response => {
          this.handelAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)
        }
      )
    );
  }

  register(emailInput: string, passwordInput: string): Observable<AuthData> {
    return this.http.post<AuthData>(environment.apiUrl + 'signUp?' + this.urlParam, {
      email: emailInput,
      password: passwordInput,
      returnSecureToken: true
    }).pipe(catchError(this.handelError),
      tap(
        response => {
          this.handelAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)
        }
      )
    );
  }

  handelAuthentication(email: string, localId: string, response: string, expiresIn: number) {
    const expireDate = new Date(new Date().getTime() + expiresIn * 1000)
    const userData = new User(email, +localId, response, expireDate);
    // this.user.next(userData);
    this.store.dispatch(new authAction.Login(
      {
        email: email,
        id: +localId,
        _token: response,
        _expireDate: expireDate,
      }))
    localStorage.setItem('userData', JSON.stringify(userData));
    this.handelAutoLogout(expiresIn * 1000);
  }

  handelAutoLogout(expiresIn: number) {
    setInterval(() => {
      this.logOut();
      this.route.navigate(['/login']);
    }, expiresIn)
  }

  logOut() {
    // this.user.next(null);
    this.store.dispatch(new authAction.LogOut());
    localStorage.clear();
  }

  handelAutoLogIn() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _expireDate: string,
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const user = new User(
      userData.email,
      +userData.id,
      userData._token,
      new Date(userData._expireDate));
    if (user.token) {
      // this.user.next(user);
      this.store.dispatch(new authAction.Login({
        email: userData.email,
        id: +userData.id,
        _token: userData._token,
        _expireDate: new Date(userData._expireDate)
      }));
      const expireTime = new Date(userData._expireDate).getTime() - new Date().getTime();
      this.handelAutoLogout(expireTime);
    }
  }

  handelError(error: HttpErrorResponse) {
    let errorMessage = 'undefined error';
    if (!error.error || !error.error.error) {
      return throwError(errorMessage);
    }
    switch (error.error.error.message) {
      case 'EMAIL_NOT_FOUND' :
        errorMessage = 'email or password is not valid';
        break;
      case 'EMAIL_EXISTS' :
        errorMessage = 'email is exist';
        break;
      case 'INVALID_PASSWORD' :
        errorMessage = 'password is incorrect';
        break;
    }
    return throwError(errorMessage);
  }


}


