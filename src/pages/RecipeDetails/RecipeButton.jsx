import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';

import shareImg from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function RecipeButton({ goToInProgress, recipe, DRINK_MEAL, id, isDrink }) {
  const history = useHistory();

  const DRINK_OR_MEAL = isDrink ? 'cocktails' : 'meals';
  const DRINK_OR_FOOD = isDrink ? 'drink' : 'food';
  const TWO_SECONDS = 2000;
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  const [pageStructure, setPageStructure] = useState({
    tegCopyLink: false,
    isFavorite: false,
    continueRecipe: false,
    seeButtonStartR: !doneRecipes.some((aa) => aa.id === id),
  });

  useEffect(() => {
    const isFavoriteFun = () => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const isFavorite = favoriteRecipes.some(
        (aa) => Number(aa.id) === Number(id),
      );
      setPageStructure({ ...pageStructure, isFavorite });
    };
    isFavoriteFun();
  }, []);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inProgressRecipes) {
      const getInProgressRecipesLS = Object
        .entries(inProgressRecipes[DRINK_OR_MEAL])
        .find(([aa]) => (Number(aa) === Number(id)));

      setPageStructure({
        ...pageStructure,
        continueRecipe: Boolean(getInProgressRecipesLS),
      });
    }
  }, [recipe]);

  const clickButtonShare = () => {
    copy(global.location.href);
    setPageStructure({ ...pageStructure, tegCopyLink: true });
    setTimeout(
      () => setPageStructure({ ...pageStructure, tegCopyLink: false }),
      TWO_SECONDS,
    );
  };

  const addFavoriteLocalS = () => {
    setPageStructure({ ...pageStructure, isFavorite: !pageStructure.isFavorite });
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (pageStructure.isFavorite) {
      const removFavorite = favoriteRecipes.filter(
        (favorite) => favorite.id !== recipe[`id${DRINK_MEAL}`],
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(removFavorite));
    } else {
      const newFavoriteRecipes = [
        ...favoriteRecipes,
        {
          id: recipe[`id${DRINK_MEAL}`],
          type: DRINK_OR_FOOD,
          nationality: recipe.strArea || '',
          category: recipe.strCategory,
          alcoholicOrNot: DRINK_MEAL === 'Meal' ? '' : recipe.strAlcoholic,
          name: recipe[`str${DRINK_MEAL}`],
          image: recipe[`str${DRINK_MEAL}Thumb`],
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
  };

  return (
    <>
      {pageStructure.seeButtonStartR && (
        <button
          type="button"
          onClick={ () => history.push(goToInProgress) }
          data-testid="start-recipe-btn"
          className="fixed-bottom"
        >
          {pageStructure.continueRecipe ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
      {pageStructure.tegCopyLink && <p>Link copied!</p>}
      <button
        type="button"
        onClick={ clickButtonShare }
        data-testid="share-btn"
      >
        <img src={ shareImg } alt="shareIcon" />
      </button>
      <button
        type="button"
        onClick={ addFavoriteLocalS }
        data-testid="favorite-btn"
        src={ pageStructure.isFavorite ? blackHeartIcon : whiteHeartIcon }
      >
        {pageStructure.isFavorite ? (
          <img src={ blackHeartIcon } alt="black Heart Icon" />
        ) : (
          <img src={ whiteHeartIcon } alt="white Heart Icon" />
        )}
      </button>
    </>
  );
}

RecipeButton.propTypes = {
  goToInProgress: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
  }).isRequired,
  DRINK_MEAL: PropTypes.string.isRequired,
  isDrink: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default RecipeButton;
