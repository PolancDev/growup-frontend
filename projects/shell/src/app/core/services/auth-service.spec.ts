import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth-service';
import { MessageService } from 'primeng/api';
import { API_BASE_URL } from '../../../../../../shared/api/api-tokens';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        MessageService,
        {
          provide: API_BASE_URL,
          useValue: 'http://localhost:8080'
        }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  // Verifica que el servicio se crea correctamente
  it('debería crearse', () => {
    expect(service).toBeTruthy();
  });

  describe('checkAuthStatus', () => {
    // Verifica que retorna false cuando no hay token en localStorage
    it('debería retornar false cuando no hay token en localStorage', () => {
      const result = service.checkAuthStatus();
      expect(result).toBe(false);
    });

    // Verifica que retorna false cuando el token es inválido
    it('debería retornar false cuando el token es inválido', () => {
      localStorage.setItem('growup-token', 'invalid-token');
      
      const result = service.checkAuthStatus();
      
      expect(result).toBe(false);
    });
  });

  describe('userRole', () => {
    // Verifica que retorna STUDENT por defecto
    it('debería retornar STUDENT por defecto', () => {
      expect(service.userRole()).toBe('STUDENT');
    });
  });

  describe('userId', () => {
    // Verifica que retorna string vacío por defecto
    it('debería retornar string vacío por defecto', () => {
      expect(service.userId()).toBe('');
    });
  });

  describe('logout', () => {
    // Verifica que limpia el usuario y el token
    it('debería limpiar el usuario y el token', () => {
      localStorage.setItem('growup-token', 'test-token');
      
      service.logout();
      
      expect(localStorage.getItem('growup-token')).toBeNull();
      expect(service.user()).toBeNull();
    });
  });
});
