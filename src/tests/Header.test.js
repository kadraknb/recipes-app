import React from 'react';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testes para o componente Header.js', () => {

  it('Verifica se o header leva para a página `/profile` quando o botão de profile for clicado', () => {
  renderWithRouter('/foods')
    userEvent.click(screen.getByTestId('profile-top-btn'));

    expect(screen.getByRole('heading', { level: 1, name: 'Profile' })).toBeInTheDocument();
  })

});