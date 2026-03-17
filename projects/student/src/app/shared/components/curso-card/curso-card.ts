import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { Course } from '../../../../../../../shared/api/models';
import { CourseService } from '../../../core/services/course.service';


@Component({
  selector: 'growup-curso-card',
  imports: [
    CardModule,
    ButtonModule,
    TagModule,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './curso-card.html',
  styles: ``,
})
export class CursoCard implements OnInit {
  // En modo microfrontend, las URLs absolutas se resuelven contra el shell. Deja el placeholder bajo `/assets` del host.
  readonly fallbackImageUrl = '/assets/no-image.svg';
  isEnrolled = signal(false);
  courseService = inject(CourseService);

  @Input()
  course!: Course;

  ngOnInit(): void {
    this.courseService.isEnrolled(this.course.id).subscribe({
      next: (isEnrolled) => {
        this.isEnrolled.set(isEnrolled);
      },
      error: (err) => {
        console.error('Error verificando inscripción:', err);
        this.isEnrolled.set(false);
      }
    });
  }

  private normalizeImageUrl(url: string): string {
    const trimmed = url.trim();
    if (!trimmed) {
      return this.fallbackImageUrl;
    }
    // Avoid relative asset URLs that break under nested routes like /private/student/...
    if (trimmed.startsWith('assets/')) {
      return `/${trimmed}`;
    }
    return trimmed;
  }

  get imageUrl(): string {
    return this.normalizeImageUrl(this.course?.imageUrl || '');
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
