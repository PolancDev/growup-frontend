import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has('Authorization')) {
      return next.handle(req);
    }

    const token = localStorage.getItem('growup-token')?.trim();
    if (token) {
      const authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      const cloned = req.clone({
        setHeaders: {
          Authorization: authorization,
        },
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}

export const AUTH_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
