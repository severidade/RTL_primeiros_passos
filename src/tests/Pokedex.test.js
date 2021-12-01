import React from 'react';
import { screen } from '@testing-library/react';
// import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import Pokedex from '../components/Pokedex';
import App from '../App';

describe('Req 5 - Testes em Pokedex.js', () => {
  test('Verifica se página contem h2 com texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const titlePokedex = screen.getByRole('heading',
      { level: 2, name: /Encountered pokémons/i });
    expect(titlePokedex).toBeInTheDocument();
  });

  test('Verifica exibição do próximo Pokémon ao clicar no botão próximo', () => {
    // Entra na página do Pikachu
    renderWithRouter(<App />);

    // Clica em proximo pokemon
    const nextPokemon = screen.getByTestId('next-pokemon', { text: /Próximo pokémon/i });
    userEvent.click(nextPokemon);

    // Verifica se Vai para o o pokemon Caterpie
    const isCaterpie = screen.getByTestId('pokemon-name', { text: /Próximo Caterpie/i });
    expect(isCaterpie).toBeDefined();
  });
});
