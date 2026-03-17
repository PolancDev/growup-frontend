import { computed, effect, Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStatus } from '@shared/models/auth-status.enum';
import { User } from '@shared/interfaces/user.interface';
import { catchError, from, map, Observable, of } from 'rxjs';
import { Role } from '@shared/models/role.enum';
import { AutenticacinApi } from '../../../../../../shared/api/apis/AutenticacinApi';
import { Configuration } from '../../../../../../shared/api/runtime';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '@shared/api/models';
import { ApiConfigService } from '@shared/api/api-config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _statusUser = signal<AuthStatus>(AuthStatus.authenticated);
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('growup-token') || '');
  
  private apiConfig = inject(ApiConfigService);
  private authApi = new AutenticacinApi(this.apiConfig.configuration);
  private router: Router;

  constructor() {
    this.router = inject(Router);
  }

  checkAuthStatus() {
    const token = localStorage.getItem('growup-token');
    if (token) {
      const decoded = this.decodeToken(token);
      if (decoded && !this.isTokenExpired(decoded)) {
        this._user.set({
          id: decoded.sub || '',
          role: (decoded.role || decoded.roles?.[0] || Role.STUDENT) as Role,
          name: decoded.name || '',
          isActive: decoded.isActive || false,
          email: decoded.email || ''
        });
        this._statusUser.set(AuthStatus.authenticated);
        this._token.set(token);

        console.log('GrowUp-Log: checkAuthStatus - Token válido para:', decoded.email);
        return true;
      } else {
        console.log('GrowUp-Log: checkAuthStatus - Token expirado o inválido');
        this.clearAuth();
      }
    }
    console.log('GrowUp-Log: checkAuthStatus - No hay token');
    this.clearAuth();
    return false;
  }

  private isTokenExpired(decoded: any): boolean {
    if (!decoded.exp) {
      return true;
    }
    const expDate = new Date(decoded.exp * 1000);
    const now = new Date();
    const isExpired = expDate.getTime() < now.getTime();
    if (isExpired) {
      console.log('GrowUp-Log: isTokenExpired - Token expiró:', expDate, 'Ahora:', now);
    }
    return isExpired;
  }

  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
  }


  authStatus = computed<AuthStatus>(() => {
    if (this._statusUser() === AuthStatus.checking) return AuthStatus.checking
    if (this._token()) {
      return AuthStatus.authenticated;
    }
    return AuthStatus.notAuthenticated
  })

  user = computed<User | null>(() => this._user())
  token = computed(() => this._token())

  userRole() {
    return this._user()?.role || Role.STUDENT;
  }

  userId() {
    return this._user()?.id || '';
  }

  userEmail() {
    return this._user()?.email || '';
  }

  userName() {
    return this._user()?.name || '';
  }

  userIsActive() {
    return this._user()?.isActive || false;
  }

  login(email: string, password: string): Observable<boolean> {
    this.checkAuthStatus();
    return from(this.authApi.authLoginPost({ loginRequest: { email, password } })).pipe(
      map(response => this.handleAuthSuccess(response)),
      catchError(error => {
        console.error('Login error:', error);
        return of(false);
      })
    );
  }


  private clearAuth() {
    this._user.set(null);
    this._statusUser.set(AuthStatus.notAuthenticated);
    this._token.set(null);
    localStorage.removeItem('growup-token');
  }

  logout() {
    this.clearAuth();
    if (this.router) {
      this.router.navigate(['/auth/login']);
    }
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    this._user.set(user as unknown as User);
    this._statusUser.set(AuthStatus.authenticated);
    this._token.set(token);

    localStorage.setItem('growup-token', token);

    return true;
  }
}
