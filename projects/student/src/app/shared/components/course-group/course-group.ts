import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrolledCourse } from '@shared/api/models';
import { EnrolledCourseCardComponent } from '../enrolled-course-card/enrolled-course-card';

@Component({
    selector: 'growup-course-group',
    standalone: true,
    imports: [CommonModule, EnrolledCourseCardComponent],
    templateUrl: './course-group.html'
})
export class CourseGroupComponent {
    /**
     * Título de la sección (ej: "Mis Cursos Activos").
     */
    title = input.required<string>();

    /**
     * Lista de cursos a mostrar en este grupo.
     */
    courses = input.required<EnrolledCourse[]>();

    /**
     * Mensaje a mostrar si la lista está vacía.
     */
    emptyMessage = input<string>('No hay cursos en esta sección.');

    /**
     * Reenvía el evento de acción de la tarjeta individual hacia el padre.
     */
    onCourseAction = output<EnrolledCourse>();

    /**
     * Manejador de la acción de un curso individual.
     */
    handleCourseAction(course: EnrolledCourse): void {
        this.onCourseAction.emit(course);
    }
}
