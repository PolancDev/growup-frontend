import { Component, OnInit, Signal, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrolledCourse } from '@shared/api/models';
import { CourseGroupComponent } from '../../../shared/components/course-group/course-group';
import { DashboardService } from '../../../core/services/dashboard.service';


@Component({
  selector: 'growup-mylearning',
  standalone: true,
  imports: [
    CommonModule,
    CourseGroupComponent
  ],
  templateUrl: './mylearning.html',
  styles: ``,
})
export class Mylearning implements OnInit {

  private dashboardService = inject(DashboardService);

  // Señal base de todos los cursos (convertimos el Observable a signal)
  private enrollments$ = signal<EnrolledCourse[]>([]);


  ngOnInit(): void {
    this.dashboardService.getEnrolledCourses().subscribe({
      next: (courses) => {
        this.enrollments$.set(courses);
      },
      error: (error) => {
        console.error('Error al obtener los cursos:', error);
      }
    });
  }
  /**
   * Cursos activos (en curso).
   */
  activeCourses = computed(() =>
    this.enrollments$().filter(c => c.enrollmentStatus === 'active')
  );

  /**
   * Cursos no empezados (nuevos).
   */
  notStartedCourses = computed(() =>
    this.enrollments$().filter(c => c.enrollmentStatus === 'not_started')
  );

  /**
   * Cursos completados.
   */
  completedCourses = computed(() =>
    this.enrollments$().filter(c => c.enrollmentStatus === 'completed')
  );

  /**
   * Cursos archivados.
   */
  archivedCourses = computed(() =>
    this.enrollments$().filter(c => c.enrollmentStatus === 'archived')
  );

  /**
   * Manejador de acciones para los cursos.
   */
  handleCourseAction(course: EnrolledCourse): void {
    console.log('Acción sobre el curso:', course.name, 'Estado:', course.enrollmentStatus);
  }
}
