import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { StatsCard } from './StatsCard';

vi.mock('@shared/api', () => ({
  ProfesorApi: vi.fn().mockImplementation(() => ({
    teacherCoursesGet: vi.fn().mockResolvedValue([]),
  })),
  Configuration: vi.fn(),
}));

describe('StatsCard', () => {
  it('debería renderizar el componente', () => {
    const { container } = render(<StatsCard title="Total Courses" value={10} icon="pi-book" colorClass="blue" />);
    expect(container).toBeDefined();
  });
});
