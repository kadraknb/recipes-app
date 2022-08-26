import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import getCurrentDate from '../../services/getDate';

import CheckBox from './CheckBox';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import AppContext from '../../context/AppContext';

const FIFTEEN = 15;
const TWENTY = 20;

const copy = require('clipboard-copy');

function CardProgress({ recipe }) {
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [msg, setMsg] = useState(false);
  const [boxDone, setBoxDone] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkboxStorage, setCheckboxStorage] = useState([]);
  const { checkbox } = useContext(AppContext);
  let btn = [];

  const [pageStructure, setPageStructure] = useState({
    tegCopyLink: false,
    isFavorite: false,
    continueRecipe: false,
    seeButtonStartR: true,
    renderVideo: false,
  });

  useEffect(() => {
    let ingredientOnly = [];
    let measureOnly = [];
    const max = recipe.strDrink ? FIFTEEN : TWENTY;
    for (let index = 1; index < max; index += 1) {
      const ingredientString = `strIngredient${index}`;
      const measureString = `strMeasure${index}`;
      if (recipe[ingredientString] && recipe[ingredientString] !== ' ') {
        ingredientOnly = [...ingredientOnly, recipe[ingredientString]];
      }
      if (recipe[measureString] && recipe[measureString] !== ' ') {
        measureOnly = [...measureOnly, recipe[measureString]];
      }
      if (!localStorage.getItem('doneRecipes')) {
        localStorage.setItem('doneRecipes', JSON.stringify([]));
      }
    }
    setIngredients(ingredientOnly);
    setMeasure(measureOnly);
  }, []);

  const toLocalStorageFunc = (toLocalStorage) => {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    const toStorage = [...doneRecipesStorage, toLocalStorage];
    localStorage.setItem('doneRecipes', JSON.stringify(toStorage));
    history.push('/done-recipes');
  };

  const finishButtonClick = () => {
    // const tags = Array.isArray(recipe.strTags) ? [...recipe.strTags] : recipe.strTags;
    const recipeDoneToLocalStorage = {
      id: recipe.idDrink ? recipe.idDrink : recipe.idMeal,
      type: recipe.idDrink ? 'drink' : 'food',
      nationality: recipe.idDrink ? '' : recipe.strArea,
      category: recipe.idDrink ? recipe.strCategory : '',
      alcoholicOrNot: recipe.idMeal ? '' : recipe.strAlcoholic,
      name: recipe.idDrink ? recipe.strDrink : recipe.strMeal,
      image: recipe.idDrink ? recipe.strDrinkThumb : recipe.strMealThumb,
      doneDate: getCurrentDate(),
      tags: recipe.idDrink ? '' : recipe.strTags.split(','),
    };
    toLocalStorageFunc(recipeDoneToLocalStorage);
  };

  const buttonF = () => (
    <button
      data-testid="finish-recipe-btn"
      className="btn btn-outline-success"
      type="button"
      onClick={ finishButtonClick }
      disabled={ checkboxStorage.length !== ingredients.length }
    >
      Finish recipe

    </button>
  );
  btn = buttonF();

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes')) {
      const id = recipe.idDrink ? recipe.idDrink : recipe.idMeal;
      const current = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const filter = current.find((done) => done[id]);
      if (filter) {
        console.log(filter[id]);
        // const { [id]: Done } = filter;
        setCheckboxStorage(filter[id]);
      }
      // console.log(Done);
      btn = buttonF();
    }
  }, [checkbox]);

  const handleShareButton = () => {
    const url = recipe.strMeal ? `http://localhost:3000/foods/${recipe.idMeal}`
      : `http://localhost:3000/drinks/${recipe.idDrink}`;
    copy(url);
    setMsg(true);
    const ONE_SECOND = 1000;
    setTimeout(() => {
      setMsg(false);
    }, ONE_SECOND);
    // global.alert('Link copied!');
  };

  const id = recipe.idDrink ? recipe.idDrink : recipe.idMeal;
  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes')) {
      const current = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const filter = current.find((done) => done[id]);
      if (filter) {
        const { [id]: Done } = filter;
        setBoxDone(Done);
      }
    }
    if (localStorage.getItem('favoriteRecipes')) {
      const current = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const filter = current.find((done) => done.id === id);
      if (filter) {
        setIsFavorite(!isFavorite);
      }
    }
  }, []);

  const addFavoriteLocalS = () => {
    const DRINK_MEAL = recipe.idDrink ? 'Drink' : 'Meal';
    setPageStructure({ ...pageStructure, isFavorite: !pageStructure.isFavorite });
    setIsFavorite(!isFavorite);
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
          type: recipe.idDrink ? 'drink' : 'food',
          nationality: recipe.idDrink ? '' : recipe.strArea,
          category: recipe.strCategory,
          alcoholicOrNot: recipe.idMeal ? '' : recipe.strAlcoholic,
          name: recipe[`str${DRINK_MEAL}`],
          image: recipe[`str${DRINK_MEAL}Thumb`],
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
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
      <div>
        { msg && <span>Link copied!</span>}

      </div>
      <div className="flexProgress gap">
        <button
          data-testid="share-btn"
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={ handleShareButton }
        >
          share

        </button>
        <button
          type="button"
          onClick={ addFavoriteLocalS }
        >
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="black Heart Icon"
          />
        </button>
      </div>

      <section className="flex container paddingTopProgress ">
        <h3 className="h3">Ingredients</h3>

        { ingredients.length && ingredients.map((ingredient, index) => (<CheckBox
          key={ index }
          ingredient={ ingredient }
          ingredients={ ingredients }
          index={ index }
          measure={ measure }
          alreadyDoneAgin={ boxDone.includes(index) }
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
        { btn }
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
