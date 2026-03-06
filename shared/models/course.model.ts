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
    startDate?: Date | string | undefined | null;
    endDate?: Date | string | undefined | null;
    publicationStatus: 'Publicado' | 'Borrador' | 'En Revision';
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | undefined | null;
    instructor?: InstructorModel;
    syllabus?: SyllabusModel[];
    enrolledCount?: number;
}
