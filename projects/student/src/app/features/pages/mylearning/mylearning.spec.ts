import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { API_BASE_URL } from '@shared/api/api-tokens';

import { Mylearning } from './mylearning';

describe('Mylearning', () => {
  let component: Mylearning;
  let fixture: ComponentFixture<Mylearning>;

  beforeEach(async () => {
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

    await TestBed.configureTestingModule({
      imports: [Mylearning],
      providers: [
        MessageService,
        { provide: API_BASE_URL, useValue: 'http://localhost:8080' }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mylearning);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
