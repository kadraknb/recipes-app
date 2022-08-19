import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import AppProvider from "../../context/AppProvider";

const renderWithContext = (component, initialPath = '/') => {
    const history = createMemoryHistory([initialPath]);
    return{
    ...render(
    <AppProvider>
        <Router history={history}>
            {component}
        </Router>
    </AppProvider>),
    history,
    }
};

export default renderWithContext;