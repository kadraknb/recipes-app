import React, { useState } from 'react';
import { node } from 'prop-types';
import AppContext from './AppContext';
import useLocalStorage from '../hooks/useLocalStorage';

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
  const [recipeFiltered, setRecipeFiltered] = useState([]);

  // page Login
  const [toggleBtnLogin, setToggleBtnLogin] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  // page Progress
  const [checkbox, setCheckbox] = useState(false);
  const [recipeDone, setRecipeDone] = useState([]);

  // component SearchBar
  const [recipes, setRecipes] = useState([{}]);

  // page favorite
  const [favorites, setFavorites] = useLocalStorage('favoriteRecipes', []);

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
    recipes,
    setRecipes,
    recipeFiltered,
    setRecipeFiltered,
    checkbox,
    setCheckbox,
    recipeDone,
    setRecipeDone,
    favorites,
    setFavorites,
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
