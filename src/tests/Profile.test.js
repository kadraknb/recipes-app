import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter'
import renderWithContext from './helpers/renderWithContext';
import userEvent from '@testing-library/user-event'
import App from '../App';

describe('Testes para a página de perfil', () => {
  it('Testando o Botao logout', () => {
    const{ history } = renderWithRouter('/profile')

    const titlePage = screen.getByRole('heading', { level: 1, name: 'Profile' })
    const profileBtn = screen.queryByTestId('profile-top-btn')
    const searchBtn = screen.queryByTestId('search-top-btn')

    expect(titlePage).toBeInTheDocument();
    expect(profileBtn).toBeTruthy();
    expect(searchBtn).toBeFalsy();

    const buttonLogout = screen.getByTestId('profile-logout-btn')
    expect(history.location.pathname).toBe('/profile')
    
    userEvent.click(buttonLogout)

    expect(history.location.pathname).toBe('/')
  });

  it('Testando o Botão Done-recipes', ()=> {
    const{history} = renderWithRouter('/profile')

    const doneRecipesBtn = screen.getByRole('button', {  name: /done recipes/i})
    userEvent.click(doneRecipesBtn)

    expect(history.location.pathname).toBe('/done-recipes')
  })

  it('Testando o Botão Favorite-recipes', ()=> {
    const{history} = renderWithRouter('/profile')

    const favoritesRecipesBtn = screen.getByRole('button', {  name: /favorite recipes/i})
    userEvent.click(favoritesRecipesBtn)

    expect(history.location.pathname).toBe('/favorite-recipes')
  })

  it('Testando o LocalStorage', async ()=> {
    // const { history } = renderWithRouter('/')
    const { history } = renderWithContext(<App />)
    expect(history.location.pathname).toBe('/')

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button', { name: /enter/i });

    expect(screen.getByRole('heading', { name: /login/i, level: 1 })).toBeInTheDocument();

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '1234561');
    expect(loginButton.disabled).toBeFalsy();

    userEvent.click(loginButton);

    expect(JSON.parse(localStorage.getItem('user'))).toEqual({
      email: 'teste@teste.com',
    });
    expect(history.location.pathname).toBe('/foods')

    expect( await screen.findByText(/foods page/i)).toBeInTheDocument()

    userEvent.click(screen.getByTestId('profile-top-btn'))
    expect(history.location.pathname).toBe('/profile')
    expect(screen.getByTestId('profile-email').innerHTML).toBe('teste@teste.com')

  })

});
