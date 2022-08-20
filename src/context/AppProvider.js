import React, { useState } from 'react';
import { node } from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [recipes, setRecipes] = useState([{}]);
  const [toggleBtnLogin, setToggleBtnLogin] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const value = { user, setUser, toggleBtnLogin, setToggleBtnLogin, recipes, setRecipes };
  return (
    <AppContext.Provider
      value={ value }
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: node,
}.isRequired;

export default AppProvider;
