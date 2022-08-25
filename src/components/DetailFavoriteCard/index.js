import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FavoriteButton from '../Buttons/FavoriteButton';
import ShareButton from '../Buttons/ShareButton';

function DetailFavoriteCard(props) {
  const {
    type,
    nationality,
    category,
    alcoholicOrNot,
    name,
    image,
    doneDate,
    tags,
    index,
    id,
  } = props;
  return (
    <section className="cardFavorites">

      <Link to={ `/${type}s/${id}` } className="aFavorites">
        <img
          className="imgFavorites"
          src={ image }
          alt=""
          data-testid={ `${index}-horizontal-image` }
        />
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>

      <p data-testid={ `${index}-horizontal-top-text` }>
        {type === 'food' ? `${nationality} - ${category}` : alcoholicOrNot}
      </p>

      <div className="btnFavoritesContainer">

        <ShareButton
          dataTest={ `${index}-horizontal-share-btn` }
          path={ `/${type}s/${id}` }
        />

        { doneDate ? <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p> : (
          <FavoriteButton
            dataTest={ `${index}-horizontal-favorite-btn` }
            info={ props }
          />
        )}
      </div>

      <div>
        { tags && tags.map((tag, i) => (
          <span key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</span>
        ))}
      </div>
    </section>
  );
}

DetailFavoriteCard.propTypes = {
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  doneDate: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string.isRequired,
};

DetailFavoriteCard.defaultProps = {
  doneDate: undefined,
  tags: undefined,
};

export default DetailFavoriteCard;
