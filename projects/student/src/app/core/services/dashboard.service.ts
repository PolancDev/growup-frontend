import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StudentStats } from '@shared/api/models';
import { Notification } from '../models/notification.model';
import { EnrolledCourse } from '@shared/api/models';
import { EstudianteApi } from '@shared/api/apis/EstudianteApi';
import { ApiConfigService } from '@shared/api/api-config.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    private apiConfig = inject(ApiConfigService);

    private get estudianteApi(): EstudianteApi {
        return new EstudianteApi(this.apiConfig.configuration);
    }

    constructor() { }

    getStudentStats(): Observable<StudentStats> {
        return from(this.estudianteApi.studentStatsGet()).pipe(
            catchError(err => {
                console.error('Error fetching student stats:', err);
                return of(this.getDefaultStats());
            })
        );
    }

    getNotifications(): Observable<Notification[]> {
        return from(this.estudianteApi.studentNotificationsGet({})).pipe(
            catchError(err => {
                console.error('Error fetching notifications:', err);
                return of([]);
            })
        );
    }

    getEnrolledCourses() {
        return from(this.estudianteApi.studentEnrollmentsGet()).pipe(
            catchError(err => {
                console.error('Error fetching enrolled courses:', err);
                return of([]);
            })
        );
    }

    addEnrolledCourse(course: EnrolledCourse): void {
        // No longer needed - using API
    }

    private getDefaultStats(): StudentStats {
        return {
            activeCoursesCount: 0,
            completedCoursesCount: 0,
            certificatesEarned: 0,
            totalHoursLearning: 0,
            averageScore: 0,
            learningStreakDays: 0
        };
    }
}
