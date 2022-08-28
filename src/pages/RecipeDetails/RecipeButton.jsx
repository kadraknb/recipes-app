import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';

import shareImg from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function RecipeButton({ goToInProgress, recipe, DRINK_MEAL }) {
  const history = useHistory();

  const TWO_SECONDS = 2000;

  const [resLocalStorage, setResLocalStorage] = useState({ inProgressRecipes: [{}] });
  const [pageStructure, setPageStructure] = useState({
    tegCopyLink: false,
    isFavorite: false,
    continueRecipe: false,
    seeButtonStartR: true,
  });

  useEffect(() => {
    const getLocalStorage = () => {
      const inProgressRecipes = localStorage.getItem('inProgressRecipes');
      setResLocalStorage({
        inProgressRecipes: inProgressRecipes || [{}],
      });
    };
    getLocalStorage();

    const isFavoriteFun = () => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const isFavorite = favoriteRecipes.some(
        ({ id }) => id === recipe[`id${DRINK_MEAL}`],
      );
      setPageStructure({ ...pageStructure, isFavorite });
    };
    isFavoriteFun();
  }, []);

  useEffect(() => {
    const getInProgressRecipesLS = resLocalStorage.inProgressRecipes.find(
      (obReceita) => Number(Object.keys(obReceita)) === Number(recipe[`id${DRINK_MEAL}`]),
    );
    if (getInProgressRecipesLS) {
      const amountOfIngredients = Object.entries(recipe)
        .filter((aa) => aa[0].includes('strIngredient') && aa[1]).length;

      const continueRecipe = Object.values(getInProgressRecipesLS)[0]
        .length === amountOfIngredients;
      setPageStructure({
        ...pageStructure,
        seeButtonStartR: !continueRecipe,
        continueRecipe,
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
          type: DRINK_MEAL,
          nationality: recipe.strArea,
          category: recipe.strCategory,
          alcoholicOrNot: DRINK_MEAL === 'Meal' ? 'Non alcoholic' : recipe.strAlcoholic,
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
        >
          {pageStructure.continueRecipe ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
      {pageStructure.tegCopyLink && <p>Link copied!</p>}
      <button type="button" onClick={ clickButtonShare } data-testid="share-btn">
        <img src={ shareImg } alt="shareIcon" />
      </button>
      <button
        type="button"
        onClick={ addFavoriteLocalS }
        data-testid="favorite-btn"
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
};
export default RecipeButton;
 