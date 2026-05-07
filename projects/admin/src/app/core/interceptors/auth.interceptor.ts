import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Interceptor de autenticación JWT para el proyecto admin
 * Añade el token Bearer a todas las peticiones excepto en endpoints públicos
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('growup-token');

  // No añadir token en login o endpoints públicos
  const isAuthEndpoint = req.url.includes('/auth/login') || req.url.includes('/auth/register');

  if (token && !isAuthEndpoint) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};