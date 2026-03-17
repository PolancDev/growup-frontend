import { Injectable, signal, inject } from '@angular/core';
import { from, Observable, map } from 'rxjs';
import { CursosApi } from '../../../../../../shared/api/apis/CursosApi';
import { EstudianteApi } from '../../../../../../shared/api/apis/EstudianteApi';
import { Course, EnrolledCourse } from '../../../../../../shared/api/models';
import { ApiConfigService } from '../../../../../../shared/api/api-config.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiConfig = inject(ApiConfigService);

  private get cursosApi(): CursosApi {
    return new CursosApi(this.apiConfig.configuration);
  }

  private get estudianteApi(): EstudianteApi {
    return new EstudianteApi(this.apiConfig.configuration);
  }

  /** Catálogo: devuelve todos los cursos de la plataforma */
  getAllCourses(category?: string, level?: any, status?: any): Observable<Course[]> {
    console.log('category: ', category);
    console.log('level: ', level);
    console.log('status: ', status);
    return from(this.cursosApi.coursesGet({ category, level, status }));
  }

  /** Detalle de un curso */
  getCourseById(id: string): Observable<Course> {
    return from(this.cursosApi.coursesIdGet({ id }));
  }

  /** Inscribir al estudiante autenticado en un curso */
  enrollCourse(id: string): Observable<EnrolledCourse> {
    return from(this.estudianteApi.coursesIdEnrollPost({ id }));
  }

  /** Obtener cursos en los que está inscrito el estudiante */
  getMyEnrollments(): Observable<EnrolledCourse[]> {
    return from(this.estudianteApi.studentEnrollmentsGet());
  }

  /** Verificar si el estudiante está inscrito en un curso */
  isEnrolled(id: string): Observable<boolean> {
    return from(this.estudianteApi.coursesIdEnrolledGet({ id }));
  }
}
