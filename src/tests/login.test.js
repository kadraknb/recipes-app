import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithContext from "./helpers/renderWithContext";
import App from "../App";

describe("Testing o page login", () => {
    it('Should the page have a text "Login"', () => {
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
        userEvent.type(emailInput, "siwalil@mailinator.com");
        userEvent.type(passwordInput, "1234567");
        expect(loginBtn).toBeEnabled();

        userEvent.click(loginBtn);
        expect(history.location.pathname).toBe("/foods");
    })
})
