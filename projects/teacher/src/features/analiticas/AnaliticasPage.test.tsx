import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AnaliticasPage from './AnaliticasPage';

describe('AnaliticasPage', () => {
  it('debería renderizar el componente', () => {
    const { container } = render(
      <BrowserRouter>
        <AnaliticasPage />
      </BrowserRouter>
    );
    expect(container).toBeDefined();
  });
});
