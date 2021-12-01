import React from 'react';
import { screen } from '@testing-library/react';
// import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';
import App from '../App';

describe('Req 2 - Página About ', () => {
  test('Verifica se pag About contém h2 com texto"About Pokédex"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const sobrePokemons = screen.getByRole('heading',
      { level: 2, name: /About Pokédex/i });
    expect(sobrePokemons).toBeInTheDocument();
  });

  test('Verifica se pag About contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage.alt).toBe('Pokédex');
    expect(pokedexImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    // Imagem precisa de ter o texto Alternativo
    // Imagem precisa te o link
  });
});
