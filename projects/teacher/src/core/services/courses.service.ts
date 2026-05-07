import type { CourseItem } from "../models/courses.models";

// Configuración de la API
// Usar ruta relativa para que funcione con el proxy del shell
const API_URL = '/api/v1';

// Helper para obtener el token del localStorage (compartido con shell Angular)
const getToken = (): string | null => {
  return localStorage.getItem('growup-token');
};

// Helper para headers con autenticación
const getHeaders = (): HeadersInit => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

/**
 * Servicio de Cursos - Conectado al Backend Real
 */
export const CourseService = {

  /**
   * Obtener todos los cursos del profesor
   */
  getAllCourses(): Promise<CourseItem[]> {
    return fetch(`${API_URL}/teacher/courses`, {
      method: 'GET',
      headers: getHeaders()
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error al obtener cursos:', error);
      throw error;
    });
  },

  /**
   * Crear un nuevo curso
   */
  createCourse(data: CourseItem): Promise<CourseItem> {
    // Validar campos requeridos según OpenAPI
    if (!data.name || !data.category || data.price === undefined || !data.publicationStatus) {
      const missing = [];
      if (!data.name) missing.push('name');
      if (!data.category) missing.push('category');
      if (data.price === undefined) missing.push('price');
      if (!data.publicationStatus) missing.push('publicationStatus');
      
      const errorMsg = `Campos requeridos faltantes: ${missing.join(', ')}`;
      console.error('🔴', errorMsg, data);
      return Promise.reject(new Error(errorMsg));
    }

    // Adaptar formato del frontend al formato esperado por backend
    // Manejar tanto Date como string
    const formatDate = (date: string | Date | null | undefined): string | undefined => {
      if (!date) return undefined;
      if (date instanceof Date) return date.toISOString();
      return date;
    };

    // Construir objeto solo con campos válidos según OpenAPI
    const priceValue = Number(data.price);
    if (isNaN(priceValue) || priceValue <= 0) {
      return Promise.reject(new Error('El precio debe ser un número positivo mayor que 0'));
    }

    const courseData: any = {
      name: data.name,
      category: data.category,
      price: priceValue,
      publicationStatus: data.publicationStatus,
    };

    // Agregar campos opcionales solo si existen
    if (data.description) courseData.description = data.description;
    if (data.level) courseData.level = data.level;
    if (data.startDate) courseData.startDate = formatDate(data.startDate);
    if (data.endDate) courseData.endDate = formatDate(data.endDate);
    if (data.syllabus && data.syllabus.length > 0) courseData.syllabus = data.syllabus;

    console.log('🟡 Enviando datos al backend:', JSON.stringify(courseData, null, 2));

    return fetch(`${API_URL}/courses`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(courseData)
    })
    .then(async response => {
      if (!response.ok) {
        // Intentar leer el cuerpo del error
        let errorBody = '';
        try {
          errorBody = await response.text();
        } catch (e) {
          errorBody = 'No se pudo leer el cuerpo del error';
        }
        console.error('🔴 Respuesta de error del backend:', errorBody);
        throw new Error(`Error ${response.status}: ${response.statusText}. Detalle: ${errorBody}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Curso creado exitosamente:', data);
      return data;
    })
    .catch(error => {
      console.error('Error al crear curso:', error);
      throw error;
    });
  },

  /**
   * Actualizar un curso existente
   */
  updateCourse(id: string, data: Partial<CourseItem>): Promise<CourseItem> {
    // Manejar tanto Date como string
    const formatDate = (date: string | Date | null | undefined): string | undefined => {
      if (!date) return undefined;
      if (date instanceof Date) return date.toISOString();
      return date;
    };

    // Validar price si se está actualizando
    if (data.price !== undefined) {
      const priceValue = Number(data.price);
      if (isNaN(priceValue) || priceValue <= 0) {
        return Promise.reject(new Error('El precio debe ser un número positivo mayor que 0'));
      }
    }

    const courseData: any = {};
    if (data.name) courseData.name = data.name;
    if (data.description) courseData.description = data.description;
    if (data.category) courseData.category = data.category;
    if (data.level) courseData.level = data.level;
    if (data.price !== undefined) courseData.price = Number(data.price);
    if (data.publicationStatus) courseData.publicationStatus = data.publicationStatus;
    if (data.startDate) courseData.startDate = formatDate(data.startDate);
    if (data.endDate) courseData.endDate = formatDate(data.endDate);
    if (data.syllabus) courseData.syllabus = data.syllabus;

    return fetch(`${API_URL}/courses/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(courseData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Curso actualizado exitosamente:', data);
      return data;
    })
    .catch(error => {
      console.error('Error al actualizar curso:', error);
      throw error;
    });
  },

  /**
   * Eliminar un curso
   */
  deleteCourse(id: string): Promise<void> {
    return fetch(`${API_URL}/courses/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      console.log('Curso eliminado exitosamente');
    })
    .catch(error => {
      console.error('Error al eliminar curso:', error);
      throw error;
    });
  }

};

// Para compatibilidad hacia atrás (export default)
export default CourseService;
