import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { addLocale } from 'primereact/api';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import type { SyllabusModel } from '@shared/models/course.model';
import { CourseService } from '../../core/services/courses.service';
import type { CourseItem } from '../../core/models/courses.models';

// Configurar locale español para PrimeReact
addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar'
});

export default function GestionCursosEditorPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);
    const toast = useRef<Toast>(null);

    // Estado del formulario
    const [form, setForm] = useState<{
        name: string;
        description: string;
        category: 'DISEÑO WEB' | 'DESARROLLO' | 'ARQUITECTURA' | '';
        level: string;
        price: number;
        startDate: Date | null;
        endDate: Date | null;
    }>({
        name: '',
        description: '',
        category: '',
        level: '',
        price: 49.99,
        startDate: null,
        endDate: null,
    });

    const [syllabus, setSyllabus] = useState<SyllabusModel[]>([
        { title: 'Introducción', description: 'Conceptos básicos', topics: [{ title: 'Bienvenida', duration: 5 }] }
    ]);

    const [loading, setLoading] = useState(false);

    // Cargar datos del curso si estamos en modo edición
    useEffect(() => {
        if (isEdit && id) {
            setLoading(true);
            CourseService.getAllCourses()
                .then(courses => {
                    const course = courses.find(c => c.id === id);
                    if (course) {
                        setForm({
                            name: course.name,
                            description: course.description || '',
                            category: course.category as 'DISEÑO WEB' | 'DESARROLLO' | 'ARQUITECTURA',
                            level: course.level || 'Intermedio',
                            price: course.price,
                            startDate: course.startDate ? new Date(course.startDate) : null,
                            endDate: course.endDate ? new Date(course.endDate) : null,
                        });
                        if (course.syllabus && course.syllabus.length > 0) {
                            // Asegurar que duration sea número en todos los topics
                            const normalizedSyllabus = course.syllabus.map(section => ({
                                ...section,
                                topics: section.topics.map(topic => ({
                                    ...topic,
                                    duration: typeof topic.duration === 'string' ? parseInt(topic.duration, 10) || 0 : (topic.duration || 0)
                                }))
                            }));
                            console.log('🟡 Syllabus cargado (normalizado):', normalizedSyllabus);
                            setSyllabus(normalizedSyllabus);
                        }
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [id, isEdit]);

    const levels = [
        { label: 'Principiante', value: 'Principiante' },
        { label: 'Intermedio', value: 'Intermedio' },
        { label: 'Avanzado', value: 'Avanzado' }
    ];

    const categories = [
        { label: 'Desarrollo', value: 'DESARROLLO' },
        { label: 'Diseño Web', value: 'DISEÑO WEB' },
        { label: 'Arquitectura', value: 'ARQUITECTURA' },
        { label: 'Marketing', value: 'MARKETING' }
    ];

    // Handlers para actualizar el formulario
    const handleInputChange = (field: keyof typeof form, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSectionChange = (index: number, field: keyof SyllabusModel, value: string) => {
        const newSyllabus = [...syllabus];
        newSyllabus[index] = { ...newSyllabus[index], [field]: value };
        setSyllabus(newSyllabus);
    };

    const handleTopicChange = (sectionIndex: number, topicIndex: number, field: 'title' | 'duration', value: string | number) => {
        console.log(`🟡 handleTopicChange - section: ${sectionIndex}, topic: ${sectionIndex}, field: ${field}, value:`, value, 'type:', typeof value);
        
        const newSyllabus = [...syllabus];
        // Asegurar que duration sea número
        const finalValue = field === 'duration' ? (typeof value === 'string' ? parseInt(value, 10) || 0 : (value || 0)) : value;
        
        newSyllabus[sectionIndex].topics[topicIndex] = {
            ...newSyllabus[sectionIndex].topics[topicIndex],
            [field]: finalValue
        };
        
        console.log('🟢 Topic actualizado:', newSyllabus[sectionIndex].topics[topicIndex]);
        setSyllabus(newSyllabus);
    };

    const addSection = () => {
        setSyllabus([...syllabus, { title: '', description: '', topics: [] }]);
    };

    const removeSection = (index: number) => {
        setSyllabus(syllabus.filter((_, i) => i !== index));
    };

    const addTopic = (sectionIndex: number) => {
        const newSyllabus = [...syllabus];
        newSyllabus[sectionIndex].topics.push({ title: '', duration: 0 });
        setSyllabus(newSyllabus);
    };

    const removeTopic = (sectionIndex: number, topicIndex: number) => {
        const newSyllabus = [...syllabus];
        newSyllabus[sectionIndex].topics = newSyllabus[sectionIndex].topics.filter((_, i) => i !== topicIndex);
        setSyllabus(newSyllabus);
    };

    // Función para guardar como borrador (solo en modo edición)
    const handleSaveDraft = async () => {
        if (!form.category) {
            console.error('La categoría es obligatoria');
            return;
        }

        setLoading(true);
        try {
            // Normalizar syllabus antes de enviar
            const normalizedSyllabus = syllabus.map(section => ({
                ...section,
                topics: section.topics.map(topic => ({
                    title: topic.title,
                    duration: Number(topic.duration) || 0
                }))
            }));

            const courseData: CourseItem = {
                id: id || String(Date.now()),
                name: form.name,
                description: form.description,
                category: form.category as 'DISEÑO WEB' | 'DESARROLLO' | 'ARQUITECTURA' | 'MARKETING',
                students: 0,
                rating: 0,
                price: form.price,
                publicationStatus: 'Borrador',
                level: form.level as 'Principiante' | 'Intermedio' | 'Avanzado',
                startDate: form.startDate,
                endDate: form.endDate,
                syllabus: normalizedSyllabus
            };

            console.log('🟡 Guardando borrador con syllabus:', JSON.stringify(normalizedSyllabus, null, 2));

            if (isEdit && id) {
                await CourseService.updateCourse(id, courseData);
                console.log('Curso guardado como borrador');
            }

            navigate('/gestion-cursos');
        } catch (error) {
            console.error('Error al guardar borrador:', error);
        } finally {
            setLoading(false);
        }
    };

    // Función para guardar nuevo curso (solo en modo creación)
    const handleSaveNew = async () => {
        if (!form.category) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'La categoría es obligatoria',
                life: 3000
            });
            return;
        }

        if (!form.name.trim()) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'El nombre del curso es obligatorio',
                life: 3000
            });
            return;
        }

        if (!form.price || form.price <= 0) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'El precio debe ser mayor que 0',
                life: 3000
            });
            return;
        }

        setLoading(true);
        try {
            // Normalizar syllabus antes de enviar
            const normalizedSyllabus = syllabus.map(section => ({
                ...section,
                topics: section.topics.map(topic => ({
                    title: topic.title,
                    duration: Number(topic.duration) || 0
                }))
            }));

            const courseData: CourseItem = {
                id: String(Date.now()),
                name: form.name,
                description: form.description,
                category: form.category as 'DISEÑO WEB' | 'DESARROLLO' | 'ARQUITECTURA' | 'MARKETING',
                students: 0,
                rating: 0,
                price: form.price,
                publicationStatus: 'En Revision',
                level: form.level as 'Principiante' | 'Intermedio' | 'Avanzado',
                startDate: form.startDate,
                endDate: form.endDate,
                syllabus: normalizedSyllabus
            };

            console.log('🟡 Creando curso con syllabus:', JSON.stringify(normalizedSyllabus, null, 2));
            const createdCourse = await CourseService.createCourse(courseData);
            console.log('🟢 Curso creado:', createdCourse);

            toast.current?.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Curso creado y enviado a revisión',
                life: 3000
            });

            navigate('/gestion-cursos');
        } catch (error: any) {
            console.error('🔴 Error al guardar curso:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: error.message || 'No se pudo crear el curso',
                life: 5000
            });
        } finally {
            setLoading(false);
        }
    };

    // Función para publicar el curso
    const handlePublish = async () => {
        if (!form.category) {
            console.error('La categoría es obligatoria');
            return;
        }

        setLoading(true);
        try {
            // Normalizar syllabus antes de enviar
            const normalizedSyllabus = syllabus.map(section => ({
                ...section,
                topics: section.topics.map(topic => ({
                    title: topic.title,
                    duration: Number(topic.duration) || 0
                }))
            }));

            const courseData: CourseItem = {
                id: id || String(Date.now()),
                name: form.name,
                description: form.description,
                category: form.category as 'DISEÑO WEB' | 'DESARROLLO' | 'ARQUITECTURA' | 'MARKETING',
                students: 0,
                rating: 0,
                price: form.price,
                publicationStatus: 'Publicado',
                level: form.level as 'Principiante' | 'Intermedio' | 'Avanzado',
                startDate: form.startDate,
                endDate: form.endDate,
                syllabus: normalizedSyllabus
            };

            console.log('🟡 Enviando curso con syllabus:', JSON.stringify(normalizedSyllabus, null, 2));

            if (isEdit && id) {
                await CourseService.updateCourse(id, courseData);
                console.log('Curso actualizado y publicado');
            } else {
                await CourseService.createCourse(courseData);
                console.log('Curso creado y publicado');
            }

            navigate('/gestion-cursos');
        } catch (error) {
            console.error('Error al publicar curso:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4 space-y-8 animate-fade-in pb-20 transition-colors duration-300">
            <Toast ref={toast} position="top-right" />
            {/* Header Sticky */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface/80 dark:bg-surface/80 backdrop-blur-md p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 sticky top-4 z-10 shadow-sm">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <Button
                            icon="pi pi-arrow-left"
                            className="p-button-text p-button-rounded text-gray-400 dark:text-gray-500 hover:text-brand-500"
                            onClick={() => navigate(-1)}
                        />
                        <h1 className="text-3xl font-black text-text dark:text-text font-sans tracking-tight">
                            {isEdit ? 'Editar Curso' : 'Nuevo Curso'}
                        </h1>
                    </div>
                    {isEdit && <Tag value={`ID: ${id}`} severity="info" className="ml-12 font-mono text-[10px]" />}
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    {isEdit ? (
                        // Modo Edición: Mostrar "Guardar Borrador" y "Publicar Curso"
                        <>
                            <Button label="Guardar Borrador"
                                icon="pi pi-save"
                                className="p-button-outlined p-button-secondary rounded-xl flex-1 md:flex-none font-bold dark:border-gray-700 dark:text-gray-300"
                                onClick={handleSaveDraft}
                                loading={loading}
                                disabled={loading}
                            />
                            <Button label="Publicar Curso"
                                icon="pi pi-cloud-upload"
                                className="bg-brand-500 border-brand-500 rounded-xl flex-1 md:flex-none font-black shadow-lg shadow-brand-500/20"
                                onClick={handlePublish}
                                loading={loading}
                                disabled={loading}
                            />
                        </>
                    ) : (
                        // Modo Nuevo: Solo mostrar "Guardar"
                        <Button label="Guardar"
                            icon="pi pi-save"
                            className="bg-brand-500 border-brand-500 rounded-xl flex-1 md:flex-none font-black shadow-lg shadow-brand-500/20"
                            onClick={handleSaveNew}
                            loading={loading}
                            disabled={loading}
                        />
                    )}
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna Izquierda: Formulario Principal */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Sección 1: Info General */}
                    <section className="bg-surface dark:bg-surface p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800">
                        <h2 className="text-xl font-black text-text dark:text-text mb-6 flex items-center gap-2 font-sans italic">
                            <i className="pi pi-info-circle text-brand-500"></i> Información General
                        </h2>
                        <div className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Título del Curso</label>
                                <InputText placeholder="Ej: Master en React 19 y Next.js"
                                    className="w-full p-4 rounded-2xl border-gray-100 dark:border-gray-800 bg-bg dark:bg-bg/50 font-sans text-lg focus:bg-surface dark:focus:bg-surface text-text dark:text-text"
                                    value={form.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Descripción Corta</label>
                                <InputTextarea rows={3}
                                    placeholder="Describe brevemente de qué trata el curso..."
                                    className="w-full p-4 rounded-2xl border-gray-100 dark:border-gray-800 bg-bg dark:bg-bg/50 font-sans focus:bg-surface dark:focus:bg-surface text-text dark:text-text"
                                    value={form.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Categoría</label>
                                    <Dropdown
                                        options={categories}
                                        placeholder="Selecciona categoría"
                                        className="w-full rounded-2xl border-gray-100 dark:border-gray-800 bg-bg dark:bg-bg/50 font-sans"
                                        value={form.category}
                                        onChange={(e) => handleInputChange('category', e.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Nivel</label>
                                    <Dropdown
                                        options={levels}
                                        placeholder="Nivel del curso"
                                        className="w-full rounded-2xl border-gray-100 dark:border-gray-800 bg-bg dark:bg-bg/50 font-sans"
                                        value={form.level}
                                        onChange={(e) => handleInputChange('level', e.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sección 2: Planificación y Fechas */}
                    <section className="bg-surface dark:bg-surface p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800">
                        <h2 className="text-xl font-black text-text dark:text-text mb-6 flex items-center gap-2 font-sans italic">
                            <i className="pi pi-calendar-plus text-brand-500"></i> Planificación
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Fecha de Inicio</label>
                                <Calendar
                                    showIcon
                                    placeholder="dd/mm/aaaa"
                                    className="w-full"
                                    inputClassName="p-4 rounded-2xl border-gray-100 dark:border-gray-800 bg-bg dark:bg-bg/50"
                                    value={form.startDate}
                                    onChange={(e) => handleInputChange('startDate', e.value as Date | null)}
                                    dateFormat="dd/mm/yy"
                                    locale="es"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Fecha de Fin</label>
                                <Calendar
                                    showIcon
                                    placeholder="dd/mm/aaaa"
                                    className="w-full"
                                    inputClassName="p-4 rounded-2xl border-gray-100 dark:border-gray-800 bg-bg dark:bg-bg/50"
                                    value={form.endDate}
                                    onChange={(e) => handleInputChange('endDate', e.value as Date | null)}
                                    dateFormat="dd/mm/yy"
                                    locale="es"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Sección 3: Temario (Syllabus) */}
                    <section className="bg-surface dark:bg-surface p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black text-text dark:text-text flex items-center gap-2 font-sans italic">
                                <i className="pi pi-list text-brand-500"></i> Plan de Estudios (Temario)
                            </h2>
                            <Button label="Añadir Sección" icon="pi pi-plus" className="p-button-text font-bold text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/10 rounded-xl" onClick={addSection} />
                        </div>

                        <div className="space-y-6">
                            {syllabus.map((section, sIdx) => (
                                <div key={sIdx} className="p-6 bg-bg dark:bg-bg rounded-3xl border border-gray-100 dark:border-gray-800 relative group">
                                    <div className="grid grid-cols-1 gap-4 mb-4">
                                        <InputText
                                            value={section.title}
                                            placeholder={`Título de la Sección ${sIdx + 1}`}
                                            className="font-black text-lg p-3 bg-transparent border-none border-b border-gray-200 dark:border-gray-800 rounded-none focus:shadow-none focus:border-brand-500 text-text dark:text-text"
                                            onChange={(e) => handleSectionChange(sIdx, 'title', e.target.value)}
                                        />
                                    </div>

                                    {/* Temas / Topics */}
                                    <div className="space-y-3 ml-2">
                                        {section.topics.map((topic, tIdx: number) => (
                                            <div key={tIdx} className="flex gap-2 items-center">
                                                <i className="pi pi-play-circle text-gray-300 dark:text-gray-600 text-sm flex-shrink-0"></i>
                                                <InputText
                                                    placeholder="Nombre del tema"
                                                    className="flex-1 min-w-0 p-2 bg-surface dark:bg-surface rounded-lg border-gray-100 dark:border-gray-800 text-sm text-text dark:text-text"
                                                    value={topic.title}
                                                    onChange={(e) => handleTopicChange(sIdx, tIdx, 'title', e.target.value)}
                                                />
                                                <InputNumber
                                                    placeholder="0"
                                                    suffix=" min"
                                                    className="w-24 text-sm flex-shrink-0"
                                                    inputClassName="w-full p-2 border-gray-100 dark:border-gray-800 bg-surface dark:bg-surface text-text dark:text-text text-center font-bold"
                                                    value={topic.duration}
                                                    onValueChange={(e) => {
                                                        console.log('🟡 InputNumber onValueChange:', e.value, 'tipo:', typeof e.value);
                                                        handleTopicChange(sIdx, tIdx, 'duration', e.value ?? 0);
                                                    }}
                                                    mode="decimal"
                                                    min={0}
                                                    max={999}
                                                />
                                                <Button
                                                    icon="pi pi-times"
                                                    className="p-button-text p-button-danger p-button-sm rounded-lg flex-shrink-0 w-8 h-8"
                                                    onClick={() => removeTopic(sIdx, tIdx)}
                                                />
                                            </div>
                                        ))}
                                        <Button
                                            label="Añadir Tema"
                                            icon="pi pi-plus"
                                            className="p-button-text p-button-sm text-gray-400 dark:text-gray-500 hover:text-brand-500 mt-2 font-bold"
                                            onClick={() => addTopic(sIdx)}
                                        />
                                    </div>

                                    <Button
                                        icon="pi pi-trash"
                                        className="absolute top-4 right-4 p-button-text p-button-danger opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => removeSection(sIdx)}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Columna Derecha: Configuración Lateral */}
                <div className="space-y-8">

                    {/* Sección 4: Imagen y Precio */}
                    <section className="bg-surface dark:bg-surface p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800">
                        <h2 className="text-xl font-black text-text dark:text-text mb-6 font-sans italic">Multimedia</h2>
                        <div className="w-full aspect-video bg-bg dark:bg-bg rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 gap-2 cursor-pointer hover:bg-gray-100/50 transition-colors">
                            <i className="pi pi-image text-4xl"></i>
                            <span className="font-bold text-xs uppercase tracking-widest">Subir Imagen Portada</span>
                        </div>

                        <Divider className="my-8" />

                        <h2 className="text-xl font-black text-text dark:text-text mb-6 font-sans italic">Inversión</h2>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Precio del Curso</label>
                            <InputNumber
                                mode="currency"
                                currency="EUR"
                                locale="es-ES"
                                className="w-full"
                                inputClassName="p-4 rounded-2xl border-gray-100 dark:border-gray-800 bg-bg dark:bg-bg/50 font-black text-2xl text-text dark:text-text"
                                placeholder="0,00 €"
                                value={form.price}
                                onValueChange={(e) => handleInputChange('price', e.value || 0)}
                            />
                        </div>
                    </section>

                    {/* Sección 5: Instructor */}
                    <section className="bg-surface dark:bg-surface p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800">
                        <h2 className="text-xl font-black text-text dark:text-text mb-6 font-sans italic">Instructor</h2>
                        <div className="flex items-center gap-4 bg-bg dark:bg-bg p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher" alt="Instructor" className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-700 shadow-sm" />
                            <div>
                                <p className="font-black text-text dark:text-text leading-tight">Juan Formador</p>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Autor del Curso</p>
                            </div>
                            <Button icon="pi pi-external-link" className="p-button-text p-button-rounded p-button-sm ml-auto text-gray-400 hover:text-brand-500" />
                        </div>
                    </section>

                    {/* Sección 6: Estadísticas automáticas */}
                    <section className="bg-brand-500 p-8 rounded-[2.5rem] shadow-xl shadow-brand-500/20 text-white">
                        <h2 className="text-xl font-black mb-6 font-sans italic font-grow">Previsualización</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-brand-100 text-sm font-bold uppercase tracking-widest">Temas</span>
                                <span className="text-2xl font-black">
                                    {syllabus.reduce((acc, sec) => acc + sec.topics.length, 0)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-brand-100 text-sm font-bold uppercase tracking-widest">Duración</span>
                                <span className="text-2xl font-black">
                                    {Math.round(syllabus.reduce((acc, sec) => acc + sec.topics.reduce((a: number, t) => a + t.duration, 0), 0) / 60)}h
                                </span>
                            </div>
                        </div>
                    </section>

                </div>
            </div >
        </div >
    );
}
