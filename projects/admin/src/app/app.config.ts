import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AUTH_INTERCEPTOR_PROVIDER } from '@shared/interceptors';
import { MessageService } from 'primeng/api';
import { API_BASE_URL } from '@shared/api/api-tokens';
import { environment } from '../environments/environment';

import { adminRoutes } from './app.routes';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    AUTH_INTERCEPTOR_PROVIDER,
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    provideRouter(adminRoutes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark'
        }
      }
    }),
    MessageService
  ]
};
