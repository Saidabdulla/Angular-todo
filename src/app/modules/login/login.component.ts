import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../servies/auth.service";
import { LoginCredentials } from "../../interfaces/auth";
import { TooltipModule } from 'primeng/tooltip';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    TooltipModule,
    ButtonModule
  ]
})
export class LoginComponent {
  authService = inject(AuthService);

  emailErrorText = '';
  passwordErrorText = '';

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required])
  });

  submit() {
    if (this.form.invalid) {
      if (!this.form.get('email')?.value) {
        this.emailErrorText = 'Email is required!';
      } else {
        this.emailErrorText = 'Email doesn\'t match E-mail pattern!'
      }

      if (!this.form.get('password')?.value) {
        this.passwordErrorText = 'Password is required!';
      }

    } else {
      this.authService.login(this.form.value as LoginCredentials);
    }
  }

}
