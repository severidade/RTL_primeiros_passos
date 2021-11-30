import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Req 1 - Testes em App.js ', () => {
  test('Verifica links de navegação - Home, About e favorite pokémons', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    const aboutLink = screen.getByRole('link', { name: /About/i });
    const favoritePokemonsLink = screen.getByRole('link', { name: /Favorite pokémons/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokemonsLink).toBeInTheDocument();
  });

  test('Verifica se redirecionada para a página "Not Found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/ioioioio');
    // console.log(history);
    const notFound = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });
    // const notFound = screen.getByText(/😭/i);
    expect(notFound).toBeInTheDocument();
  });
});
