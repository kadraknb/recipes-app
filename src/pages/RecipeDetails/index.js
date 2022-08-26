import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

import { getRecipeApi, getRecomendationApi } from '../../services/getRecipeApi';
import shareImg from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
// import Header from '../../components/Header';
// import Footer from '../../components/Footer';

function RecipeDetails(props) {
  const history = useHistory();
  const location = useLocation();

  const isDrink = location.pathname.startsWith('/d');
  const DRINK_MEAL = isDrink ? 'Drink' : 'Meal';
  const AS_RECOMEND = isDrink ? 'Meal' : 'Drink';
  const GO_TO_RECOMEND = isDrink ? '/foods/' : '/drinks/';
  const GET_6_CARD = 6;
  const TWO_SECONDS = 2000;

  const [recipe, setRecipe] = useState({});
  const [recomendations, setRecomendations] = useState([{}]);
  const [pageStructure, setPageStructure] = useState({
    tegCopyLink: false,
    isFavorite: false,
    continueRecipe: false,
    seeButtonStartR: true,
    renderVideo: false,
  });
  const [resLocalStorage, setResLocalStorage] = useState({
    doneRecipes: [{ id: false }],
    inProgressRecipes: [{ id: false }],
  });
  const goToInProgress = () => {
    history.push(`/drinks/${recipe[`id${DRINK_MEAL}`]}/in-progress`);
  };

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

  // verificat como 'receita em progresso' esta add no locaS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  useEffect(() => {
    const getApi = async () => {
      const { match: { params: { id } } } = props;
      const resApi = await getRecipeApi({ id, isDrink });
      setRecipe(Object.values(resApi)[0][0]);
      const recomendationsApi = Object.values(await getRecomendationApi(isDrink))[0];
      setRecomendations(recomendationsApi.slice(0, GET_6_CARD));
      setPageStructure({ ...pageStructure, renderVideo: !isDrink });
    };
    getApi();

    const getLocalStorage = () => {
      const doneRecipes = localStorage.getItem('doneRecipes');
      const inProgressRecipes = localStorage.getItem('inProgressRecipes');
      setResLocalStorage({
        doneRecipes: doneRecipes || [''],
        inProgressRecipes: inProgressRecipes || [''],
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
    try {
      setPageStructure({
        ...pageStructure,
        seeButtonStartR: !resLocalStorage.doneRecipes.some(
          ({ id }) => id === recipe[`id${DRINK_MEAL}`],
        ),
        continueRecipe: resLocalStorage.inProgressRecipes.some(
          ({ id }) => id === recipe[`id${DRINK_MEAL}`],
        ),
      });
    } catch (error) {
      console.log(error);
    }
  }, [resLocalStorage]);

  return (
    <>
      {/* <Header title="Drinks" haveSearch /> */}
      <img
        width="300"
        height="300"
        src={ recipe[`str${DRINK_MEAL}Thumb`] }
        alt="Thumb the recipe"
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{recipe[`str${DRINK_MEAL}`]}</h2>
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      <ul>
        {Object.entries(recipe)
          .filter((aa) => aa[0].includes('strIngredient') && aa[1])
          .map(([key, Ingredient], index) => (
            <li key={ key } data-testid={ `${index}-ingredient-name-and-measure` }>
              {Ingredient}
            </li>
          ))}
      </ul>
      <h4 data-testid="instructions">{recipe.strInstructions}</h4>
      {pageStructure.renderVideo && (
        <iframe
          width="560"
          height="315"
          src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
          title="YouTube video player"
        />
      )}
      <ul>
        {recomendations.map((recomendation, index) => (
          <li
            key={ recomendation[`id${AS_RECOMEND}`] }
            data-testid={ `${index}-recomendation-card` }
          >
            <h6>{recomendation[`str${AS_RECOMEND}`]}</h6>
            <Link to={ `${GO_TO_RECOMEND}${recomendation[`id${AS_RECOMEND}`]}` }>
              <img
                width="100"
                height="100"
                src={ recomendation[`str${AS_RECOMEND}Thumb`] }
                alt="Thumb the recomend"
              />
            </Link>
          </li>
        ))}
      </ul>
      {pageStructure.seeButtonStartR && (
        <button
          type="button"
          onClick={ goToInProgress }
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
      <div className="heightProgress" />
      {/* <Footer /> */}
    </>
  );
}
RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default RecipeDetails;
