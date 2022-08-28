import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getRecipeApi, getRecomendationApi } from '../../services/getRecipeApi';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RecomendCarousel from './RecomendCarousel';
import Recipe from './Recipe';
import RecipeButton from './RecipeButton';

function RecipeDetails(props) {
  const location = useLocation();

  const isDrink = location.pathname.startsWith('/d');
  const DRINK_MEAL = isDrink ? 'Drink' : 'Meal';
  const GET_6_CARD = 6;

  const [recipe, setRecipe] = useState({});
  const [recomendations, setRecomendations] = useState([{}]);
  const [pageStructure, setPageStructure] = useState({
    renderVideo: false,
    goToInProgress: `/drinks/${recipe[`id${DRINK_MEAL}`]}/in-progress`,
  });

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
  }, []);

  return (
    <>
      <Header title={ DRINK_MEAL } haveSearch />
      <Recipe props={ { DRINK_MEAL, pageStructure, recipe } } />
      <RecomendCarousel props={ { recomendations, isDrink } } />
      <RecipeButton
        goToInProgress={ pageStructure.goToInProgress }
        recipe={ recipe }
        DRINK_MEAL={ DRINK_MEAL }
      />
      <hr />
      <hr />
      <Footer />
    </>
  );
}
RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default RecipeDetails;
