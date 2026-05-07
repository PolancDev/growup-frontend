import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { Role } from '@shared/models/role.enum';
import { map } from 'rxjs/operators';

/**
 * Guard que protege rutas públicas (login, register).
 * Si el usuario ya está autenticado, redirige al microfrontend
 * que corresponde según su rol.
 */
export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthStatus().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        const role = authService.userRole();
        switch (role) {
          case Role.ADMIN:
            router.navigate(['/private/admin']);
            break;
          case Role.TEACHER:
            router.navigate(['/private/teacher']);
            break;
          default:
            router.navigate(['/private/student']);
            break;
        }
        return false;
      }
      return true;
    })
  );
};