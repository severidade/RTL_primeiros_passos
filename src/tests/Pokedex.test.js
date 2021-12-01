import React from 'react';
import { screen } from '@testing-library/react';
// import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
// import Pokedex from '../components/Pokedex';
import App from '../App';

describe('Req 5 - Testes em Pokedex.js', () => {
  test('Verifica se página contem h2 com texto Page requested not found 😭', () => {
    renderWithRouter(<App />);

    const titlePokedex = screen.getByRole('heading',
      { level: 2, name: /Encountered pokémons/i });
    expect(titlePokedex).toBeInTheDocument();
  });
});
