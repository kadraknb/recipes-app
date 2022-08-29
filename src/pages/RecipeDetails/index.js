import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getRecipeApi, getRecomendationApi } from '../../services/getRecipeApi';
import RecomendCarousel from './RecomendCarousel';
import Recipe from './Recipe';
import RecipeButton from './RecipeButton';

function RecipeDetails({ match: { params: { id } } }) {
  const location = useLocation();

  const isDrink = location.pathname.startsWith('/d');
  const DRINK_MEAL = isDrink ? 'Drink' : 'Meal';
  const DRINKS_OR_FOODS = isDrink ? 'drinks' : 'foods';
  const GET_6_CARD = 6;

  const [recipe, setRecipe] = useState({});
  const [recomendations, setRecomendations] = useState([{}]);
  const [pageStructure, setPageStructure] = useState({
    renderVideo: false,
    goToInProgress: `/${DRINKS_OR_FOODS}/${id}/in-progress`,
    readyRender: false,
  });

  useEffect(() => {
    const getApi = async () => {
      const resApi = await getRecipeApi({ id, isDrink });
      setRecipe(Object.values(resApi)[0][0]);
      const recomendationsApi = Object.values(await getRecomendationApi(isDrink))[0];
      setRecomendations(recomendationsApi.slice(0, GET_6_CARD));
      setPageStructure({ ...pageStructure, renderVideo: !isDrink, readyRender: true });
    };
    getApi();
  }, []);

  return (
    <>
      <Recipe props={ { DRINK_MEAL, pageStructure, recipe } } />
      {pageStructure.readyRender && (
        <RecomendCarousel props={ { recomendations, isDrink } } />
      )}
      <RecipeButton
        goToInProgress={ pageStructure.goToInProgress }
        recipe={ recipe }
        DRINK_MEAL={ DRINK_MEAL }
        id={ id }
        isDrink={ isDrink }
      />
      <hr />
      <hr />
    </>
  );
}
RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default RecipeDetails;
