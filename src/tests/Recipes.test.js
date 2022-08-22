import React from "react";
import { getByTestId, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithContext from "./helpers/renderWithContext";
import { act } from 'react-dom/test-utils';

import App from "../App";
import { recipesMealsMock, recipesDrinksMock, categoriesMealsMock, categoriesDrinksMock, categorySpecificMealMock, categorySpecificDrinkMock } from "./mocks/RecipeMocks";

describe("Testing o component Recipes", () => {
    afterEach(() => jest.resetAllMocks());

    it('Should the component recipe-meals render correctly', async () => {
        fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(recipesMealsMock)
        })).mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(categoriesMealsMock)
        }));

        const { history } = renderWithContext(<App />);


        const loginText = screen.getByText(/Login/i);
        expect(loginText).toBeInTheDocument();

        const emailInput = screen.getByTestId("email-input");
        expect(emailInput).toBeInTheDocument();

        const passwordInput = screen.getByTestId("password-input");
        expect(passwordInput).toBeInTheDocument();

        const loginBtn = screen.getByTestId("login-submit-btn");
        expect(loginBtn).toBeInTheDocument();
        expect(loginBtn).toBeDisabled();
        userEvent.type(emailInput,'qogoc@mailinator.com');
        userEvent.type(passwordInput,'1234567');
        expect(loginBtn).toBeEnabled();

        act(() => {
            userEvent.click(loginBtn);

        })


        expect(history.location.pathname).toBe("/foods");
        expect(fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/search.php?s=");
        expect(fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
        expect(fetch).toBeCalledTimes(2);

        await act(async () => {
            for (let index = 0; index < 12; index++) {

                const img = await screen.findByTestId(`${index}-card-img`);
                expect(img).toBeInTheDocument();

                const name = await screen.findByTestId(`${index}-card-name`);
                expect(name).toBeInTheDocument();

                const card = await screen.findByTestId(`${index}-card-img`);
                expect(card).toBeInTheDocument();
            }

            const { meals } = categoriesMealsMock;
            for (let index = 0; index < 5; index++) {
                const btn = await screen.findByTestId(`${meals[index].strCategory}-category-filter`);
                expect(btn).toBeInTheDocument();

            }

            const firstMeal = await screen.findByTestId('0-recipe-card');
            expect(firstMeal).toBeInTheDocument()
            userEvent.click(firstMeal)

            expect(history.location.pathname).toBe('/foods/52977')

        })

    })

    it('Should the component recipe-drinks render correctly', async () => {
        fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(recipesMealsMock)
        })).mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(categoriesMealsMock)
        })).mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(recipesDrinksMock)
        })).mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(categoriesDrinksMock)
        }));

        const { history } = renderWithContext(<App />);

        const loginText = screen.getByText(/Login/i);
        expect(loginText).toBeInTheDocument();

        const emailInput = screen.getByTestId("email-input");
        expect(emailInput).toBeInTheDocument();

        const passwordInput = screen.getByTestId("password-input");
        expect(passwordInput).toBeInTheDocument();

        const loginBtn = screen.getByTestId("login-submit-btn");
        expect(loginBtn).toBeInTheDocument();
        expect(loginBtn).toBeDisabled();
        userEvent.type(emailInput,'qogoc@mailinator.com');
        userEvent.type(passwordInput,'1234567');
        expect(loginBtn).toBeEnabled();

        act(() => {
            userEvent.click(loginBtn);

        })

        await act(async () => {
            const btn = await screen.findByTestId("drinks-bottom-btn");
            expect(btn).toBeInTheDocument();
            userEvent.click(btn);

            expect(history.location.pathname).toBe("/drinks");


            const textDrinks = await screen.findByText(/Drinks page/i);
            expect(textDrinks).toBeInTheDocument();
        })

        expect(fetch).toHaveBeenCalledWith("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=");
        expect(fetch).toHaveBeenCalledWith("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
        expect(fetch).toBeCalledTimes(4);

        await act(async () => {
            for (let index = 0; index < 12; index++) {

                const img = await screen.findByTestId(`${index}-card-img`);
                expect(img).toBeInTheDocument();

                const name = await screen.findByTestId(`${index}-card-name`);
                expect(name).toBeInTheDocument();

                const card = await screen.findByTestId(`${index}-card-img`);
                expect(card).toBeInTheDocument();
            }

            const { drinks } = categoriesDrinksMock;
            for (let index = 0; index < 5; index++) {
                const btn = await screen.findByTestId(`${drinks[index].strCategory}-category-filter`);
                expect(btn).toBeInTheDocument();

            }

        })

    })

    it("should the categories buttons working correctly", async () => {
         fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(recipesMealsMock)
        })).mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(categoriesMealsMock)
        })).mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(categorySpecificMealMock)
        })).mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(recipesDrinksMock)
        })).mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(categoriesDrinksMock)
        })).mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(categorySpecificDrinkMock)
        })).mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(categorySpecificDrinkMock)
        }));

        const { history } = renderWithContext(<App />);
        const loginText = screen.getByText(/Login/i);
        expect(loginText).toBeInTheDocument();

        const emailInput = screen.getByTestId("email-input");
        expect(emailInput).toBeInTheDocument();

        const passwordInput = screen.getByTestId("password-input");
        expect(passwordInput).toBeInTheDocument();

        const loginBtn = screen.getByTestId("login-submit-btn");
        expect(loginBtn).toBeInTheDocument();
        expect(loginBtn).toBeDisabled();
        userEvent.type(emailInput,'qogoc@mailinator.com');
        userEvent.type(passwordInput,'1234567');
        expect(loginBtn).toBeEnabled();

        act(() => {
            userEvent.click(loginBtn);

        })
        await act(async () => {
        const { meals } = categoriesMealsMock;
            for (let index = 0; index < 5; index++) {
                const btn = await screen.findByTestId(`${meals[index].strCategory}-category-filter`);
                expect(btn).toBeInTheDocument();

            }
        });

        const firstBntCategory = await screen.findByTestId('Beef-category-filter');
         act(() => {
            userEvent.click(firstBntCategory);
         })
         expect(fetch).toBeCalledTimes(3);

         await act(async () => {
            const firstRecipe = await screen.findByText(/Beef and Mustard Pie/i)
            expect(firstRecipe).toBeInTheDocument();
            userEvent.click(firstBntCategory);
            const firstRecipeAgain = await screen.findByText(/Corba/i)
            expect(firstRecipeAgain).toBeInTheDocument();
         })


         await act(async () => {
            const btn = await screen.findByTestId("drinks-bottom-btn");
            expect(btn).toBeInTheDocument();
            userEvent.click(btn);

            expect(history.location.pathname).toBe("/drinks");


            const textDrinks = await screen.findByText(/Drinks page/i);
            expect(textDrinks).toBeInTheDocument();

        })

        const secondBntCategory = await screen.findByTestId('Cocktail-category-filter')
        act(() => {
            userEvent.click(secondBntCategory);
         })

         expect(fetch).toBeCalledTimes(6);

         await act(async () => {
            const firstRecipe = await screen.findByText(/155 Belmont/i)
            expect(firstRecipe).toBeInTheDocument();
            userEvent.click(secondBntCategory);
            const firstRecipeAgain = await screen.findByText(/GG/i)
            expect(firstRecipeAgain).toBeInTheDocument();

        })
        userEvent.click(secondBntCategory);
        const firstRecipe = await screen.findByText(/155 Belmont/i)
        expect(firstRecipe).toBeInTheDocument();

        const allBtn = screen.getByTestId('All-category-filter')
        expect(allBtn).toBeInTheDocument()
        userEvent.click(allBtn);

        const firstRecipeAgain = await screen.findByText(/GG/i)
        expect(firstRecipeAgain).toBeInTheDocument();
        userEvent.click(firstRecipeAgain)

        expect(history.location.pathname).toBe('/drinks/15997')

    })

    it('should the button clear is working correctly', async () => {
        fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(recipesMealsMock)
        })).mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(categoriesMealsMock)
        })).mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(categorySpecificMealMock)
        })).mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(categorySpecificMealMock)
        })).mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(recipesDrinksMock)
        }))

        const { history } = renderWithContext(<App />);


        const loginText = screen.getByText(/Login/i);
        expect(loginText).toBeInTheDocument();

        const emailInput = screen.getByTestId("email-input");
        expect(emailInput).toBeInTheDocument();

        const passwordInput = screen.getByTestId("password-input");
        expect(passwordInput).toBeInTheDocument();

        const loginBtn = screen.getByTestId("login-submit-btn");
        expect(loginBtn).toBeInTheDocument();
        expect(loginBtn).toBeDisabled();
        userEvent.type(emailInput,'qogoc@mailinator.com');
        userEvent.type(passwordInput,'1234567');
        expect(loginBtn).toBeEnabled();

        act(() => {
            userEvent.click(loginBtn);

        })
        const firstBntCategory = await screen.findByTestId('Beef-category-filter');
         act(() => {
            userEvent.click(firstBntCategory);
         })
         expect(fetch).toBeCalledTimes(3);

         await act(async () => {
            const firstRecipe = await screen.findByText(/Beef and Mustard Pie/i)
            expect(firstRecipe).toBeInTheDocument();
            const allBtn = screen.getByTestId('All-category-filter')
            expect(allBtn).toBeInTheDocument()
            userEvent.click(allBtn);

            const firstRecipeAgain = await screen.findByText(/Corba/i)
            expect(firstRecipeAgain).toBeInTheDocument();
         })

    })
})