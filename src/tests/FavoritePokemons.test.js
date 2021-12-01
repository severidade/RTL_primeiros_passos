import React from 'react';
import { screen } from '@testing-library/react';
// import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons'; // posso pasar
import App from '../App';

describe('Req 3 - Pokemons Favoritos ', () => {
  test('Vefifica se o texto "No favorite pokemon found" é exibido', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavoritePokemons = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoritePokemons).toBeInTheDocument();
  });

  test('Verifica se página renderiza Pikachu como Favorito', () => {
    // Entra na página do Pikachu
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    // Favorita o Pikachu
    const favPikachu = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    userEvent.click(favPikachu);

    // Vai para pa página Favoritos
    const goToFavoritedPage = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(goToFavoritedPage);

    // Verifica Pikachu como Favorito
    const myPikachu = screen.getByTestId('pokemon-name', { text: /Pikachu/i });
    expect(myPikachu).toBeDefined();
  });
});
