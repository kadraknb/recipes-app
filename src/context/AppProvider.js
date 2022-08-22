import React, { useState } from 'react';
import { node } from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  // component Recipes
  const [recipesMeals, setRecipesMeals] = useState([]);
  const [filterControl, setFilterControl] = useState({
    id: '',
    filterWithCategory: false,
  });
  const [recipesDrinks, setRecipesDrinks] = useState([]);
  const [categoriesMeals, setCategoriesMeals] = useState([]);
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);

  // page Login
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [toggleBtnLogin, setToggleBtnLogin] = useState(true);

  const value = { user,
    setUser,
    toggleBtnLogin,
    setToggleBtnLogin,
    recipesMeals,
    setRecipesMeals,
    recipesDrinks,
    setRecipesDrinks,
    categoriesMeals,
    setCategoriesMeals,
    categoriesDrinks,
    setCategoriesDrinks,
    filterControl,
    setFilterControl,
  };
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
