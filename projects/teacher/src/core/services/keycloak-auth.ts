import { UserManager, User, UserManagerSettings } from 'oidc-client-ts';

const keycloakSettings: UserManagerSettings = {
  authority: 'http://localhost:8180/realms/growup',
  client_id: 'growup-frontend',
  redirect_uri: `${window.location.origin}/callback`,
  response_type: 'code',
  scope: 'openid profile email',
  post_logout_redirect_uri: `${window.location.origin}`,
  silent_redirect_uri: `${window.location.origin}/silent-refresh`,
  automaticSilentRenew: true,
  accessTokenExpiringNotificationTime: 60,
};

export class KeycloakAuthService {
  private userManager: UserManager;
  private user: User | null = null;

  constructor() {
    this.userManager = new UserManager(keycloakSettings);
    this.init();
  }

  private async init() {
    // Check for existing session
    try {
      this.user = await this.userManager.getUser();
      if (this.user && !this.user.expired) {
        console.log('GrowUp-Log: Keycloak - User already authenticated');
      }
    } catch (error) {
      console.error('GrowUp-Log: Keycloak - Error checking user:', error);
    }

    // Listen for events
    this.userManager.events.addUserLoaded((user) => {
      console.log('GrowUp-Log: Keycloak - User loaded:', user);
      this.user = user;
    });

    this.userManager.events.addUserUnloaded(() => {
      console.log('GrowUp-Log: Keycloak - User unloaded');
      this.user = null;
    });

    this.userManager.events.addAccessTokenExpired(() => {
      console.log('GrowUp-Log: Keycloak - Token expired');
      this.signinRedirect();
    });
  }

  async signinRedirect() {
    await this.userManager.signinRedirect();
  }

  async signinRedirectCallback(): Promise<User | null> {
    try {
      this.user = await this.userManager.signinRedirectCallback();
      console.log('GrowUp-Log: Keycloak - Signin callback successful');
      return this.user;
    } catch (error) {
      console.error('GrowUp-Log: Keycloak - Signin callback error:', error);
      return null;
    }
  }

  async signinSilent(): Promise<User | null> {
    try {
      this.user = await this.userManager.signinSilent();
      return this.user;
    } catch (error) {
      console.error('GrowUp-Log: Keycloak - Signin silent error:', error);
      return null;
    }
  }

  async signout() {
    await this.userManager.signoutRedirect();
  }

  getUser(): User | null {
    return this.user;
  }

  isAuthenticated(): boolean {
    return this.user != null && !this.user.expired;
  }

  getAccessToken(): string | null {
    return this.user?.access_token || null;
  }

  getProfile(): { sub: string; email: string; name: string; roles: string[] } | null {
    if (!this.user?.profile) return null;

    const profile = this.user.profile;
    const realmAccess = (profile as any).realm_access;

    return {
      sub: profile.sub as string,
      email: profile.email as string,
      name: profile.name as string || profile.preferred_username as string,
      roles: realmAccess?.roles || [],
    };
  }

  hasRole(role: string): boolean {
    const profile = this.getProfile();
    return profile?.roles.includes(role) || false;
  }
}

// Export singleton instance
export const keycloakAuth = new KeycloakAuthService();
