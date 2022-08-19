import React, { useState } from 'react';
import { node } from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [toggleBtnLogin, setToggleBtnLogin] = useState(true);
  const value = { user, setUser, toggleBtnLogin, setToggleBtnLogin };
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
