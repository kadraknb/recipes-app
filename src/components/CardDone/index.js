import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { useLocation } from 'react-router-dom';

import { useHistory } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');

function CardDone({ recipe, index }) {
  const history = useHistory();
  const [toggleSpan, setToggleSpan] = useState(false);
  const handleShareButton = () => {
    const url = recipe.type === 'food' ? `http://localhost:3000/foods/${recipe.id}`
      : `http://localhost:3000/drinks/${recipe.id}`;
    copy(url);
    setToggleSpan(!toggleSpan);
    const ONE_SECOND = 1000;
    setTimeout(() => {
      setToggleSpan(!toggleSpan);
    }, ONE_SECOND);
  };

  const toDetails = () => {
    const url = recipe.type === 'food' ? `/foods/${recipe.id}` : `/drinks/${recipe.id}`;
    history.push(url);
  };

  return (
    <div key={ index } className="container flex-column d-flex align-items-center gap">

      <div
        role="button"
        onClick={ toDetails }
        onKeyDown={ toDetails }
        tabIndex="0"
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          className="img-fluid poly"
          src={ recipe.image }
          alt={ recipe.name }
        />
        <h3
          data-testid={ `${index}-horizontal-name` }
        >
          {recipe.name}

        </h3>
      </div>

      <h4 data-testid={ `${index}-horizontal-top-text` }>
        { recipe.type === 'food'
          ? `${recipe.nationality} - ${recipe.category}` : recipe.alcoholicOrNot }

      </h4>

      {/* { recipe.type === 'food' && <h4>{recipe.nationality}</h4>} */}

      <h4 data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</h4>
      { toggleSpan && (
        <span>
          Link copied!
        </span>
      )}
      <button
        type="button"
        onClick={ handleShareButton }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="shareIcon"
        />

      </button>
      { recipe.type === 'food' && (
        recipe.tags.map((tag, index2) => {
          if (index2 < 2) {
            return (
              <span
                key={ index2 }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}

              </span>
            );
          }
          return '';
        })
      )}

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
