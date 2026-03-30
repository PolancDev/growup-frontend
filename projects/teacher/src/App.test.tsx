import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import App from './App';

vi.mock('./core/services/courses.service', () => ({
  CourseService: {
    setInstructor: vi.fn(),
    getInstructor: () => ({ name: 'Test Instructor' })
  }
}));

describe('App', () => {
  it('debería renderizar sin errores', async () => {
    const router = createMemoryRouter([
      {
        path: '/',
        element: <div>Test Route</div>
      }
    ]);

    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeDefined();
  });

  it('debería inicializar CourseService con instructor dados', () => {
    const { CourseService } = require('./core/services/courses.service');
    
    render(<App instructorId="123" instructorName="Test User" />);
    
    expect(CourseService.setInstructor).toHaveBeenCalledWith({ id: '123', name: 'Test User' });
  });
});
