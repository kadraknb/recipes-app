import React from 'react';
import PropTypes from 'prop-types';
// import { useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');

function CardDone({ recipe, index }) {
  // const history = useHistory();
  const handleShareButton = () => {
    const url = recipe.strMeal ? `localhost:3000/foods/${recipe.idMeal}`
      : `localhost:3000/drinks/${recipe.idDrink}`;
    copy(url);
    global.alert('Link copied!');
  };

  return (
    <div key={ index } className="container flex-column d-flex align-items-center gap">

      <Link
        to={ recipe.strMeal
          ? `/foods/${recipe.idMeal}` : `/drinks/${recipe.idDrink}` }
      >

        <img
          data-testid={ `${index}-horizontal-image` }
          className="img-fluid poly"
          src={ recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb }
          alt={ recipe.strMeal ? recipe.strMeal : recipe.strDrink }
        />
      </Link>

      <h3
        data-testid={ `${index}-horizontal-name` }
      >
        {recipe.strMeal ? recipe.strMeal : recipe.strDrink}

      </h3>

      <h4 data-testid={ `${index}-horizontal-top-text` }>
        { recipe.strMeal ? recipe.strCategory : recipe.strAlcoholic }

      </h4>

      { recipe.strMeal && <h4>{recipe.strArea}</h4>}

      <h4 data-testid={ `${index}-horizontal-done-date` }>{recipe.date}</h4>

      <button type="button" onClick={ handleShareButton }>
        <img src={ shareIcon } alt="shareIcon" />

      </button>
      { recipe.strMeal && (
        <h6
          data-testid={ `${index}-${0}-horizontal-tag` }
        >
          { Array.isArray(recipe.strTags)
            ? `${recipe.strTags[0]} ${recipe.strTags[1]}` : recipe.strTags }

        </h6>)}
    </div>
  );
}

CardDone.propTypes = {
  index: PropTypes.any,
  recipe: PropTypes.shape({
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
}.isRequired;

export default CardDone;
