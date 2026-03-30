import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormUtils } from '../../../../utils/forms.utils';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import { Role } from '@shared/models/role.enum';

@Component({
  selector: 'growup-login-component',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule
  ],
  templateUrl: './login-component.html',
  styles: ``
})
export class LoginComponent {

  formUtils = FormUtils;

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  hasError = signal(false);
  hasSuccess = signal(false);

  constructor() { }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)]],
    password: ['', [Validators.required, Validators.pattern(this.formUtils.passPattern)]]
  });

  /**
   * Login using Keycloak OAuth2 (SSO)
   */
  loginWithSSO() {
    console.log('GrowUp-Log: LoginComponent - Redirecting to Keycloak...');
    this.authService.loginWithKeycloak();
  }

  onSubmit() {
    // Still allow traditional login but redirect to Keycloak
    this.loginWithSSO();
  }
}
