import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { isAuthenticatedGuard } from './is-authenticated-guard';
import { AuthService } from '../services/auth-service';
import { AuthStatus } from '@shared/models/auth-status.enum';
import { Role } from '@shared/models/role.enum';
import { API_BASE_URL } from '@shared/api/api-tokens';

describe('isAuthenticatedGuard', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('debería permitir acceso cuando no está autenticado', () => {
    const mockRouter = {
      navigate: vi.fn().mockReturnValue(true)
    };

    TestBed.configureTestingModule({
      providers: [
        MessageService,
        { provide: API_BASE_URL, useValue: 'http://localhost:8080' },
        {
          provide: AuthService,
          useValue: {
            checkAuthStatus: () => false,
            authStatus: () => AuthStatus.notAuthenticated,
            userRole: () => Role.STUDENT
          }
        },
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    });

    TestBed.runInInjectionContext(() => {
      const result = isAuthenticatedGuard({} as any, { url: '/login' } as any);
      expect(result).toBe(true);
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });
  });

  it('debería redirigir a /private/student cuando está autenticado como STUDENT', () => {
    const mockRouter = {
      navigate: vi.fn().mockReturnValue(true)
    };

    TestBed.configureTestingModule({
      providers: [
        MessageService,
        { provide: API_BASE_URL, useValue: 'http://localhost:8080' },
        {
          provide: AuthService,
          useValue: {
            checkAuthStatus: () => true,
            authStatus: () => AuthStatus.authenticated,
            userRole: () => Role.STUDENT
          }
        },
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    });

    TestBed.runInInjectionContext(() => {
      const result = isAuthenticatedGuard({} as any, { url: '/auth/login' } as any);
      expect(result).toBe(false);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/private/student']);
    });
  });

  it('debería redirigir a /private/admin cuando está autenticado como ADMIN', () => {
    const mockRouter = {
      navigate: vi.fn().mockReturnValue(true)
    };

    TestBed.configureTestingModule({
      providers: [
        MessageService,
        { provide: API_BASE_URL, useValue: 'http://localhost:8080' },
        {
          provide: AuthService,
          useValue: {
            checkAuthStatus: () => true,
            authStatus: () => AuthStatus.authenticated,
            userRole: () => Role.ADMIN
          }
        },
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    });

    TestBed.runInInjectionContext(() => {
      const result = isAuthenticatedGuard({} as any, { url: '/auth/login' } as any);
      expect(result).toBe(false);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/private/admin']);
    });
  });
});
