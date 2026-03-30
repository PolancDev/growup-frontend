import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakConfigService } from '../../../../core/services/keycloak-config.service';
import { AuthService } from '../../../../core/services/auth-service';
import { Role } from '@shared/models/role.enum';

@Component({
  selector: 'growup-callback-component',
  standalone: true,
  template: `
    <div class="callback-container">
      <div class="spinner"></div>
      <p>Autenticando con Keycloak...</p>
    </div>
  `,
  styles: [`
    .callback-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    p {
      margin-top: 20px;
      color: #666;
    }
  `]
})
export class CallbackComponent implements OnInit {
  private keycloakService = inject(KeycloakConfigService);
  private authService = inject(AuthService);
  private router = inject(Router);

  async ngOnInit() {
    // Handle OAuth callback
    try {
      // The KeycloakConfigService already handles the callback
      // Wait a moment for the token to be set
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (this.keycloakService.isAuthenticated()) {
        console.log('GrowUp-Log: Callback - User authenticated via Keycloak');
        
        // Get user info from Keycloak
        const userProfile = this.keycloakService.getUserProfile();
        
        if (userProfile) {
          // Update AuthService with Keycloak user info
          this.authService.setKeycloakUser(userProfile);
        }

        // Redirect based on role
        const roles = userProfile?.roles || [];
        
        if (roles.includes('ADMIN')) {
          this.router.navigate(['/private/admin']);
        } else if (roles.includes('TEACHER')) {
          this.router.navigate(['/private/teacher']);
        } else {
          this.router.navigate(['/private/student']);
        }
      } else {
        console.error('GrowUp-Log: Callback - Authentication failed');
        this.router.navigate(['/auth/login']);
      }
    } catch (error) {
      console.error('GrowUp-Log: Callback - Error:', error);
      this.router.navigate(['/auth/login']);
    }
  }
}
