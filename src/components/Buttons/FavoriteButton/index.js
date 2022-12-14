import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Outline from '../../../images/whiteHeartIcon.svg';
import Fill from '../../../images/blackHeartIcon.svg';
import AppContext from '../../../context/AppContext';

function FavoriteButton({ info, dataTest }) {
  const {
    favorites,
    setFavorites,
  } = useContext(AppContext);
  const { pathname } = useLocation();
  const type = pathname.includes('food') ? 'Meal' : 'Drink';

  const recipe = pathname.includes('favorite') ? info : ({
    id: info[`id${type}`],
    type: pathname.includes('food') ? 'food' : 'drink',
    nationality: info.strArea || '',
    category: info.strCategory,
    alcoholicOrNot: info.strAlcoholic || '',
    name: info[`str${type}`],
    image: info[`str${type}Thumb`],
  });

  const favorited = favorites.find(({ id }) => id === recipe.id);

  const handleClickFavorite = () => {
    setFavorites((prev) => (!favorited
      ? [...prev, recipe]
      : prev.filter(({ id }) => id !== recipe.id)
    ));
  };

  return (
    <button
      data-testid={ dataTest }
      type="button"
      className="btnFavoritesAndShare"
      onClick={ handleClickFavorite }
      src={ favorited ? Fill : Outline }
      alt="Favorite"
    >
      <img src={ favorited ? Fill : Outline } alt="Favorite" />
    </button>
  );
}

FavoriteButton.propTypes = {
  info: PropTypes.shape({
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
  }).isRequired,
  dataTest: PropTypes.string,
};

FavoriteButton.defaultProps = {
  dataTest: 'favorite-btn',
};

export default FavoriteButton;
