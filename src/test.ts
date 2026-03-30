import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { API_BASE_URL } from '../shared/api/api-tokens';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    teardown: { destroyAfterEach: false }
  }
);

getTestBed().configureTestingModule({
  providers: [
    MessageService,
    {
      provide: Router,
      useValue: {
        navigate: vi.fn().mockReturnValue(true),
        createUrlTree: vi.fn().mockReturnValue({ url: '/' })
      }
    },
    {
      provide: ActivatedRoute,
      useValue: {
        snapshot: { paramMap: { get: () => null }, data: {} },
        paramMap: { subscribe: vi.fn() },
        data: { subscribe: vi.fn() }
      }
    },
    {
      provide: API_BASE_URL,
      useValue: 'http://localhost:8080'
    }
  ]
});

Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    display: 'none',
    appearance: ['-webkit-appearance']
  })
});

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});

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
