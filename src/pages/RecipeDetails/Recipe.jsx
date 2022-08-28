import React from 'react';
import PropTypes from 'prop-types';

function Recipe({ props: { DRINK_MEAL, pageStructure, recipe } }) {
  return (
    <>
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
    </>
  );
}

Recipe.propTypes = {
  props: PropTypes.shape({
    DRINK_MEAL: PropTypes.string,
    pageStructure: PropTypes.shape({
      renderVideo: PropTypes.bool,
    }),
    recipe: PropTypes.shape({
      strCategory: PropTypes.string,
      strInstructions: PropTypes.string,
      strYoutube: PropTypes.string,
    }),
  }).isRequired,
};
export default Recipe;
