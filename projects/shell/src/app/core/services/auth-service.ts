import { computed, Injectable, signal, inject } from '@angular/core';
import { AuthStatus } from '@shared/models/auth-status.enum';
import { User } from '@shared/interfaces/user.interface';
import { Observable, of, tap, map, catchError } from 'rxjs';
import { AuthResponse, BackendAuthResponse } from '../interfaces/auth-response.authResponse';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private _statusUser = signal<AuthStatus>(AuthStatus.checking);
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('growup-token') ?? null);

  checkAuthStatus(): Observable<boolean> {
    const token = localStorage.getItem('growup-token');

    if (!token) {
      this.logout();
      return of(false);
    }

    return this.http.get<User>(`${this.apiUrl}/auth/me`).pipe(
      tap((user) => {
        this._user.set(user);
        this._statusUser.set(AuthStatus.authenticated);
        this._token.set(token);
      }),
      map(() => true),
      catchError(() => {
        this.logout();
        return of(false);
      })
    );
  }

  authStatus = computed<AuthStatus>(() => {
    if (this._statusUser() === AuthStatus.checking) return AuthStatus.checking
    if (this._user()) {
      return AuthStatus.authenticated;
    }
    return AuthStatus.notAuthenticated
  })

  user = computed<User | null>(() => this._user())
  token = computed(() => this._token())

  userRole() {
    const user = this._user();
    return user?.role || null;
  }

  userIsActive() {
    const user = this._user();
    return user?.isActive || false;
  }

  login(email: string, password: string): Observable<boolean> {
    // Limpiar token anterior antes de login
    localStorage.removeItem('growup-token');
    this._token.set(null);

    console.log('🔵 Login - Enviando petición:', { email, apiUrl: `${this.apiUrl}/auth/login` });

    return this.http
      .post<BackendAuthResponse>(`${this.apiUrl}/auth/login`, {
        email,
        password,
      }, {
        headers: { 'Content-Type': 'application/json' }
      })
      .pipe(
        tap((backendResponse) => {
          console.log('🟢 Login - Respuesta recibida:', JSON.stringify(backendResponse, null, 2));

          // Mapear respuesta del backend al formato del frontend
          if (backendResponse && backendResponse.token && backendResponse.userId) {
            const mappedResponse: AuthResponse = {
              token: backendResponse.token,
              user: {
                id: backendResponse.userId,
                name: backendResponse.name,
                email: backendResponse.email,
                role: backendResponse.role as any, // Cast a Role enum
                isActive: true
              }
            };
            console.log('🟢 Login - Respuesta mapeada:', JSON.stringify(mappedResponse, null, 2));
            this.handleAuthSuccess(mappedResponse);
          } else {
            console.error('🔴 Login - Respuesta inválida, falta token o userId');
          }
        }),
        map((response) => !!(response?.token && response?.userId)),
        catchError((error) => {
          console.error('🔴 Login - Error completo:', error);
          console.error('🔴 Login - Status:', error.status);
          console.error('🔴 Login - Message:', error.message);
          console.error('🔴 Login - Error body:', error.error);
          this._statusUser.set(AuthStatus.notAuthenticated);
          return of(false);
        })
      );
  }

  logout() {
    this._user.set(null);
    this._statusUser.set(AuthStatus.notAuthenticated);
    this._token.set(null);
    localStorage.removeItem('growup-token');
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    this._user.set(user);
    this._statusUser.set(AuthStatus.authenticated);
    this._token.set(token);
    localStorage.setItem('growup-token', token);
    return true;
  }
}
