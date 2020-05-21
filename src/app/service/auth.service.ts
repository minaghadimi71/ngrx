import {Injectable} from "@angular/core";
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

}
