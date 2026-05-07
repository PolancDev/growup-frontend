import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';

/**
 * Guard que protege rutas privadas.
 * Verifica asíncronamente el estado de autenticación llamando a /auth/me.
 * Si el usuario está autenticado, permite el acceso; si no, redirige a /auth.
 */
export const isAuthorizateGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthStatus().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) return true;
      router.navigate(['/auth']);
      return false;
    })
  );
};