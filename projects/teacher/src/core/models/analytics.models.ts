import type { CourseStatus } from './courses.models';

export interface RevenueData {
    month: string;
    revenue: number;
    enrollments: number;
}

export interface CoursePerformance {
    courseId: string;
    courseName: string;
    students: number;
    revenue: number;
    rating: number;
    status: CourseStatus;
}

export interface AnalyticsSummary {
    totalRevenue: number;
    totalStudents: number;
    averageRating: number;
    activeCourses: number;
}

export interface CourseReview {
    id: string;
    courseId: string;
    courseName?: string;
    studentId?: string;
    studentName?: string;
    rating: number;
    comment: string;
    createdAt: string;
}
