import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { Role } from '@shared/models/role.enum';
import { map } from 'rxjs/operators';

/**
 * Guard que redirige al usuario al microfrontend correspondiente
 * según su rol. Espera a que el estado de autenticación esté listo
 * antes de leer el rol.
 */
export const roleRedirectGuard: CanActivateChildFn = (childRoute, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const currentUrl = state.url;

  return auth.checkAuthStatus().pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        return router.createUrlTree(['/auth']);
      }

      const role = auth.userRole();

      if (role === Role.ADMIN) {
        if (currentUrl.startsWith('/private/admin')) return true;
        return router.createUrlTree(['/private/admin']);
      }

      if (role === Role.TEACHER) {
        if (currentUrl.startsWith('/private/teacher')) return true;
        return router.createUrlTree(['/private/teacher']);
      }

      if (role === Role.STUDENT) {
        if (currentUrl.startsWith('/private/student')) return true;
        return router.createUrlTree(['/private/student']);
      }

      return router.createUrlTree(['/auth']);
    })
  );
};