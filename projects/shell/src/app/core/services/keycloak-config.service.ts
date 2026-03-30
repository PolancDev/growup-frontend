import { Injectable, inject } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable } from 'rxjs';

export const keycloakAuthConfig: AuthConfig = {
  issuer: 'http://localhost:8180/realms/growup',
  redirectUri: window.location.origin + '/auth/callback',
  clientId: 'growup-frontend',
  responseType: 'code',
  scope: 'openid profile email',
  showDebugInformation: true,
  useSilentRefresh: true,
  silentRefreshRedirectUri: window.location.origin + '/assets/silent-refresh.html',
  sessionChecksEnabled: true,
};

@Injectable({
  providedIn: 'root',
})
export class KeycloakConfigService {
  private oauthService = inject(OAuthService);
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(keycloakAuthConfig);
    
    // Load discovery document and initialize
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      console.log('GrowUp-Log: Keycloak - Discovery document loaded');
      
      // Check if returning from Keycloak login
      if (this.oauthService.hasValidAccessToken()) {
        this.isAuthenticatedSubject.next(true);
        console.log('GrowUp-Log: Keycloak - User is authenticated');
      }
    }).catch(error => {
      console.error('GrowUp-Log: Keycloak - Error loading discovery document:', error);
    });

    // Listen to token expiration
    this.oauthService.events.subscribe(event => {
      if (event.type === 'token_expires') {
        console.log('GrowUp-Log: Keycloak - Token expiring, refreshing...');
        this.oauthService.refreshToken();
      } else if (event.type === 'logout') {
        this.isAuthenticatedSubject.next(false);
      }
    });
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
    this.isAuthenticatedSubject.next(false);
  }

  getAccessToken(): string | null {
    return this.oauthService.getAccessToken();
  }

  getIdentityClaims(): any {
    return this.oauthService.getIdentityClaims();
  }

  getUserProfile(): { sub: string; email: string; name: string; roles: string[] } | null {
    const claims = this.getIdentityClaims();
    if (!claims) return null;

    return {
      sub: claims['sub'] as string,
      email: claims['email'] as string,
      name: claims['name'] as string || claims['preferred_username'] as string,
      roles: claims['realm_access']?.['roles'] as string[] || [],
    };
  }

  hasRole(role: string): boolean {
    const claims = this.getIdentityClaims();
    if (!claims || !claims['realm_access']) return false;
    
    const roles = claims['realm_access']['roles'] as string[];
    return roles.includes(role);
  }

  isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  refreshToken() {
    return this.oauthService.refreshToken();
  }
}
