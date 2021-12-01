import React from 'react';
import { screen } from '@testing-library/react';
// import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Req 2 - Página About ', () => {
  test('Verifica se pag About tem h2 com texto"About Pokédex"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const sobrePokemons = screen.getByRole('heading',
      { level: 2, name: /About Pokédex/i });
    expect(sobrePokemons).toBeInTheDocument();
  });
});
