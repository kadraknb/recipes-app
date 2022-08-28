import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecomendCarousel({ props: { recomendations, isDrink } }) {
  const AS_RECOMEND = isDrink ? 'Meal' : 'Drink';
  const GO_TO_RECOMEND = isDrink ? '/foods/' : '/drinks/';
  return (
    <Carousel fade>
      {recomendations.map((recomendation, index) => (
        <Carousel.Item
          key={ recomendation[`id${AS_RECOMEND}`] }
          data-testid={ `${index}-recomendation-card` }
        >
          <Link to={ `${GO_TO_RECOMEND}${recomendation[`id${AS_RECOMEND}`]}` }>
            <img
              width="200"
              height="200"
              src={ recomendation[`str${AS_RECOMEND}Thumb`] }
              alt="Thumb the recomend"
            />
          </Link>

          <Carousel.Caption>
            <h3>{recomendation[`str${AS_RECOMEND}`]}</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
RecomendCarousel.propTypes = {
  props: PropTypes.shape({
    recomendations: PropTypes.arrayOf(PropTypes.object),
    isDrink: PropTypes.bool,
  }).isRequired,
};

export default RecomendCarousel;
