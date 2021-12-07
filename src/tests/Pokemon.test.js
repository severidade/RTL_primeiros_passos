import React from 'react';
import { screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import Pokedex from '../components/Pokedex';
import App from '../App';

describe('Req 6 - Testes em Pokemon.js ', () => {
  test('Ver se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const img = screen.getByRole('img');

    expect(name.textContent).toBe('Pikachu');
    expect(type.textContent).toBe('Electric');
    expect(weight.textContent).toBe('Average weight: 6.0 kg');
    expect(img.alt).toBe('Pikachu sprite');
  });

  test('Verifica se há um link de navegação para exibir detalhes do Pokémon', () => {
    renderWithRouter(<App />);

    // Carregando o Pikachu o link deve indicar url da página correta
    const pikachuDetails = screen.getByRole('link', { name: /more details/i });
    expect(pikachuDetails.href).toEqual('http://localhost/pokemons/25');
  });

  test('Verifica o direcionamento correto com click em "mais detalhes"', () => {
    const { history } = renderWithRouter(<App />);

    // Carregando o Pikachu o link deve indicar url da página correta
    const pikachuDetails = screen.getByRole('link', { name: /more details/i });

    fireEvent.click(pikachuDetails);

    // Verifica se a imagem carregada é do Pikachu
    const pikachuImg = screen.getByAltText(/Pikachu sprite/i);
    expect(pikachuImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    // Verifica a URL
    const locPathName = history.location.pathname;
    expect(locPathName).toBe('/pokemons/25');
  });

  test('Verifica se Alakazam é favoritado e o icone correto exibido', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/65');

    const favoriteBtn = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    fireEvent.click(favoriteBtn);
    expect(favoriteBtn).toBeChecked();

    const favAlakazam = screen.getByAltText(/Alakazam is marked as favorite/i);
    expect(favAlakazam.src).toEqual('http://localhost/star-icon.svg');
  });
});
