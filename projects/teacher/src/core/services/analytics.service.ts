import { Configuration, ProfesorApi } from '@shared/api';
import type { AnalyticsSummary, CoursePerformance, RevenueData, CourseReview } from '../models/analytics.models';

const basePath = import.meta.env.VITE_API_BASE_PATH;
const profesorApi = new ProfesorApi(new Configuration({
    basePath,
    accessToken: () => localStorage.getItem('growup-token') || ''
}));


export const AnalyticsService = {
    getSummary: async (): Promise<AnalyticsSummary> => {
        try {
            const summary = await profesorApi.teacherAnalyticsSummaryGet()
            console.log('summary: ', summary);
            return {
                totalRevenue: summary.totalRevenue || 0,
                totalStudents: summary.totalStudents || 0,
                averageRating: summary.averageRating || 0,
                activeCourses: summary.activeCourses || 0
            };
        } catch (error) {
            console.error('Error fetching dashboard summary:', error);
            return {
                totalRevenue: 0,
                totalStudents: 0,
                averageRating: 0,
                activeCourses: 0
            };
        }
    },

    getRevenueTrends: async (): Promise<RevenueData[]> => {
        try {
            const revenueTrends = await profesorApi.teacherAnalyticsRevenueGet()
            console.log('revenueTrends: ', revenueTrends);
            return revenueTrends.map(trend => ({
                month: trend.month || '',
                revenue: trend.revenue || 0,
                enrollments: trend.enrollments || 0
            }));

        } catch (error) {
            console.error('Error fetching revenue trends:', error);
            return [];
        }
    },

    getCoursePerformance: async (): Promise<CoursePerformance[]> => {
        try {
            const performance = await profesorApi.teacherAnalyticsCoursesGet();
            console.log('coursePerformance: ', performance);
            return performance.map(p => ({
                courseId: p.courseId || '',
                courseName: p.courseName || '',
                students: p.students || 0,
                revenue: p.revenue || 0,
                rating: p.rating || 0,
                status: p.status as any
            }));
        } catch (error) {
            console.error('Error fetching course performance:', error);
            return [];
        }
    },

    getReviews: async (): Promise<CourseReview[]> => {
        try {
            const reviews = await profesorApi.teacherReviewsGet();
            console.log('reviews: ', reviews);
            return reviews.map((r: any) => ({
                id: r.id,
                courseId: r.courseId,
                courseName: r.courseName,
                studentId: r.studentId,
                studentName: r.studentName,
                rating: r.rating,
                comment: r.comment,
                createdAt: r.createdAt
            }));
        } catch (error) {
            console.error('Error fetching reviews:', error);
            return [];
        }
    }
};
