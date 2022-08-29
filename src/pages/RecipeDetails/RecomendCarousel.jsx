import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecomendCarousel({ props: { recomendations, isDrink } }) {
  const AS_RECOMEND = isDrink ? 'Meal' : 'Drink';
  const GO_TO_RECOMEND = isDrink ? '/foods/' : '/drinks/';
  const indexItem = { 0: 1, 1: 3, 2: 5 };

  return (
    <Carousel interval={ null } fade>
      {recomendations
        .filter((aa, i) => i % 2 === 0)
        .map((recomendation, index) => (
          <Carousel.Item
            key={ recomendation[`id${AS_RECOMEND}`] }
          >
            <div data-testid={ `${indexItem[index] - 1}-recomendation-card` }>
              <Link to={ `${GO_TO_RECOMEND}${recomendation[`id${AS_RECOMEND}`]}` }>
                <img
                  width="200"
                  height="200"
                  src={ recomendation[`str${AS_RECOMEND}Thumb`] }
                  alt="Thumb the recomend"
                />
              </Link>
              <Carousel.Caption>
                <h3 data-testid={ `${indexItem[index] - 1}-recomendation-title` }>
                  {recomendation[`str${AS_RECOMEND}`]}
                </h3>
              </Carousel.Caption>
            </div>
            <div data-testid={ `${indexItem[index]}-recomendation-card` }>
              <Link
                to={ `${GO_TO_RECOMEND}${
                  recomendations[indexItem[index]][`id${AS_RECOMEND}`]
                }` }
              >
                <img
                  width="200"
                  height="200"
                  src={ recomendations[indexItem[index]][`str${AS_RECOMEND}Thumb`] }
                  alt="Thumb the recomend"
                />
              </Link>
              <Carousel.Caption>
                <h3 data-testid={ `${indexItem[index]}-recomendation-title` }>
                  {recomendations[indexItem[index]][`str${AS_RECOMEND}`]}
                </h3>
              </Carousel.Caption>
            </div>
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
