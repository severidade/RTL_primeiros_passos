import React from 'react';
import { screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';

// import userEvent from '@testing-library/user-event';
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
    // Entra na página do Principal
    renderWithRouter(<App />);

    // Inicia com - um pokemon Eletrico
    const pokemonElectric = screen.getByTestId('pokemon-type');
    expect(pokemonElectric.textContent).toBe('Electric');

    // Escolhe os do tipo fire
    const clickFire = screen.getByRole('button', { name: /Fire/i });
    fireEvent.click(clickFire);

    // // Verifica se carerga Charmander o primeiro pokemon do tipo fire
    const isCharmander = screen.getByTestId('pokemon-type', { text: /Fire/i });
    expect(isCharmander).toBeInTheDocument();

    // // Clica no botão próximo
    const nextPokemon = screen.getByTestId('next-pokemon', { text: /Próximo pokémon/i });
    fireEvent.click(nextPokemon);
  });

  test('Verifica a exibição de um único pokemon por vez', () => {
    renderWithRouter(<App />);
    const btnName = /Próximo pokémon/i;
    const btn = screen.getByRole('button', { name: btnName });

    fireEvent.click(btn);

    const pokemonTestId = screen.getAllByTestId('pokemon-name');
    const onePokemon = 1;
    expect(pokemonTestId.length).toBe(onePokemon);
  });

  test('Vefirica se a Pokédex tem os 8 botões de filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /All/i });
    const buttonsWithTestId = screen.getAllByTestId('pokemon-type-button');

    // Botões com data-testid são os do tipo Electric, Fire, Bug, Poison, Psychic, Normal e Dragon
    const totalButtonsWithTestId = 7;

    expect(buttonAll).toBeInTheDocument();
    expect(buttonsWithTestId.length).toBe(totalButtonsWithTestId);
  });

  test('Vefirica se Pokédex tem um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const isPikachuPokemon = screen.getByText(/pikachu/i);
    const buttonAll = screen.getByRole('button', { name: /All/i });

    expect(buttonAll).toBeInTheDocument();
    expect(buttonAll.textContent).toBe('All');
    expect(isPikachuPokemon).toBeInTheDocument();

    fireEvent.click(buttonAll);

    expect(isPikachuPokemon).toBeInTheDocument();
  });
});
