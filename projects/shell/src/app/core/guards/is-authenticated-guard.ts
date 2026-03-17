import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { Role } from '@shared/models/role.enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.checkAuthStatus();

  // Si NO está autenticado, permitir acceso a /auth
  if (!isAuthenticated) {
    return true;
  }

  // Si YA está autenticado, redirigir según rol
  const role = authService.userRole();
  const currentPath = state.url;
  const isAuthRoute = currentPath.startsWith('/auth');

  if (isAuthRoute) {
    switch (role) {
      case Role.ADMIN:
        router.navigate(['/private/admin']);
        break;
      case Role.TEACHER:
        router.navigate(['/private/teacher']);
        break;
      case Role.STUDENT:
      default:
        router.navigate(['/private/student']);
    }
  }
  
  return false;
};
