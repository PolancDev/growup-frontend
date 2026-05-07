import { Injectable, signal, computed } from '@angular/core';
import { DashboardStats, PendingCourse } from '../interfaces/admin.interface';


@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    // Simulación de estado con señales (Signals)
    private _stats = signal<DashboardStats>({
        students: 2482,
        trainers: 124,
        activeCourses: 86,
        monthlyRevenue: '14.2k€'
    });

    private _pendingCourses = signal<PendingCourse[]>([
        { id: 1, name: 'Angular 21: Deep Dive', teacher: 'Juan Pérez', date: '02 Feb 2026' },
        { id: 2, name: 'Architecting MFEs', teacher: 'Clara Soto', date: '04 Feb 2026' },
        { id: 4, name: 'Tailwind 4 Mastery', teacher: 'Alex Ruiz', date: '05 Feb 2026' },
        { id: 5, name: 'Tailwind 4 Mastery', teacher: 'Alex Ruiz', date: '05 Feb 2026' },
        { id: 6, name: 'Tailwind 4 Mastery', teacher: 'Alex Ruiz', date: '05 Feb 2026' },
        { id: 7, name: 'Tailwind 4 Mastery', teacher: 'Alex Ruiz', date: '05 Feb 2026' },
        { id: 8, name: 'Tailwind 4 Mastery', teacher: 'Alex Ruiz', date: '05 Feb 2026' },
        { id: 9, name: 'Tailwind 4 Mastery', teacher: 'Alex Ruiz', date: '05 Feb 2026' },
    ]);

    // Exponemos las señales como ReadOnly (computadas o directas)
    public stats = computed(() => this._stats());
    public pendingCourses = computed(() => this._pendingCourses());

    // Futuras llamadas a la API
    refreshData() {
        // Aquí iría el fetch/HttpClient
        console.log('Refrescando datos del dashboard...');
    }
}
