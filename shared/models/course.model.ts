export interface TopicModel {
    title: string;
    duration: number; // Minutos
}

export interface SyllabusModel {
    id?: string;
    title: string;
    description: string;
    topics: TopicModel[];
}

export interface InstructorModel {
    id: string;
    name: string;
    role: string;
    avatarUrl: string;
    bio: string;
}

export interface CourseModel {
    id: string;
    name: string;
    description?: string;
    imageUrl?: string;
    category: string;
    level?: 'Principiante' | 'Intermedio' | 'Avanzado';
    price: number;
    duration?: number; // Horas totales
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    publicationStatus: 'Publicado' | 'Borrador' | 'En Revision';
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    instructorId?: string;  // ID del instructor (del backend)
    instructor?: InstructorModel;
    syllabus?: SyllabusModel[];
    enrolledCount?: number;
}
