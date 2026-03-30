import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PanelGestionPage from './PanelGestionPage';

describe('PanelGestionPage', () => {
  it('debería renderizar el componente', () => {
    const { container } = render(
      <BrowserRouter>
        <PanelGestionPage />
      </BrowserRouter>
    );
    expect(container).toBeDefined();
  });
});
