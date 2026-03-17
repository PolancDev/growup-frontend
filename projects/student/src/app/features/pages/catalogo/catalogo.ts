import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../../../../../shared/api/models';

import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SkeletonModule } from 'primeng/skeleton';
import { CursoCard } from "../../../shared/components/curso-card/curso-card";


@Component({
  selector: 'growup-catalogo',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TagModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    SkeletonModule,
    CursoCard
  ],
  templateUrl: './catalogo.html',
  styles: ``,
})

export class Catalogo implements OnInit, OnDestroy {

  courseService = inject(CourseService);
  loading = signal(true);
  allCourses: Course[] = [];
  filteredCourses: Course[] = [];

  ngOnInit() {
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.allCourses = courses;
        this.filteredCourses = courses;
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar el catálogo de cursos:', err);
        this.loading.set(false);
      }
    });
  }

  buscaCurso(text: string) {
    if (!text) {
      this.filteredCourses = this.allCourses;
      return;
    }

    this.filteredCourses = this.allCourses.filter(course =>
      course.name.toLowerCase().includes(text.toLowerCase())
    );
  }

  ngOnDestroy() {
    this.loading.set(true);
  }
}
