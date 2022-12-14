import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithContext from './helpers/renderWithContext'
import { Drinks, Profile } from '../pages';
import Foods from '../pages/foods';

describe('Testes do componente Footer', () => {
  it('Footer aparece na pagina /drinks', () => {
    renderWithContext(<Drinks />);

    const footer = screen.getByAltText('drink-icon')
    expect(footer).toBeInTheDocument();
  });

  it('Footer aparece na pagina /foods', () => {
    renderWithContext(<Foods />);

    const footer = screen.getByAltText('drink-icon')
    expect(footer).toBeInTheDocument();
  });

  it ('Botão drinks redireciona para /drinks', () => {
    const { history } = renderWithContext(<Profile />)

    const btn = screen.getByAltText('drink-icon')
    expect(btn).toBeInTheDocument();
    userEvent.click(btn)

    const path = history.location.pathname;
    expect(path).toBe('/drinks')
  })

  it ('Botão foods redireciona para /foods', () => {
    const { history } = renderWithContext(<Profile />)

    const btn = screen.getByAltText('meal-icon')
    expect(btn).toBeInTheDocument();
    userEvent.click(btn)

    const path = history.location.pathname;
    expect(path).toBe('/foods')
  })
})
