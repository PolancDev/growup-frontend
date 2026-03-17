import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { API_BASE_URL } from '@shared/api/api-tokens';
import { of } from 'rxjs';

import { CursoCard } from './curso-card';
import { CourseService } from '../../../core/services/course.service';

describe('CursoCard', () => {
  let component: CursoCard;
  let fixture: ComponentFixture<CursoCard>;

  const mockCourseService = {
    isEnrolled: () => of(false)
  };

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
      imports: [CursoCard, RouterTestingModule],
      providers: [
        MessageService,
        { provide: API_BASE_URL, useValue: 'http://localhost:8080' },
        { provide: CourseService, useValue: mockCourseService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoCard);
    component = fixture.componentInstance;
    component.course = {
      id: '1',
      name: 'Test Course',
      price: 100,
      category: 'Development'
    } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
