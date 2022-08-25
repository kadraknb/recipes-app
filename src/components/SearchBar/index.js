import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import AppContext from '../../context/AppContext';
import getSearchApi from '../../services/getSearchApi';

function SearchBar() {
  const [search, setSearch] = useState('');
  const [searchFor, setSearchFor] = useState('');
  const { setRecipes, setRecipeFiltered } = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();
  const pageDrinks = location.pathname === '/drinks';
  // const SearchFor = pageDrinks ? 'Drink' : 'Meal';
  // const LIMIT = 12;

  const [search, setSearch] = useState('');
  const [searchFor, setSearchFor] = useState('');
  const { recipes, setRecipes } = useContext(AppContext);

  const autoDirection = (res) => {
    setRecipes(res);
    const newRoute = location.pathname === '/drinks'
      ? `/drinks/${res[0].idDrink}`
      : `/foods/${res[0].idMeal}`;
    history.push(newRoute);
  };

  const submitToApi = async (e) => {
    e.preventDefault();

    if (searchFor === 'f' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const res = await getSearchApi({
        type: searchFor === 'i' ? 'filter' : 'search',
        searchFor,
        search,
        pageDrinks,
      });

      if (!res) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        return;
      }
      const result = res.length === 1
        ? autoDirection
        : setRecipeFiltered;
      result(res);
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
          data-testid="search-input"
        />
        <label htmlFor="i">
          <input
            type="radio"
            name="Search"
            value="i"
            id="i"
            onChange={ (e) => setSearchFor(e.target.value) }
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
        <label htmlFor="s">
          <input
            type="radio"
            name="Search"
            value="s"
            id="s"
            onChange={ (e) => setSearchFor(e.target.value) }
            data-testid="name-search-radio"
          />
          Name
        </label>
        <label htmlFor="f">
          <input
            type="radio"
            name="Search"
            value="f"
            id="f"
            onChange={ (e) => setSearchFor(e.target.value) }
            data-testid="first-letter-search-radio"
          />
          First letter
        </label>
        <button type="submit" data-testid="exec-search-btn">
          busca
        </button>
      </form>
      {/* {recipes.length > 1 && (
        <ul>
          {recipes.slice(0, LIMIT).map((aa, index) => (
            <li
              key={ aa[`id${SearchFor}`] }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ aa[`str${SearchFor}Thumb`] }
                alt={ aa.strCategory }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>
                {aa[`str${SearchFor}`]}
              </p>
            </li>
          ))}
        </ul>
      )} */}
    </>
  );
}

export default SearchBar;
