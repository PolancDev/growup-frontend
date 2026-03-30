import { Component, signal, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PwaUpdateService } from './core/services/pwa-update.service';
import { InstallBannerComponent } from './shared/components/install-banner.component';
import { AuthService } from './core/services/auth-service';
// ↑ Importamos el componente de banner de instalación


@Component({
  selector: 'growup-root',
  imports: [
    RouterModule,
    InstallBannerComponent,
    // ↑ Añadimos el componente standalone a los imports
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('growup-frontend');
  private authService = inject(AuthService);
  //private pwaUpdate = inject(PwaUpdateService);

  constructor() {
    console.log('--- GROWUP PWA INITIALIZED ---');

    this.authService.checkAuthStatus();

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(reg => {
        console.log('PWA Service Worker is ready and active');
      });
    }
  }
}
