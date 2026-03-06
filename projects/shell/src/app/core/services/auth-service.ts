import { computed, effect, Injectable, signal } from '@angular/core';
import { AuthStatus } from '@shared/models/auth-status.enum';
import { User } from '@shared/interfaces/user.interface';
import { catchError, from, map, Observable, of } from 'rxjs';
import { Role } from '@shared/models/role.enum';
import { AutenticacinApi } from '../../../../../../shared/api/apis/AutenticacinApi';
import { Configuration } from '../../../../../../shared/api/runtime';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '@shared/api/models';




@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _statusUser = signal<AuthStatus>(AuthStatus.authenticated);
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('growup-token') || '');
  private authApi = new AutenticacinApi(new Configuration({ basePath: environment.apiBaseUrl }));

  checkAuthStatus() {
    const token = localStorage.getItem('growup-token');
    if (token) {
      const decoded = this.decodeToken(token);
      if (decoded) {
        // Reconstruimos el usuario básico desde el token
        this._user.set({
          id: decoded.sub || '',
          role: (decoded.role || decoded.roles?.[0] || Role.STUDENT) as Role,
          name: decoded.name || '',
          isActive: decoded.isActive || false,
          email: decoded.email || ''
        });
        this._statusUser.set(AuthStatus.authenticated);
        this._token.set(token);

        console.log('user: ', this._user());
        return true;
      }
    }
    this.logout();
    return false;
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
    //Revisando el usuario
    if (this._statusUser() === AuthStatus.checking) return AuthStatus.checking

    //Si hay user es que estamos autenticados
    //console.log('user: ', this._user());
    if (this._token()) {
      return AuthStatus.authenticated;
    }
    return AuthStatus.notAuthenticated
  })

  //Valor get en el que enviamos el valor de ese usuario
  //El computed es de solo lectura y asi no podemos modificar su valor, ya que depende del signal _user
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


  logout() {
    //console.log('logout');
    this._user.set(null);
    this._statusUser.set(AuthStatus.notAuthenticated);
    this._token.set(null);

    localStorage.removeItem('growup-token');
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    this._user.set(user as unknown as User);
    this._statusUser.set(AuthStatus.authenticated);
    this._token.set(token);

    localStorage.setItem('growup-token', token);

    return true;
  }
}
