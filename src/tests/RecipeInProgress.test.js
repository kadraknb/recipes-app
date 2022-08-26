import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithContext from './helpers/renderWithContext';
import App from '../App';

describe('Testes para a página de Recipes in progress', () => {
  afterEach(() => jest.fn(cleanup));

  it('Verifica se a pagina de Drinks renderiza os itens de forma correta', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/drinks/178365/in-progress');

    expect(screen.queryByTestId('page-title')).toBeFalsy();
    expect(screen.queryByTestId('profile-top-btn')).toBeFalsy();
    expect(screen.queryByTestId('search-top-btn')).toBeFalsy();

    expect(history.location.pathname).toBe('/drinks/178365/in-progress');

    const title = await screen.findByTestId('recipe-title');
    expect(title).toBeInTheDocument();

    const ingredient1 = screen.getByTestId('0-ingredient-step');
    const ingredient2 = screen.getByTestId('1-ingredient-step');
    const ingredient3 = screen.getByTestId('2-ingredient-step');
    const ingredient4 = screen.getByTestId('3-ingredient-step');

    const finishButton = screen.getByRole('button', { name: /finish recipe/i });

    expect(finishButton.disabled).toBeTruthy();
    expect(ingredient1.checked).toBe(false);

    userEvent.click(ingredient1);

    expect(ingredient1.checked).toBe(true);

    userEvent.click(ingredient1);

    expect(ingredient1.checked).toBe(false);

    userEvent.click(ingredient1);
    userEvent.click(ingredient2);
    userEvent.click(ingredient3);
    userEvent.click(ingredient4);

    userEvent.click(finishButton);
    expect(history.location.pathname).toBe('/done-recipes');

    jest.fn(cleanup);
  });

  it('Verifica se o foods renderiza com as informações corretas', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/foods/52965/in-progress');

    expect(screen.queryByTestId('page-title')).toBeFalsy();
    expect(screen.queryByTestId('profile-top-btn')).toBeFalsy();
    expect(screen.queryByTestId('search-top-btn')).toBeFalsy();

    const title = await screen.findByTestId('recipe-title');

    expect(title).toBeInTheDocument();

    const ingredient3 = screen.getByTestId('3-ingredient-step');
    expect(ingredient3).toBeInTheDocument();

    userEvent.click(ingredient3);
    expect(ingredient3.checked).toBe(true);

    userEvent.click(ingredient3);
    expect(ingredient3.checked).toBe(false);
  });

  it('Verifica o funcionamento do botão de compartilhar receita', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/drinks/178353/in-progress');

    window.document.execCommand = jest.fn(() => true);

    let button;
    await waitFor(() => {
      button = screen.getByTestId('share-btn');
    });
    act(() => {
      userEvent.click(button);
    });
    await waitFor(() => {
      expect(window.document.execCommand).toHaveBeenCalledWith('copy');
    });

    history.push('/foods/52813/in-progress');

    await waitFor(() => {
      button = screen.getByTestId('share-btn');
    });
    act(() => {
      userEvent.click(button);
    });
    await waitFor(() => {
      expect(window.document.execCommand).toHaveBeenCalledWith('copy');
    });

    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    userEvent.click(screen.getByTestId('share-btn'));

    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
  });

  it('Deve haver a troca de imagem do botão de favoritar receita em Foods', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/foods/52813/in-progress');

    const FILLED = 'blackHeartIcon';
    const OUTLINE = 'whiteHeartIcon';

    let favortieBtn;

    await waitFor(() => {
      favortieBtn = screen.getByTestId('favorite-btn');
    });

    expect(favortieBtn.src).toMatch(OUTLINE);

    userEvent.click(favortieBtn);

    expect(favortieBtn.src).toMatch(FILLED);
  });

  it('Deve haver a troca de imagem do botão de favoritar receita em Drinks', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/drinks/17203/in-progress');

    const FILLED = 'blackHeartIcon';
    const OUTLINE = 'whiteHeartIcon';

    let favortieBtn;

    await waitFor(() => {
      favortieBtn = screen.getByTestId('favorite-btn');
    });

    expect(favortieBtn.src).toMatch(OUTLINE);

    userEvent.click(favortieBtn);

    expect(favortieBtn.src).toMatch(FILLED);
  });
});
