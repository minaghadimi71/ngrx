import {Component, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Route, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['auth.component.scss']
})
export class AuthComponent {
  @ViewChild('loginForm', {static: true}) loginForm: NgForm;
  public registerPage: boolean = false;
  constructor(public authService: AuthService,
              private route: Router) {
  }
  loginSubmit() {
    let subscription;
    if(this.registerPage) {
      subscription = this.authService.register(this.loginForm.value.email, this.loginForm.value.password);
    } else{
      subscription = this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
    }
    subscription.subscribe(
      res => {
        this.route.navigate(['/shopping'])
      }
    );
  }
  goToRegister() {
    this.registerPage = !this.registerPage;
  }
}
