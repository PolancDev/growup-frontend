import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { AuthStatus } from '@shared/models/auth-status.enum';
import { Role } from '@shared/models/role.enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  //authService.checkAuthStatus();

  if (authService.authStatus() === AuthStatus.authenticated) {
    const role = authService.userRole();
    console.log('role: ', role);

    switch (role) {
      case Role.ADMIN:
        router.navigate(['/private/admin']);
        break;
      case Role.TEACHER:
        router.navigate(['/private/teacher']);
        break;
      case Role.STUDENT:
        router.navigate(['/private/student']);
        break;
      default:
        router.navigate(['/private/student']);
    }

    return false;
  }
  return true;
};
