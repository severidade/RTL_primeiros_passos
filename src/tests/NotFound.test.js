import React from 'react';
import { screen } from '@testing-library/react';
// import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';
// import App from '../App';

describe('Req 4 - Testes em NotFound.js ', () => {
  test('Verifica se página contem h2 com texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const titleNotFound = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });
    expect(titleNotFound).toBeInTheDocument();
  });

  test('Verifica se pag NotFound contém o gif do Pikachu chorando', () => {
    renderWithRouter(<NotFound />);

    const pikachuCrying = screen.getByAltText(/Pikachu crying because/i);
    expect(pikachuCrying).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
