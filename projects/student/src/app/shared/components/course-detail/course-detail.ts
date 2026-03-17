import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';
import { RatingModule } from 'primeng/rating';
import { AccordionModule } from 'primeng/accordion';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../../../../../shared/api/models';


@Component({
  selector: 'growup-course-detail',
  imports: [
    FormsModule,
    AvatarModule,
    AvatarGroupModule,
    ButtonModule,
    CardModule,
    ChipModule,
    DividerModule,
    GalleriaModule,
    TagModule,
    TimelineModule,
    RatingModule,
    AccordionModule,
    RouterLink
  ],
  templateUrl: './course-detail.html',
  styles: ``,
})
export class CourseDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);

  readonly fallbackImageUrl = '/assets/no-image.svg';

  // Signals para reactividad
  course = signal<Course | undefined>(undefined);
  enrolling = signal(false);
  enrollmentError = signal<string | null>(null);

  cancel: boolean = false;
  value: number | null = 0;
  valuerating!: number;

  toggleModule(index: number): void {
    if (this.value === index) {
      this.value = null;
    } else {
      this.value = index;
    }
  }

  ngOnInit(): void {
    console.log('course-detail');
    this.valuerating = 3;
    const id = this.route.snapshot.paramMap.get('id');
    this.enrolling.set(false);

    if (id) {
      this.courseService.getCourseById(id).subscribe({
        next: (course) => {
          this.course.set(course);
          console.log('course: ', course);
        },
        error: (error) => {
          console.log('error: ', error);
          this.router.navigate(['private/student/catalogo'])
        }
      });
    }

    this.courseService.isEnrolled(id).subscribe({
      next: (enrolled) => {
        this.enrolling.set(enrolled);
      },
      error: (error) => {
        console.log('error: ', error);
        this.router.navigate(['private/student/catalogo'])
      }
    });

  }

  onEnroll(): void {
    console.log('enroll: ', this.course()?.id);

    this.courseService.enrollCourse(this.course()?.id).subscribe({
      next: (course) => {
        this.course.set(course);
        this.enrolling.set(true);
        console.log('course: ', course);
      },
      error: (error) => {
        console.log('error: ', error);
        this.enrollmentError.set(error.message);
      }
    });
    this.router.navigate(['private/student/catalogo']);
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

