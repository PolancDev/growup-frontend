import { Injectable, inject } from '@angular/core';
import { Configuration, Middleware, ResponseContext, ErrorContext } from './runtime';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { API_BASE_URL } from './api-tokens';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  private messageService = inject(MessageService);
  private router = inject(Router);
  private baseUrl = inject(API_BASE_URL);

  private errorMiddleware: Middleware = {
    post: async (context: ResponseContext) => {
      const { response } = context;
      if (!response.ok) {
        let errorMessage = 'Ha ocurrido un error inesperado';
        try {
          const errorData = await response.clone().json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          try {
            errorMessage = await response.clone().text() || errorMessage;
          } catch (e2) {}
        }

        console.error('GrowUp-Log: ApiMiddleware - Error detectado:', response.status, errorMessage);

        this.messageService.add({
          key: 'global-toast',
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
          life: 5000
        });

        if (response.status === 401) {
          localStorage.removeItem('growup-token');
          if (!this.router.url.includes('/auth/')) {
            this.router.navigate(['/auth/login']);
          }
        }
      }
      return response;
    },
    onError: async (context: ErrorContext) => {
        console.error('GrowUp-Log: ApiMiddleware - Error de red:', context.error);
        this.messageService.add({
            key: 'global-toast',
            severity: 'error',
            summary: 'Error de Red',
            detail: 'No se pudo conectar con el servidor',
            life: 5000
        });
        return undefined;
    }
  };

  readonly configuration = new Configuration({
    basePath: this.baseUrl,
    middleware: [this.errorMiddleware],
    accessToken: async () => {
      const token = localStorage.getItem('growup-token');
      return token || '';
    }
  });
}
