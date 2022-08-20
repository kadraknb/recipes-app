import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AppContext from '../../context/AppContext';
import getSearchApi from '../../services/getSearchApi';

function SearchBar() {
  const [search, setSearch] = useState('');
  const [searchFor, setSearchFor] = useState('');
  const { recipes, setRecipes } = useContext(AppContext);
  const history = useHistory();
  const pageDrinks = window.location.pathname === '/drinks';
  const LIMIT = 12;

  const autoDirection = (meals) => {
    const newRoute = pageDrinks
      ? `/drinks/${meals[0].idMeal}`
      : `/foods/${meals[0].idMeal}`;
    setRecipes(meals);
    history.push(newRoute);
  };

  const submitToApi = async (e) => {
    e.preventDefault();

    if (searchFor === 'f' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const { meals } = await getSearchApi({
        type: searchFor === 'i' ? 'filter' : 'search',
        searchFor,
        search,
        pageDrinks,
      });
      if (!meals) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        return;
      }
      const result = meals.length === 1
        ? autoDirection
        : setRecipes;
      result(meals);
    }
  };

  return (
    <>
      <form onSubmit={ (e) => submitToApi(e) }>
        <input
          type="text"
          name="Search"
          value={ search }
          onChange={ (e) => setSearch(e.target.value) }
          data-testid="ingredient-search-radio"
        />
        <label htmlFor="Search">
          <input
            type="radio"
            name="Search"
            value="i"
            onChange={ (e) => setSearchFor(e.target.value) }
            data-testid="search-input"
          />
          Ingredient
        </label>
        <label htmlFor="Search">
          <input
            type="radio"
            name="Search"
            value="s"
            onChange={ (e) => setSearchFor(e.target.value) }
            data-testid="name-search-radio"
          />
          Name
        </label>
        <label htmlFor="Search">
          <input
            type="radio"
            name="Search"
            value="f"
            onChange={ (e) => setSearchFor(e.target.value) }
            data-testid="first-letter-search-radio"
          />
          First letter
        </label>
        <button type="submit" data-testid="exec-search-btn">
          busca
        </button>
      </form>
      {/* temporario VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV ou nao */}
      { recipes.length > 1 && (
        <ul>
          {recipes.slice(0, LIMIT).map((aa, index) => (
            <li key={ aa.idMeal } data-testid={ `${index}-recipe-card` }>
              <img
                src={ aa.strMealThumb }
                alt={ aa.strCategory }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{aa.strMeal}</p>
            </li>
          ))}
        </ul>)}
      {/* temporario ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}

    </>
  );
}

export default SearchBar;
