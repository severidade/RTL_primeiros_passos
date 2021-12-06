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

  test('Verifica se há botão que lista Pokemons do tipo Fire', () => {
    renderWithRouter(<App />);

    const buttonFire = screen.getByRole('button', { name: /Fire/i });
    expect(buttonFire).toBeInTheDocument();
    expect(buttonFire.textContent).toBe('Fire');

    fireEvent.click(buttonFire);
    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
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

  // test('Verifica se o primeiro Pokemon e o Pikachu', () => {
  //   renderWithRouter(<App />);

  //   // Verifica se a imagem carregada é do Pikachu
  //   const pikachuImg = screen.getByAltText(/Pikachu sprite/i);
  //   expect(pikachuImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  // });

  // test('Verifica se o link de mais detalhes direciona para a rota certa', () => {
  //   renderWithRouter(<App />);
  //   // Carregando o Pikachu deve ir para a pagina correta
  //   const pikachuDetails = screen.getByRole('link', { name: /more details/i });
  //   expect(pikachuDetails.href).toEqual('http://localhost/pokemons/25');
  // });

  // test('Verifica se Alakazam é favoritado e o icone correto exibido', () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/pokemons/65');

  //   const favoriteBtn = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
  //   fireEvent.click(favoriteBtn);
  //   expect(favoriteBtn).toBeChecked();

  //   const favAlakazam = screen.getByAltText(/Alakazam is marked as favorite/i);
  //   expect(favAlakazam.src).toEqual('http://localhost/star-icon.svg');
  // });
});
