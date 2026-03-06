import { Configuration, ProfesorApi } from '@shared/api';
import type { DashboardStats, Course, Activity } from '../models/dashboard.models';

const basePath = import.meta.env.VITE_API_BASE_PATH;
const profesorApi = new ProfesorApi(new Configuration({
    basePath,
    accessToken: () => localStorage.getItem('growup-token') || ''
}));
/**
 * En React no tenemos inyección de dependencias como en Angular,
 * por lo que a menudo usamos funciones exportadas o clases simples.
 */
export const DashboardService = {

    getStats: async (): Promise<DashboardStats> => {
        try {
            const stats = await profesorApi.teacherDashboardStatsGet();
            console.log('stats: ', stats);
            return {
                totalStudents: stats.totalStudents || 0,
                activeCourses: stats.activeCourses || 0,
                averageRating: stats.averageRating || 0,
                monthlyRevenue: stats.monthlyRevenue || 0,
                studentsGrowth: stats.studentsGrowth || 0,
                revenueGrowth: stats.revenueGrowth || 0
            };
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            // Fallback a ceros en caso de error
            return {
                totalStudents: 0,
                activeCourses: 0,
                averageRating: 0,
                monthlyRevenue: 0,
                studentsGrowth: 0,
                revenueGrowth: 0
            };
        }
    },

    getCourses: async (): Promise<Course[]> => {
        try {
            const apiCourses = await profesorApi.teacherCoursesGet();

            // Mapeamos de CourseItem (API) a Course (Modelo local del Dashboard)
            return apiCourses.map(item => ({
                id: item.id || '',
                name: item.name,
                category: item.category,
                students: item.students || 0,
                rating: item.rating || 0,
                price: item.price,
                publicationStatus: item.publicationStatus,
                lastUpdate: item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'N/A'
            }));
        } catch (error) {
            console.error('Error fetching dashboard courses:', error);
            return [];
        }
    },

    getActivities: async (): Promise<Activity[]> => {
        try {
            const apiActivities = await profesorApi.teacherActivitiesGet({ limit: 4 });
            return apiActivities.map(act => ({
                id: act.id,
                user: act.user,
                action: act.action,
                target: act.target,
                // Simple formateo de tiempo, podrías usar date-fns o similar para algo más pro
                time: act.time ? new Date(act.time).toLocaleTimeString() : 'Recientemente',
                type: act.type as 'enrollment' | 'question' | 'review'
            }));
        } catch (error) {
            console.error('Error fetching dashboard activities:', error);
            return [];
        }
    }
};
