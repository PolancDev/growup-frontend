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
import type { SyllabusModel } from '@shared/models/course.model';
import { CourseService } from '../../core/services/courses.service';
import type { CourseItem } from '../../core/models/courses.models';
import { COURSE_CATEGORIES, COURSE_LEVELS } from '../../core/models/courses.models';

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

    // Estado del formulario
    const [form, setForm] = useState<{
        name: string;
        description: string;
        category: string;
        level: string;
        price: number;
        startDate: Date | null;
        endDate: Date | null;
    }>({
        name: '',
        description: '',
        category: COURSE_CATEGORIES[0].value as any,
        level: COURSE_LEVELS[0].value,
        price: 0,
        startDate: null,
        endDate: null,
    });

    const [syllabus, setSyllabus] = useState<SyllabusModel[]>([])
    //     { title: 'Introducción', description: 'Conceptos básicos', topics: [{ title: 'Bienvenida', duration: 5 }] }
    // ]);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Función de validación
    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!form.name.trim()) newErrors.name = 'El nombre del curso es obligatorio';
        if (!form.description.trim()) newErrors.description = 'La descripción es obligatoria';
        if (!form.category) newErrors.category = 'La categoría es obligatoria';
        if (!form.level) newErrors.level = 'El nivel es obligatorio';
        if (form.price <= 0) newErrors.price = 'El precio debe ser mayor a 0';
        if (!form.startDate) newErrors.startDate = 'La fecha de inicio es obligatoria';
        if (!form.endDate) newErrors.endDate = 'La fecha de fin es obligatoria';

        if (form.startDate && form.endDate && form.startDate > form.endDate) {
            newErrors.endDate = 'La fecha de fin debe ser posterior a la de inicio';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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
                            category: course.category as 'DISEÑO WEB' | 'DESARROLLO' | 'ARQUITECTURA' | 'MARKETING',
                            level: course.level as 'Principiante' | 'Intermedio' | 'Avanzado',
                            price: course.price,
                            startDate: course.startDate ? new Date(course.startDate) : null,
                            endDate: course.endDate ? new Date(course.endDate) : null,
                        });
                        if (course.syllabus && course.syllabus.length > 0) {
                            setSyllabus(course.syllabus);
                        }
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [id, isEdit]);


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
        const newSyllabus = [...syllabus];
        newSyllabus[sectionIndex].topics[topicIndex] = {
            ...newSyllabus[sectionIndex].topics[topicIndex],
            [field]: value
        };
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
        console.log('Guardando borrador: ', form);

        // Para borrador permitimos guardar con menos validaciones, 
        // pero al menos necesitamos el nombre o categoría si se ha tocado algo.
        if (!form.name.trim()) {
            setErrors({ name: 'El nombre es necesario incluso para borradores' });
            return;
        }

        setLoading(true);
        try {
            const courseData: CourseItem = {
                id: id || self.crypto.randomUUID(),
                name: form.name,
                description: form.description,
                category: form.category as 'Diseño Web' | 'Desarrollo' | 'Arquitectura' | 'Marketing',
                students: 0,
                rating: 0,
                price: form.price,
                publicationStatus: 'Borrador',
                level: form.level as 'Principiante' | 'Intermedio' | 'Avanzado',
                startDate: form.startDate,
                endDate: form.endDate,
                syllabus: syllabus
            };

            if (isEdit && id) {
                console.log('Curso a modificar: ', courseData)
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
        console.log('Guardando nuevo curso: ', form);

        if (!validateForm()) {
            console.error('Formulario inválido', errors);
            return;
        }

        setLoading(true);
        try {
            const courseData: CourseItem = {
                id: self.crypto.randomUUID(),
                name: form.name,
                description: form.description,
                category: form.category as 'Diseño Web' | 'Desarrollo' | 'Arquitectura' | 'Marketing',
                students: 0,
                rating: 0,
                price: form.price,
                publicationStatus: 'En Revision',
                level: form.level as 'Principiante' | 'Intermedio' | 'Avanzado',
                startDate: form.startDate,
                endDate: form.endDate,
                syllabus: syllabus
            };

            await CourseService.createCourse(courseData);
            console.log('Curso creado y enviado a revisión');

            navigate('/gestion-cursos');
        } catch (error) {
            console.error('Error al guardar curso:', error);
        } finally {
            setLoading(false);
        }
    };

    // Función para publicar el curso
    const handlePublish = async () => {
        if (!validateForm()) {
            console.error('Formulario inválido para publicar');
            return;
        }

        setLoading(true);
        try {
            const courseData: CourseItem = {
                id: id || self.crypto.randomUUID(),
                name: form.name,
                description: form.description,
                category: form.category as 'Diseño Web' | 'Desarrollo' | 'Arquitectura' | 'Marketing',
                students: 0,
                rating: 0,
                price: form.price,
                publicationStatus: 'Publicado',
                level: form.level as 'Principiante' | 'Intermedio' | 'Avanzado',
                startDate: form.startDate,
                endDate: form.endDate,
                syllabus: syllabus
            };

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
                                    className={`w-full p-4 rounded-2xl border-gray-100 dark:border-gray-800 bg-bg dark:bg-bg/50 font-sans text-lg focus:bg-surface dark:focus:bg-surface text-text dark:text-text ${errors.name ? 'p-invalid border-red-500' : ''}`}
                                    value={form.name}
                                    onChange={(e) => {
                                        handleInputChange('name', e.target.value);
                                        if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                                    }}
                                />
                                {errors.name && <small className="text-red-500 ml-1 font-bold">{errors.name}</small>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Descripción Corta</label>
                                <InputTextarea rows={3}
                                    placeholder="Describe brevemente de qué trata el curso..."
                                    className={`w-full p-4 rounded-2xl border-gray-100 dark:border-gray-800 bg-bg dark:bg-bg/50 font-sans focus:bg-surface dark:focus:bg-surface text-text dark:text-text ${errors.description ? 'p-invalid border-red-500' : ''}`}
                                    value={form.description}
                                    onChange={(e) => {
                                        handleInputChange('description', e.target.value);
                                        if (errors.description) setErrors(prev => ({ ...prev, description: '' }));
                                    }}
                                />
                                {errors.description && <small className="text-red-500 ml-1 font-bold">{errors.description}</small>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Categoría</label>
                                    <Dropdown
                                        options={COURSE_CATEGORIES}
                                        placeholder="Selecciona categoría"
                                        className={`w-full rounded-2xl border-gray-100 dark:border-gray-800 bg-bg dark:bg-bg/50 font-sans ${errors.category ? 'p-invalid border-red-500' : ''}`}
                                        value={form.category}
                                        onChange={(e) => {
                                            handleInputChange('category', e.value);
                                            if (errors.category) setErrors(prev => ({ ...prev, category: '' }));
                                        }}
                                    />
                                    {errors.category && <small className="text-red-500 ml-1 font-bold">{errors.category}</small>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Nivel</label>
                                    <Dropdown
                                        options={COURSE_LEVELS}
                                        placeholder="Nivel del curso"
                                        className={`w-full rounded-2xl border-gray-100 dark:border-gray-800 bg-bg dark:bg-bg/50 font-sans ${errors.level ? 'p-invalid border-red-500' : ''}`}
                                        value={form.level}
                                        onChange={(e) => {
                                            handleInputChange('level', e.value);
                                            if (errors.level) setErrors(prev => ({ ...prev, level: '' }));
                                        }}
                                    />
                                    {errors.level && <small className="text-red-500 ml-1 font-bold">{errors.level}</small>}
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
                                    inputClassName={`p-4 rounded-2xl border-gray-100 dark:border-gray-800 bg-bg dark:bg-bg/50 ${errors.startDate ? 'p-invalid border-red-500' : ''}`}
                                    value={form.startDate}
                                    onChange={(e) => {
                                        handleInputChange('startDate', e.value as Date | null);
                                        if (errors.startDate) setErrors(prev => ({ ...prev, startDate: '' }));
                                    }}
                                    dateFormat="dd/mm/yy"
                                    locale="es"
                                />
                                {errors.startDate && <small className="text-red-500 ml-1 font-bold">{errors.startDate}</small>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Fecha de Fin</label>
                                <Calendar
                                    showIcon
                                    placeholder="dd/mm/aaaa"
                                    className="w-full"
                                    inputClassName={`p-4 rounded-2xl border-gray-100 dark:border-gray-800 bg-bg dark:bg-bg/50 ${errors.endDate ? 'p-invalid border-red-500' : ''}`}
                                    value={form.endDate}
                                    onChange={(e) => {
                                        handleInputChange('endDate', e.value as Date | null);
                                        if (errors.endDate) setErrors(prev => ({ ...prev, endDate: '' }));
                                    }}
                                    dateFormat="dd/mm/yy"
                                    locale="es"
                                />
                                {errors.endDate && <small className="text-red-500 ml-1 font-bold">{errors.endDate}</small>}
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
                                        <InputTextarea
                                            value={section.description}
                                            placeholder="Descripción breve del contenido de este módulo..."
                                            rows={2}
                                            className="w-full p-3 mt-2 bg-surface/50 dark:bg-surface/50 rounded-xl border-gray-100 dark:border-gray-800 text-sm text-text dark:text-text focus:border-brand-500"
                                            onChange={(e) => handleSectionChange(sIdx, 'description', e.target.value)}
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
                                                    onValueChange={(e) => handleTopicChange(sIdx, tIdx, 'duration', e.value || 0)}
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
                                inputClassName={`p-4 rounded-2xl border-gray-100 dark:border-gray-800 bg-bg dark:bg-bg/50 font-black text-2xl text-text dark:text-text ${errors.price ? 'p-invalid border-red-500' : ''}`}
                                placeholder="0,00 €"
                                value={form.price}
                                onValueChange={(e) => {
                                    handleInputChange('price', e.value || 0);
                                    if (errors.price) setErrors(prev => ({ ...prev, price: '' }));
                                }}
                            />
                            {errors.price && <small className="text-red-500 ml-1 font-bold">{errors.price}</small>}
                        </div>
                    </section>

                    {/* Sección 5: Instructor */}
                    <section className="bg-surface dark:bg-surface p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800">
                        <h2 className="text-xl font-black text-text dark:text-text mb-6 font-sans italic">Instructor</h2>
                        <div className="flex items-center gap-4 bg-bg dark:bg-bg p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher" alt="Instructor" className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-700 shadow-sm" />
                            <div>
                                <p className="font-black text-text dark:text-text leading-tight">{CourseService.getInstructor().name || 'Juan Formador'}</p>
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
