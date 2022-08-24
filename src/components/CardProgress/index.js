import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import getCurrentDate from '../../services/getDate';
// import RecipeInProgress from '../Progresso';
import CheckBox from './CheckBox';

const MIN_DRINK = 17;
const MIN_MEAL = 9;
const MAX_DRINK = 47;
const MAX_MEAL = 49;
const TWENTY = 20;
// const FOURTEEN = 14;
const FIFTEEN = 15;
// const TWENTY_NINE = 29;
function CardProgress({ recipe }) {
  const history = useHistory();
  const MIN = recipe.strDrink ? MIN_DRINK : MIN_MEAL;
  const MAX = recipe.strDrink ? MAX_DRINK : MAX_MEAL;
  const MAX_INGREDIENTS = recipe.strDrink ? FIFTEEN : TWENTY;
  const values = Object.values(recipe).slice(MIN, MAX);
  const ingredients = values.slice(0, MAX_INGREDIENTS).filter((t) => t && t !== ' ');
  const measure = values.slice(MAX_INGREDIENTS).filter((t) => t && t !== ' ');

  const { recipeDone, setRecipeDone } = useContext(AppContext);

  let checkboxStorage = [];
  if (localStorage.getItem('inProgressRecipes')) {
    const id = recipe.idDrink ? recipe.idDrink : recipe.idMeal;
    const current = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const filter = current.find((done) => done[id]);
    if (filter) {
      const { [id]: Done } = filter;
      checkboxStorage = Done;
    }
  }

  const finishButtonClick = () => {
    const addDate = { ...recipe, date: getCurrentDate() };
    setRecipeDone([...recipeDone, addDate]);
    history.push('/done-recipes');
  };

  return (
    <>
      <img
        data-testid="recipe-photo"
        className="img-fluid poly"
        src={ recipe.strDrinkThumb ? recipe.strDrinkThumb : recipe.strMealThumb }
        alt={ recipe.strDrink ? recipe.strDrink : recipe.strMeal }
      />
      <h3
        data-testid="recipe-title"
      >
        { recipe.strDrink ? recipe.strDrink : recipe.strMeal }

      </h3>
      <h4 data-testid="recipe-category">
        {recipe.strDrink ? recipe.strAlcoholic : recipe.strCategory}

      </h4>
      <div className="flexProgress gap">
        <button
          data-testid="share-btn"
          type="button"
          className="btn btn-outline-primary btn-sm"
        >
          share

        </button>
        <button
          data-testid="favorite-btn"
          type="button"
          className="btn btn-outline-danger btn-sm"
        >
          favorite

        </button>
      </div>

      <section className="flex container paddingTopProgress ">
        <h3 className="h3">Ingredients</h3>
        { ingredients.map((ingredient, index) => (<CheckBox
          key={ index }
          ingredient={ ingredient }
          ingredients={ ingredients }
          index={ index }
          measure={ measure }
          id={ recipe.idDrink ? recipe.idDrink : recipe.idMeal }
        />))}

      </section>
      <section>
        <p
          data-testid="instructions"
          className="flex container "
        >
          {recipe.strInstructions}

        </p>
        <button
          data-testid="finish-recipe-btn"
          className="btn btn-outline-success"
          type="button"
          onClick={ finishButtonClick }
          disabled={ checkboxStorage.length !== ingredients.length }
        >
          Finish recipe

        </button>
      </section>
    </>
  );
}

CardProgress.propTypes = {
  recipe: PropTypes.shape({
    srtMealThumb: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
  }),
}.isRequired;

export default CardProgress;
