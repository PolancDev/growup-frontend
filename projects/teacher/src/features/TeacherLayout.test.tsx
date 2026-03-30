import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TeacherLayout from '../features/TeacherLayout';

const TestChild = () => <div data-testid="child-content">Test Content</div>;

describe('TeacherLayout', () => {
  // Verifica que se renderiza el Outlet
  it('debería renderizar el Outlet', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<TeacherLayout />}>
            <Route index element={<TestChild />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('child-content')).toBeDefined();
  });

  // Verifica que tiene las clases de estilo correctas
  it('debería tener las clases de estilo correctas', () => {
    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route element={<TeacherLayout />}>
            <Route index element={<TestChild />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
    
    const mainElement = container.querySelector('main');
    expect(mainElement?.className).toContain('max-w-7xl');
  });
});
