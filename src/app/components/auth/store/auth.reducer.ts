import {User} from "../../../class/User";
import * as AuthAction from "./auth.action";

export interface State {
  user: User;
}

const InitialState: State = {
  user: null
}

export function AuthReducer
(state = InitialState,
 action: AuthAction.AuthAction) {
  switch (action.type) {
    case AuthAction.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.id,
        action.payload._token,
        action.payload._expireDate)
      return {
        ...state,
        user: user,
      }
    case AuthAction.LOGOUT:
      return {
        ...state,
        user: null,
      }
    default:
      return state;

  }
}
