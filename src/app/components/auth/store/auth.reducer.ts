import {User} from "../../../class/User";

export interface State {
  user: User;
}
const InitialState: State = {
  user: null
}
export function AuthReducer(state = InitialState, action) {
return state;
}
