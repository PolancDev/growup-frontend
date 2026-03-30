import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GestionCursosPage from './GestionCursosPage';

describe('GestionCursosPage', () => {
  it('debería renderizar el componente', () => {
    const { container } = render(
      <BrowserRouter>
        <GestionCursosPage />
      </BrowserRouter>
    );
    expect(container).toBeDefined();
  });
});
