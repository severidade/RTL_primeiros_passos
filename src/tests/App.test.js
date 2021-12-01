import React from 'react';
import { screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
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
    // const notFound = screen.getByText(/😭/i); bacana que mesmo dentro do span pega o emojie
    expect(notFound).toBeInTheDocument();
  });

  test('Clicando em "Home" verifica se abre a pagina inicial', () => {
    const { history } = renderWithRouter(<App />);
    const homePage = screen.getByText(/Home/i);

    fireEvent.click(homePage);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
  });

  test('Clicando em "About" verifica se abre a URL /about', () => {
    const { history } = renderWithRouter(<App />);
    const aboutPage = screen.getByRole('link', { name: /About/i });

    fireEvent.click(aboutPage);
    expect(history.location.pathname).toBe('/about');
  });

  test('Clicando em "Favoritados" verifica se abre a URL /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favoritesPage = screen.getByRole('link', { name: /favorite pokémons/i });

    fireEvent.click(favoritesPage);
    expect(history.location.pathname).toBe('/favorites');
  });
});
