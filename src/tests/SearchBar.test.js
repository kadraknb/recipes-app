import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithContext from "./helpers/renderWithContext";
import App from "../App";
import fetchMock from "./helpers/fetchMock";
import { Drinks } from "../pages";


describe("testando o componente SearchBar", () => {
  it('se os input eo button do SearchBar esta renderizando', () => {
    const { history } = renderWithContext(<App />)
    history.push('/foods')
  
    userEvent.click(screen.getByTestId('search-top-btn'))
    const inputSearch = screen.getAllByTestId('search-input').find((aa) => aa.name === 'Search' )
    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio')
    const nameSearchRadio = screen.getByTestId('name-search-radio')
    const firstLetterSearchRadio = screen.getByTestId('first-letter-search-radio')
    const execSearchBtn = screen.getByTestId('exec-search-btn')

    expect(inputSearch).toBeInTheDocument();
    expect(ingredientSearchRadio).toBeInTheDocument();
    expect(nameSearchRadio).toBeInTheDocument();
    expect(firstLetterSearchRadio).toBeInTheDocument();
    expect(execSearchBtn).toBeInTheDocument();
  })

  it('Se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo ingrediente', async () => {
    const { history } = renderWithContext(<App />)
    history.push('/foods')

    fetchMock(3)
    userEvent.click(screen.getByTestId('search-top-btn'))
    userEvent.click(screen.getByTestId('ingredient-search-radio'))
    userEvent.type(screen.getAllByTestId('search-input').find((aa) => aa.name === 'Search' ), 'banana')
    userEvent.click(screen.getByTestId('exec-search-btn'))
    await waitFor(() =>  expect(screen.getAllByTestId(/.-card-name/).length).toBe(3), 500 )
  })
  it('Se o radio selecionado for Name, a busca na API é feita corretamente pelo nome', async () => {
    const { history } = renderWithContext(<App />)
    history.push('/foods')

    fetchMock(1)
    userEvent.click(screen.getByTestId('search-top-btn'))
    userEvent.click(screen.getByTestId('name-search-radio'))
    userEvent.type(screen.getAllByTestId('search-input').find((aa) => aa.name === 'Search' ), 'Banana Pancakes')
    userEvent.click(screen.getByTestId('exec-search-btn'))
    await waitFor(() =>  expect(history.location.pathname).toBe('/foods/52939'), 500 )
  })
  it('Se o radio selecionado for First letter, a busca na API é feita corretamente pela primeira letra', async () => {
    const { history } = renderWithContext(<App />)
    history.push('/foods')

    fetchMock(2)
    userEvent.click(screen.getByTestId('search-top-btn'))
    userEvent.click(screen.getByTestId('first-letter-search-radio'))
    userEvent.type(screen.getAllByTestId('search-input').find((aa) => aa.name === 'Search' ), 'C')
    userEvent.click(screen.getByTestId('exec-search-btn'))
    await waitFor(() =>  expect(screen.getAllByTestId(/.-card-name/).every((aa) => aa.innerHTML.startsWith('C') )).toBe(true), 500 )
  })
  it('Se o radio selecionado for First letter e a busca na API for feita com mais de uma letra, deve-se exibir um alert', async () => {
    const { history } = renderWithContext(<App />)
    history.push('/foods')
    global.alert = jest.fn();

    userEvent.click(screen.getByTestId('search-top-btn'))
    userEvent.click(screen.getByTestId('first-letter-search-radio'))
    userEvent.type(screen.getAllByTestId('search-input').find((aa) => aa.name === 'Search' ), 'Banana Pancakes')
    userEvent.click(screen.getByTestId('exec-search-btn'))
    expect(window.alert.mock.calls.length).toBe(1)
  })
  it('Se caso nenhuma comida seja encontrada o alert deve ser exibido', async () => {
    const { history } = renderWithContext(<App />)
    history.push('/foods')
    global.alert = jest.fn();
    fetchMock(0)

    userEvent.click(screen.getByTestId('search-top-btn'))
    userEvent.click(screen.getByTestId('ingredient-search-radio'))
    userEvent.type(screen.getAllByTestId('search-input').find((aa) => aa.name === 'Search' ), 'aasdasdasdas')
    userEvent.click(screen.getByTestId('exec-search-btn'))
    await waitFor(() =>  expect(window.alert.mock.calls.length).toBe(1), 500 )

  })
  it('Na tela de bebidas, se o radio selecionado for Name, a busca na API é feita corretamente pelo nome', async () => {
    const { history } = renderWithContext(<Drinks />)
    const urlDrink = '/foods/52939'
    fetchMock(1, 'drinks')
    
    userEvent.click(screen.getByTestId('search-top-btn'))
    userEvent.click(screen.getByTestId('drinks-bottom-btn'))
    userEvent.click(screen.getByTestId('name-search-radio'))
    userEvent.type(screen.getAllByTestId('search-input').find((aa) => aa.name === 'Search' ), 'Banana drink')
    userEvent.click(screen.getByTestId('exec-search-btn'))
    await waitFor(() =>  expect(history.location.pathname).toBe('/drinks/16967'), 500 )
  })
})
