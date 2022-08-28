import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';

// import testMock from './mockDeTest';
import CardDone from '../../components/CardDone';
import AppContext from '../../context/AppContext';

export default function DoneRecipes() {
  const [filterDone, setFilterDone] = useState('all');
  const [filterApplied, setFilterApplied] = useState([]);
  const { recipeDone, setRecipeDone } = useContext(AppContext);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      setRecipeDone(doneRecipes);
      // setFilterApplied(doneRecipes);
      // console.log(doneRecipes);
    }
  }, [setRecipeDone]);

  useEffect(() => {
    const resultFilter = recipeDone.filter((recipe) => {
      if (filterDone === 'all') {
        return true;
      }
      if (filterDone === 'idMeal') {
        return recipe.type === 'food';
      }
      return recipe.type === 'drink';
    });
    setFilterApplied(resultFilter);
  }, [filterDone, recipeDone]);

  const history = useHistory();
  const test = () => {
    history.push('/test');
  };
  // console.log(filterApplied);

  return (
    <section className="flex">
      <Header title="Done Recipes" />
      <h3 className="h3">Done Recipes Page</h3>
      <form action="">
        <button
          data-testid="filter-by-food-btn"
          name="idMeal"
          onClick={ () => setFilterDone('idMeal') }
          type="button"
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          name="idDrink"
          onClick={ () => setFilterDone('idDrink') }
          type="button"
        >
          Drinks
        </button>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFilterDone('all') }
          name="all"
        >
          All
        </button>
        <button type="button" onClick={ test }>test</button>
      </form>
      <div className="flex">

        {
          filterApplied.length && filterApplied.map((recipe, index) => (

            <CardDone
              key={ index }
              index={ index }
              recipe={ recipe }
            />
          ))
        }
      </div>
    </section>
  );
}
