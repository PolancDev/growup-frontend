import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { StudentStats } from '@shared/api/models';
import { Notification } from '../../../core/models/notification.model';
import { EnrolledCourse } from '@shared/api/models';
import { DashboardService } from '../../../core/services/dashboard.service';

import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { CourseGroupComponent } from '../../../shared/components/course-group/course-group';

// PrimeNG Imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChartModule } from 'primeng/chart';
import { BadgeModule } from 'primeng/badge';


@Component({
  selector: 'growup-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    //RouterLinkActive,
    StatCardComponent,
    CourseGroupComponent,
    CardModule,
    ButtonModule,
    AvatarModule,
    TagModule,
    ProgressBarModule,
    ChartModule,
    BadgeModule
  ],
  templateUrl: './dashboard.html',
  styles: ``,
})
export class Dashboard implements OnInit {
  stats: StudentStats | null = null;
  notifications: Notification[] = [];

  private dashboardService = inject(DashboardService);

  private enrollments$ = toSignal(this.dashboardService.getEnrolledCourses(), { initialValue: [] });

  activeCourses = computed(() =>
    this.enrollments$().filter(c => c.enrollmentStatus === 'active')
  );

  lastAccessDate = computed(() => {
    const courses = this.enrollments$();
    if (courses.length === 0) return null;
    
    const sorted = [...courses].sort((a, b) => {
      const dateA = a.lastAccessDate ? new Date(a.lastAccessDate).getTime() : 0;
      const dateB = b.lastAccessDate ? new Date(b.lastAccessDate).getTime() : 0;
      return dateB - dateA;
    });
    return sorted[0].lastAccessDate;
  });

  lastCourse = computed(() => {
    const courses = this.enrollments$();
    if (courses.length === 0) return null;
    
    const sorted = [...courses].sort((a, b) => {
      const dateA = a.lastAccessDate ? new Date(a.lastAccessDate).getTime() : 0;
      const dateB = b.lastAccessDate ? new Date(b.lastAccessDate).getTime() : 0;
      return dateB - dateA;
    });
    return sorted[0];
  });

  getLastCourseImage(): string {
    const course = this.lastCourse();
    if (!course?.imageUrl) {
      return '/assets/no-image.svg';
    }
    return course.imageUrl.startsWith('assets/') ? '/' + course.imageUrl : course.imageUrl;
  }

  certificates = computed(() => {
    return this.stats?.certificatesEarned || 0;
  });

  activityChartData: any;
  activityChartOptions: any;

  completionChartData: any;
  completionChartOptions: any;

  constructor() { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dashboardService.getStudentStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.initCharts();
      },
      error: () => {
        this.initCharts();
      }
    });
    this.dashboardService.getNotifications().subscribe(data => this.notifications = data);
  }

  private initCharts() {
    const enrollments = this.enrollments$();
    const completed = enrollments.filter(e => e.enrollmentStatus === 'completed').length;
    const inProgress = enrollments.filter(e => e.enrollmentStatus === 'active').length;
    const notStarted = enrollments.filter(e => e.enrollmentStatus === 'not_started').length;

    this.activityChartData = {
      labels: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
      datasets: [
        {
          label: 'Horas de aprendizaje',
          data: [2, 3.5, 1, 4, 2.5, 0.5, 3],
          backgroundColor: '#22C55E',
          borderColor: '#22C55E',
          borderWidth: 1,
          borderRadius: 4
        }
      ]
    };

    this.activityChartOptions = {
      plugins: { legend: { display: false } },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: '#6b7280' },
          grid: { color: '#f3f4f6', drawBorder: false }
        },
        x: {
          ticks: { color: '#6b7280' },
          grid: { display: false, drawBorder: false }
        }
      }
    };

    this.completionChartData = {
      labels: ['Completado', 'En Progreso', 'Pendiente'],
      datasets: [
        {
          data: [completed, inProgress, notStarted],
          backgroundColor: ['#22C55E', '#F59E0B', '#3b82f6'],
          hoverBackgroundColor: ['#16A34A', '#D97706', '#2563eb']
        }
      ]
    };

    this.completionChartOptions = {
      plugins: {
        legend: {
          labels: { usePointStyle: true, color: '#1f2937' },
          position: 'bottom'
        }
      },
      cutout: '60%'
    };
  }

  getSeverity(status: string): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
    switch (status) {
      case 'active': return 'success';
      case 'completed': return 'info';
      case 'archived': return 'secondary';
      default: return 'info';
    }
  }
}
