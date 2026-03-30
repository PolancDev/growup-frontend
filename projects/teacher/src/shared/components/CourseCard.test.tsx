import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { CourseCard } from './CourseCard';

vi.mock('@shared/api', () => ({
  ProfesorApi: vi.fn().mockImplementation(() => ({
    teacherCoursesGet: vi.fn().mockResolvedValue([]),
    teacherAnalyticsSummaryGet: vi.fn().mockResolvedValue({}),
  })),
  Configuration: vi.fn(),
}));

const mockCourse = {
  id: '1',
  name: 'Test Course',
  description: 'Test Description',
  imageUrl: 'https://example.com/image.jpg',
  category: 'Diseño Web' as const,
  publicationStatus: 'Publicado' as const,
  price: 99,
  students: 150,
  rating: 4.5,
};

describe('CourseCard', () => {
  it('debería renderizar el componente', () => {
    const { container } = render(<CourseCard course={mockCourse} />);
    expect(container).toBeDefined();
  });
});
