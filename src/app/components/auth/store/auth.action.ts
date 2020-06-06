import {Action} from "@ngrx/store";

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export class Login implements Action{
  readonly type = LOGIN;
  constructor(
    public payload : {
    email: string;
    id: number,
   _token: string,
   _expireDate: Date
  }) {
  }
}
export class LogOut implements Action{
  readonly type = LOGOUT;
}
export type AuthAction =
  Login |
  LogOut;
