import { Component, input, output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { CourseModel } from '@shared/models/course.model';
import { CoursesService } from '../../../core/services/courses.service';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'growup-course-preview-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, FormsModule, TextareaModule, TagModule],
  templateUrl: './course-preview-dialog.html',
  styleUrl: './course-preview-dialog.scss',
})
export class CoursePreviewDialog {
  private coursesService = inject(CoursesService);

  course = input<CourseModel | null>(null);
  visible = input<boolean>(false);
  onClose = output<void>();

  justification = signal<string>('');

  handleStatusChange(newStatus: 'Publicado' | 'Borrador') {
    if (this.course() && this.justification().length >= 10) {
      this.coursesService
        .changeStatus(this.course()!.id, newStatus, this.justification())
        .subscribe({
          next: () => {
            this.onClose.emit();
            this.justification.set('');
          },
          error: (err) => console.error('Error changing status:', err),
        });
    }
  }
}
