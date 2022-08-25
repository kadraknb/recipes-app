import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { FavoriteRecipes } from '../pages';
import renderWithContext from './helpers/renderWithContext';
import recipesStorage from './mocks/recipesStorage';

describe('Testes para a página de Favorites Recipes', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipesStorage));
  });

  it('Verifica se o header renderiza com as informações corretas', () => {
    renderWithContext(<FavoriteRecipes />);

    expect(screen.queryByTestId('page-title')).toBeTruthy();
  });

  it('Verifica se as informações estão sendo renderizadas na tela', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/favorite-recipes');

    recipesStorage.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('testando os filtros', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/favorite-recipes');

    const filterAll = screen.getByTestId('filter-by-all-btn');
    const filterFood = screen.getByTestId('filter-by-food-btn');
    const filterDrink = screen.getByTestId('filter-by-drink-btn');

    act(() => { userEvent.click(filterFood); });

    expect(screen.queryByText('A1')).not.toBeInTheDocument();

    act(() => { userEvent.click(filterDrink); });

    expect(screen.queryByText(recipesStorage[0].name)).not.toBeInTheDocument();

    act(() => { userEvent.click(filterAll); });

    recipesStorage.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });
});
