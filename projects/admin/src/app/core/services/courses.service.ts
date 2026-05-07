import { Injectable, signal, computed, inject } from '@angular/core';
import { CourseModel } from '@shared/models/course.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/courses`;
  private usersUrl = `${environment.apiUrl}/admin/users`;

  // Signals para estado
  private _courses = signal<CourseModel[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);
  private _coursesSearch = signal<CourseModel[]>([]);

  // Cache de usuarios para evitar múltiples llamadas
  private _usersCache = signal<Map<string, any>>(new Map());

  // Computed signals
  public courses = computed(() => this._courses());
  public coursesSearch = computed(() => this._coursesSearch());
  public loading = computed(() => this._loading());
  public error = computed(() => this._error());

  public pendingProposals = computed(() =>
    this._courses().filter((c) => c.publicationStatus === 'En Revision'),
  );

  /**
   * Obtiene todos los cursos del backend
   * GET /api/v1/courses
   */
  getCourses(): Observable<CourseModel[]> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.get<CourseModel[]>(this.apiUrl).pipe(
      tap((courses) => {
        this._courses.set(courses);
        this._loading.set(false);

        // Cargar nombres de instructores
        this.loadInstructorsNames(courses);
      }),
      catchError((error) => {
        console.error('Error fetching courses:', error);
        this._error.set('Error al cargar los cursos');
        this._loading.set(false);
        return of([]);
      }),
    );
  }

  /**
   * Carga los nombres de los instructores desde el backend
   * Obtiene todos los usuarios con una sola llamada
   */
  private loadInstructorsNames(courses: CourseModel[]): void {
    // Hacer una sola llamada para obtener todos los usuarios
    this.http.get<any[]>(this.usersUrl).pipe(
      catchError((error) => {
        console.warn('No se pudieron cargar los usuarios:', error);
        return of([]);
      })
    ).subscribe(users => {
      const cache = new Map();
      users.forEach((user: any) => {
        cache.set(user.id, user);
      });
      this._usersCache.set(cache);
    });
  }

  /**
   * Obtiene el nombre de un instructor desde el cache
   */
  getInstructorName(course: CourseModel): string {
    // Primero verificar si hay objeto instructor
    if (course.instructor?.name) {
      return course.instructor.name;
    }

    // Buscar el instructorId - puede estar en diferentes campos
    const instructorId = course.instructorId || course.instructor?.id;

    // Luego verificar cache
    const cached = this._usersCache().get(instructorId || '');
    if (cached?.name) {
      return cached.name;
    }

    // Si hay ID pero no nombre, devolver el ID
    return instructorId || 'Sin instructor';
  }

  /**
   * Obtiene un curso por su ID
   * GET /api/v1/courses/{id}
   */
  getCourseById(id: string): Observable<CourseModel | undefined> {
    return this.http.get<CourseModel>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching course:', error);
        return of(undefined);
      }),
    );
  }

  /**
   * Cambia el estado de publicación de un curso
   * PATCH /api/v1/courses/{id}
   */
  changeStatus(
    courseId: string,
    newStatus: 'Publicado' | 'Borrador' | 'En Revision',
    reason: string,
  ): Observable<CourseModel> {
    return this.http
      .patch<CourseModel>(`${this.apiUrl}/${courseId}`, {
        publicationStatus: newStatus,
        statusChangeReason: reason,
      })
      .pipe(
        tap((updatedCourse) => {
          this._courses.update((courses) =>
            courses.map((c) => (c.id === courseId ? updatedCourse : c)),
          );
          console.log(`Estado cambiado a ${newStatus} por: ${reason}`);
        }),
        catchError((error) => {
          console.error('Error updating course status:', error);
          throw error;
        }),
      );
  }

  /**
   * Actualiza el precio de un curso
   * PATCH /api/v1/courses/{id}/price
   */
  updatePrice(courseId: string, newPrice: number): Observable<CourseModel> {
    return this.http
      .patch<CourseModel>(`${this.apiUrl}/${courseId}/price`, {
        price: newPrice,
      })
      .pipe(
        tap((updatedCourse) => {
          this._courses.update((courses) =>
            courses.map((c) => (c.id === courseId ? updatedCourse : c)),
          );
        }),
        catchError((error) => {
          console.error('Error updating course price:', error);
          throw error;
        }),
      );
  }

  /**
   * Busca cursos por nombre
   * GET /api/v1/courses con filtro de búsqueda
   */
  searchCourses(search: string): void {
    if (!search.trim()) {
      this._coursesSearch.set([]);
      return;
    }

    // Usar el endpoint con filtro de nombre (si el backend lo soporta)
    // Por ahora filtramos localmente
    this._coursesSearch.set(
      this._courses().filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    );
  }

  /**
   * Carga datos mock para desarrollo sin backend
   * Método temporal para desarrollo
   */
  loadMockData(): void {
    this._courses.set([
      {
        id: 'c1',
        name: 'Master en Angular Avanzado',
        description: 'Aprende a dominar Angular 21, Signals, Zoneless y Microfrontends.',
        category: 'Programación',
        level: 'Avanzado',
        price: 99.99,
        publicationStatus: 'En Revision',
        createdAt: '2026-02-01',
        enrolledCount: 125,
        instructor: {
          id: 'i1',
          name: 'Carlos Formador',
          role: 'Senior Developer',
          avatarUrl: '',
          bio: 'Experto en arquitecturas frontend.',
        },
        syllabus: [
          {
            title: 'Arquitectura de Señales',
            description: 'Profundizando en Signal vs Observable.',
            topics: [
              { title: 'Fundamentos de WritableSignals', duration: 45 },
              { title: 'Computed y Effects avanzado', duration: 60 },
              { title: 'Patrones de estado compartido', duration: 90 },
            ],
          },
        ],
      },
      {
        id: 'c2',
        name: 'Introducción a Tailwind CSS 4.0',
        description: 'El futuro del diseño CSS con variables nativas.',
        category: 'Diseño Web',
        level: 'Principiante',
        price: 49.99,
        publicationStatus: 'En Revision',
        createdAt: '2026-02-03',
        enrolledCount: 85,
        instructor: {
          id: 'i2',
          name: 'Diana Formadora',
          role: 'UI/UX Designer',
          avatarUrl: '',
          bio: 'Apasionada del diseño minimalista.',
        },
        syllabus: [
          {
            title: 'Configuración y Variables',
            description: 'Instalación de v4 y uso de flags.',
            topics: [
              { title: 'Instalación con Vite/Angular', duration: 30 },
              { title: 'Variables nativas de CSS', duration: 45 },
              { title: 'Nuevas utilidades de Layout', duration: 60 },
            ],
          },
        ],
      },
      {
        id: 'c3',
        name: 'Node.js y Microservicios',
        description: 'Escalabilidad real con Node y Docker.',
        category: 'Backend',
        level: 'Intermedio',
        price: 79.99,
        publicationStatus: 'Publicado',
        createdAt: '2026-01-20',
        enrolledCount: 340,
        instructor: {
          id: 'i1',
          name: 'Carlos Formador',
          role: 'Senior Developer',
          avatarUrl: '',
          bio: 'Experto en arquitecturas frontend.',
        },
        syllabus: [
          {
            title: 'Docker para Node',
            description: 'Contenerización de aplicaciones.',
            topics: [
              { title: 'Dockerfiles eficientes', duration: 40 },
              { title: 'Docker Compose básico', duration: 55 },
              { title: 'Orquestación de servicios', duration: 120 },
            ],
          },
        ],
      },
    ]);
  }
}
