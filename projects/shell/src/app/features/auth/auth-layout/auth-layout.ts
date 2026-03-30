import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from '../../../shared/toast-component/toast-component';

@Component({
  selector: 'growup-auth-layout',
  imports: [
    RouterOutlet,
    ToastComponent
  ],
  templateUrl: './auth-layout.html',
  styles: ``,
})
export class AuthLayout {

}
