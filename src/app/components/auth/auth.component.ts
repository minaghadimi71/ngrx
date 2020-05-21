import {Component, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['auth.component.scss']
})
export class AuthComponent {
  @ViewChild('loginForm', {static: true}) loginForm: NgForm;
  loginSubmit() {
    console.log(this.loginForm.value)
  }
}
