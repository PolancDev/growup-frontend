import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { GestionCursosEditorPage } from './GestionCursosEditorPage';

vi.mock('../../core/services/courses.service', () => ({
  CourseService: {
    getAllCourses: vi.fn().mockResolvedValue([]),
    createCourse: vi.fn().mockResolvedValue({}),
    updateCourse: vi.fn().mockResolvedValue({}),
    getInstructor: () => ({ name: 'Test Instructor' })
  }
}));

describe('GestionCursosEditorPage', () => {
  it('debería renderizar el componente en modo creación', () => {
    const { container } = render(
      <BrowserRouter>
        <GestionCursosEditorPage />
      </BrowserRouter>
    );
    expect(container).toBeDefined();
  });

  it('debería mostrar "Nuevo Curso" en modo creación', () => {
    const { getByText } = render(
      <BrowserRouter>
        <GestionCursosEditorPage />
      </BrowserRouter>
    );
    expect(getByText('Nuevo Curso')).toBeDefined();
  });
});
