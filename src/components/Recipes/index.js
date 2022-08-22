import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../context/AppContext';

import Card from '../Card';
import { fetchRecipes, fetchCategories,
  fetchRecipesByCategory } from './componentRecipesFetches';

function Recipes() {
  const { recipesMeals, setRecipesMeals,
    recipesDrinks, setRecipesDrinks,
    categoriesMeals, setCategoriesMeals,
    categoriesDrinks, setCategoriesDrinks,
    filterControl, setFilterControl,
  } = useContext(AppContext);
  const history = useHistory();
  const { pathname } = history.location;

  const [recipeFiltered, setRecipeFiltered] = useState([]);
  const [categories, setCategories] = useState([]);

  const clearFilter = () => {
    if (pathname === '/foods' && recipesMeals.length !== 0) {
      setRecipeFiltered(recipesMeals);
      setCategories(categoriesMeals);
    } else if (recipesDrinks.length !== 0) {
      setRecipeFiltered(recipesDrinks);
      setCategories(categoriesDrinks);
    }
  };

  useEffect(() => {
    const getRecipes = async (fetchCallback, callBack) => {
      const res = await fetchCallback(pathname);
      callBack(res);
      if (callBack === setRecipesMeals
         || callBack === setRecipesDrinks) {
        setRecipeFiltered(res);
      }
      if (callBack === setCategoriesMeals || callBack === setCategoriesDrinks) {
        setCategories(res);
      }
    };
    if (pathname === '/foods' && recipesMeals.length === 0) {
      getRecipes(fetchRecipes, setRecipesMeals);
      getRecipes(fetchCategories, setCategoriesMeals);
    } else if (recipesDrinks.length === 0) {
      getRecipes(fetchRecipes, setRecipesDrinks);
      getRecipes(fetchCategories, setCategoriesDrinks);
    }
    clearFilter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleClick = async (idBtn) => {
    const { id, filterWithCategory } = filterControl;
    if (id === idBtn && filterWithCategory) {
      setFilterControl({ ...filterControl, filterWithCategory: false });
      if (pathname === '/foods') {
        setRecipeFiltered(recipesMeals);
      } else {
        setRecipeFiltered(recipesDrinks);
      }
    } else {
      setFilterControl({ id: idBtn, filterWithCategory: true });
      const res = await fetchRecipesByCategory(pathname, idBtn);
      setRecipeFiltered(res);
    }
  };

  return (
    <section
      className="container d-flex flex-column align-items-center"
    >
      <div
        className="container d-flex align-items-center flex-wrap"

      >
        {
          categories && categories.map((category, index) => (
            <button
              data-testid={ `${category.strCategory}-category-filter` }
              key={ index }
              className="btn btn-outline-secondary btn-sm"
              type="button"
              onClick={ () => handleClick(category.strCategory) }
            >
              {category.strCategory}

            </button>
          ))
        }
        { categories && (
          <button
            data-testid="All-category-filter"
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={ clearFilter }
          >
            All
          </button>)}
      </div>

      <div className="gallery">
        {
          recipeFiltered && recipeFiltered.map((recipe, index) => (
            <Card
              recipeId={ pathname === '/foods' ? recipe.idMeal : recipe.idDrink }
              pathname={ history.location.pathname }
              key={ index }
              recipe={ recipe }
              index={ index }
            />
          ))
        }
      </div>
    </section>
  );
}

export default Recipes;
