import React from 'react';
import { Tag } from 'primereact/tag';
import type { CourseCardProps } from '../../core/models/courses.models';
import { STATUS_SEVERITY_MAP } from '../../core/models/courses.models';


export const CourseCard: React.FC<CourseCardProps> = ({ course, onEdit, onDelete }) => {

    return (
        <div className="bg-surface dark:bg-surface rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-500 group flex flex-col h-full">
            {/* Imagen y Badge */}
            <div className="relative h-48 bg-bg dark:bg-bg shrink-0">
                <img
                    src={course.imageUrl || `https://api.dicebear.com/7.x/shapes/svg?seed=${course.id}`}
                    alt={course.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                        console.warn(`[CourseCard] Failed to load image URL: ${course.imageUrl}`);
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // Evitar loops infinitos
                        target.src = `https://api.dicebear.com/7.x/shapes/svg?seed=${course.id}`;
                    }}
                />
                <div className="absolute top-4 right-4">
                    <Tag
                        value={course.publicationStatus.toUpperCase()}
                        severity={STATUS_SEVERITY_MAP[course.publicationStatus]}
                        className="rounded-full px-4 text-[10px] font-black border-2 border-white dark:border-gray-900 shadow-lg"
                    />
                </div>
            </div>

            {/* Contenido */}
            <div className="p-6 flex flex-col grow">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-brand-500 bg-brand-50 dark:bg-brand-900/20 px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {course.category}
                    </span>
                </div>

                <h3 className="text-xl font-black text-text dark:text-text leading-tight mb-2 group-hover:text-brand-500 transition-colors">
                    {course.name}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-sm font-sans line-clamp-2 mb-4">
                    {course.description}
                </p>

                {/* Footer del Curso */}
                <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-gray-400">
                        <div className="flex items-center gap-1.5">
                            <i className="pi pi-users text-xs text-blue-400"></i>
                            <span className="text-xs font-bold font-sans dark:text-gray-300">{course.students}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <i className="pi pi-star-fill text-xs text-yellow-500"></i>
                            <span className="text-xs font-bold font-sans text-gray-600 dark:text-gray-400">{course.rating}</span>
                        </div>
                    </div>
                    <span className="text-xl font-black text-text dark:text-text font-sans">
                        {course.price}€
                    </span>
                </div>
            </div>

            {/* Acciones */}
            <div className="px-6 pb-6 pt-2 flex gap-2">
                <button
                    onClick={() => onEdit?.(course.id)}
                    className="flex-1 bg-bg dark:bg-bg hover:bg-brand-500 dark:hover:bg-brand-500 hover:text-white dark:hover:text-white text-gray-600 dark:text-gray-400 py-3 rounded-xl transition-all font-bold text-sm flex items-center justify-center gap-2 active:scale-95"
                >
                    <i className="pi pi-pencil text-xs"></i> Editar
                </button>
                <button
                    onClick={() => onDelete?.(course.id)}
                    className="w-12 h-12 bg-bg dark:bg-bg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 rounded-xl transition-all flex items-center justify-center active:scale-95">
                    <i className="pi pi-trash"></i>
                </button>
            </div>
        </div>
    );
};
