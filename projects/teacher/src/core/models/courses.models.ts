import type { CourseModel } from '@shared/models/course.model';

export interface CourseItem extends Omit<CourseModel, 'category'> {
    category: 'Diseño Web' | 'Desarrollo' | 'Arquitectura' | 'Marketing'; // Tipado estricto para teacher
    students: number;
    rating: number;
    instructorId?: string;
    instructorName?: string;
}

export type CourseStatus = 'Publicado' | 'Borrador' | 'En Revision';
// Alias de tipo separado para las severidades
export type Severity = 'success' | 'secondary' | 'warning' | 'info' | 'danger';

export const STATUS_SEVERITY_MAP: Record<CourseStatus, Severity> = {
    'Publicado': 'success',
    'Borrador': 'secondary',
    'En Revision': 'warning'
};

export const COURSE_LEVELS = [
    { label: 'Principiante', value: 'Principiante' },
    { label: 'Intermedio', value: 'Intermedio' },
    { label: 'Avanzado', value: 'Avanzado' }
];

export const COURSE_CATEGORIES = [
    { label: 'Desarrollo', value: 'Desarrollo' },
    { label: 'Diseño Web', value: 'Diseño Web' },
    { label: 'Arquitectura', value: 'Arquitectura' },
    { label: 'Marketing', value: 'Marketing' }
];

export interface CourseCardProps {
    course: CourseItem;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}