import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { EnrolledCourse } from '@shared/api/models';


@Component({
    selector: 'growup-enrolled-course-card',
    standalone: true,
    imports: [
        CommonModule,
        ProgressBarModule,
        TagModule,
        ButtonModule,
        RouterModule
    ],
    templateUrl: './enrolled-course-card.html'
})
export class EnrolledCourseCardComponent {

    readonly fallbackImageUrl = '/assets/no-image.svg';

    /**
     * El curso inscrito a mostrar.
     * Usamos Signal Input (obligatorio en este caso).
     */
    course = input.required<EnrolledCourse>();

    /**
     * Evento que se dispara al hacer clic en el botón de acción principal.
     * Usamos la nueva API de Output de Angular.
     */
    onAction = output<EnrolledCourse>();

    /**
     * Lógica computada para el texto del botón según el estado.
     */
    get buttonLabel(): string {
        const status = this.course().enrollmentStatus;
        switch (status) {
            case 'completed': return 'Revisar';
            case 'not_started': return 'Empezar';
            case 'archived': return 'Restaurar';
            default: return 'Continuar';
        }
    }

    /**
     * Lógica computada para el icono del botón según el estado.
     */
    get buttonIcon(): string {
        const status = this.course().enrollmentStatus;
        switch (status) {
            case 'completed': return 'pi pi-search';
            case 'not_started': return 'pi pi-play';
            case 'archived': return 'pi pi-refresh';
            default: return 'pi pi-play';
        }
    }

    onImageError(event: Event): void {
        const image = event.target as HTMLImageElement;
        if (image.dataset['fallbackApplied'] === '1') {
            return;
        }
        image.dataset['fallbackApplied'] = '1';
        image.src = this.fallbackImageUrl;
    }
}
