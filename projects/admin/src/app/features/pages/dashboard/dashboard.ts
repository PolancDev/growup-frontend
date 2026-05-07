import { Component, OnInit, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { DashboardService } from '../../../core/services/dashboard.service';
import { CoursesService } from '../../../core/services/courses.service';
import { CoursePreviewDialog } from '../../../shared/componentes/coursePreviewDialog/course-preview-dialog';
import { signal } from '@angular/core';
import { CourseModel } from '@shared/models/course.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'growup-admin-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, ChartModule, ButtonModule, CoursePreviewDialog],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class AdminDashboard implements OnInit {
  private dashboardService = inject(DashboardService);
  private coursesService = inject(CoursesService);

  // Señales expuestas para el template
  stats = this.dashboardService.stats;
  pendingCourses = this.coursesService.pendingProposals;

  // State for preview
  selectedCourse = signal<CourseModel | null>(null);
  displayDetails = signal<boolean>(false);

  // Datos de gráficos (se mantendrán aquí por ahora ya que son configuraciones de UI)
  growthData: any;
  growthOptions: any;
  distributionData: any;
  distributionOptions: any;

  ngOnInit() {
    // Cargar cursos para mostrar propuestas pendientes
    this.coursesService.getCourses().subscribe();
    this.initCharts();
  }

  showPreview(course: CourseModel) {
    this.selectedCourse.set(course);
    this.displayDetails.set(true);
  }

  initCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color') || '#495057';
    const textColorSecondary =
      documentStyle.getPropertyValue('--text-color-secondary') || '#6b7280';
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border') || '#dfe7ef';

    this.growthData = {
      labels: ['Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb'],
      datasets: [
        {
          label: 'Estudiantes Activos',
          data: [1200, 1500, 1800, 2100, 2350, 2482],
          fill: true,
          borderColor: '#3b82f6',
          tension: 0.5,
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
        },
        {
          label: 'Baja de Estudiantes',
          data: [200, 500, 800, 1100, 1350, 1482],
          fill: true,
          borderColor: '#f8b626ff',
          tension: 0.5,
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
        },
      ],
    };

    this.growthOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: { display: true },
      },
      scales: {
        x: {
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder, drawBorder: false },
        },
        y: {
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder, drawBorder: false },
        },
      },
    };

    this.distributionData = {
      labels: ['Frontend', 'Backend', 'DevOps', 'Diseño'],
      datasets: [
        {
          data: [45, 25, 15, 15],
          backgroundColor: ['#22C55E', '#3b82f6', '#FF7A00', '#A855F7'],
          hoverBackgroundColor: ['#16A34A', '#2563eb', '#EA580C', '#9333EA'],
        },
      ],
    };

    this.distributionOptions = {
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: textColor, usePointStyle: true },
        },
      },
    };
  }
}
