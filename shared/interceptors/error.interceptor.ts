import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../projects/shell/src/app/core/services/auth-service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private messageService = inject(MessageService);
  private router = inject(Router);
  private authService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('GrowUp-Log: ErrorInterceptor - Interceptando:', req.url);
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('GrowUp-Log: ErrorInterceptor - Error capturado:', error);
        let errorMessage = 'Ha ocurrido un error inesperado';

        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Error del lado del servidor
          errorMessage = error.error?.message || error.message || errorMessage;

          if (error.status === 401) {
            // Manejo específico para No Autorizado / Token Expirado
            this.authService.logout();
            this.router.navigate(['/auth/login']);
          }
        }

        this.messageService.add({
          key: 'global-toast',
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
          life: 5000
        });

        return throwError(() => error);
      })
    );
  }
}

export const ERROR_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
