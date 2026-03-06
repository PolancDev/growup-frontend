import type { CourseItem } from "../models/courses.models";
import { Configuration, CursosApi, CourseLevel, CourseStatus } from '../../../../../shared/api';

const API_BASE_PATH = import.meta.env.VITE_API_BASE_PATH || 'http://localhost:8080/api/v1';
console.log('[CourseService] Utilizando API_BASE_PATH:', API_BASE_PATH);

const cursosApi = new CursosApi(new Configuration({
    basePath: API_BASE_PATH,
    accessToken: () => localStorage.getItem('growup-token') || ''
}));


let currentInstructor = { id: '', name: '' };

export const CourseService = {

    setInstructor(data: { id: string, name: string }) {
        console.log('[CourseService] Estableciendo instructor:', data);
        currentInstructor = data;
    },

    getInstructor() {
        return currentInstructor;
    },

    async getAllCourses(filters: { category?: string, level?: CourseLevel, status?: CourseStatus } = {}): Promise<CourseItem[]> {
        try {
            console.log('[CourseService] Obteniendo todos los cursos con filtros:', filters);
            const apiCourses = await cursosApi.coursesGet(filters);
            console.log('[CourseService] Cursos obtenidos:', apiCourses);
            if (apiCourses && apiCourses.length > 0) {
                return apiCourses as unknown as CourseItem[];
            }
        } catch (error) {
            throw new Error('Error al obtener cursos: ' + error);
        }
        //console.warn('No se han encontrado cursos');
        return [];
    },

    async deleteCourse(id: string): Promise<void> {
        try {
            console.log('[CourseService] Eliminando curso en API:', id);
            await cursosApi.coursesIdDelete({ id });
            console.log('[CourseService] Curso eliminado exitosamente');
        } catch (error) {
            console.error('[CourseService] Error al eliminar curso:', error);
            throw error;
        }
    },

    async updateCourse(id: string, data: Partial<CourseItem>): Promise<CourseItem> {
        try {
            console.log('[CourseService] Iniciando actualización de curso:', id, data);

            // 1. Obtener estado actual
            const currentCourse = await cursosApi.coursesIdGet({ id });

            console.log('[CourseService] Curso actual:', currentCourse);
            // 2. Mezclar datos y manejar fechas
            const updatedCourse: any = {
                ...currentCourse,
                ...data,
                startDate: data.startDate ? new Date(data.startDate) : currentCourse.startDate,
                endDate: data.endDate ? new Date(data.endDate) : currentCourse.endDate,
            };

            // 3. Limpiar campos de CourseItem que no están en Course
            delete updatedCourse.students;
            delete updatedCourse.rating;
            delete updatedCourse.instructorId;
            delete updatedCourse.instructorName;

            // 4. Asegurar que el instructor tenga todos los campos requeridos, especialmente el rol
            updatedCourse.instructor = {
                ...currentCourse.instructor,
                id: data.instructorId || currentCourse.instructor?.id || currentInstructor.id,
                name: data.instructorName || currentCourse.instructor?.name || currentInstructor.name,
                role: currentCourse.instructor?.role || 'TEACHER' // Garantizamos que no sea null
            };

            console.log('[CourseService] Enviando PUT a API:', updatedCourse);
            const apiResult = await cursosApi.coursesIdPut({ id, course: updatedCourse });

            return apiResult as unknown as CourseItem;
        } catch (error) {
            console.error('[CourseService] Error al actualizar curso:', error);
            throw error;
        }
    },

    async createCourse(data: CourseItem): Promise<CourseItem> {
        console.log('[CourseService] Iniciando creación de curso:', data);

        // Mapeamos los datos al formato que espera la API (Course)
        // Eliminamos nulls de fechas y estructuramos instructor
        const courseForApi = {
            ...data,
            startDate: data.startDate || undefined,
            endDate: data.endDate || undefined,
            instructor: {
                id: currentInstructor.id,
                name: currentInstructor.name,
                role: 'TEACHER' // Rol por defecto requerido por Instructor
            }
        };

        // Limpiamos campos que no existen en el modelo Course de la API
        const cleanedCourse: any = { ...courseForApi };
        delete cleanedCourse.instructorId;
        delete cleanedCourse.instructorName;
        delete cleanedCourse.students;
        delete cleanedCourse.rating;

        try {
            console.log('[CourseService] Enviando a API:', cleanedCourse);
            const apiCurso = await cursosApi.coursesPost({ course: cleanedCourse });

            if (apiCurso) {
                console.log('[CourseService] Curso creado exitosamente:', apiCurso);
                return apiCurso as unknown as CourseItem;
            }
        } catch (error) {
            console.error('[CourseService] Error al crear el curso en la API:', error);
            throw error;
        }

        throw new Error('No se recibió respuesta válida de la API al crear el curso');
    }

};
