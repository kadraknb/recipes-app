import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import './Card.css';

function Card({ recipe, index, pathname, recipeId }) {
  const history = useHistory();
  const toOtherPage = (id) => {
    if (pathname === '/foods') {
      history.push(`/foods/${id}`);
    } else {
      history.push(`/drinks/${id}`);
    }
  };

  return (

    <div
      role="button"
      tabIndex={ 0 }
      data-testid={ `${index}-recipe-card` }
      onKeyDown={ toOtherPage }
      onClick={ () => toOtherPage(recipeId) }
      className="container flex-column d-flex align-items-center"

    >
      <img
        className="img-fluid poly"
        data-testid={ `${index}-card-img` }
        src={ recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt={ recipe.strMeal ? recipe.strMeal : recipe.strDrink }

      />
      <h2
        data-testid={ `${index}-card-name` }
        className="h2"
      >
        { recipe.strMeal ? recipe.strMeal : recipe.strDrink }

      </h2>
    </div>

  );
}

Card.propTypes = {
  recipe: PropTypes.shape({
    strMeal: PropTypes.string,
  }),
}.isRequired;

export default Card;
