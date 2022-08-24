import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../context/AppContext';

function CheckBox({ index, measure, ingredient, id }) {
  const [toggleClasse, setToggleClasse] = useState(false);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const { checkbox, setCheckbox } = useContext(AppContext);
  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes')) {
      const current = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const filter = current.find((done) => done[id]);

      if (filter) {
        const { [id]: Done } = filter;
        setCheckbox([...checkbox, ingredient]);
        setAlreadyDone(Done.includes(index));
        setToggleClasse(Done.includes(index));
      }
    }
  }, [id, index]);

  const verifyLocalStorage = (checked) => {
    if (localStorage.getItem('inProgressRecipes')) {
      const current = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const currentRemoved = current.filter((done) => !(id in done));
      let filterDone = [];

      const obj = current.find((done) => done[id]);
      if (obj) {
        const { [id]: Done } = obj;
        if (!checked) {
          filterDone = Done.filter((done) => done !== index);
        } else {
          filterDone = [...Done, index];
        }
        const toLocalStorage = [...currentRemoved, {
          [id]: filterDone,
        }];
        localStorage.setItem('inProgressRecipes', JSON.stringify(toLocalStorage));
      } else {
        const toLocalStorage = [...current, {
          [id]: [index],
        }];
        localStorage.setItem('inProgressRecipes', JSON.stringify(toLocalStorage));
      }
    } else {
      const toLocalStorage = [{
        [id]: [index],

      }];
      localStorage.setItem('inProgressRecipes', JSON.stringify(toLocalStorage));
    }
  };

  const handleChange = ({ target: { checked, name } }) => {
    setToggleClasse(!toggleClasse);
    setAlreadyDone(!alreadyDone);
    verifyLocalStorage(checked);

    setCheckbox(checkbox.includes(name)
      ? checkbox.filter((check) => check !== name)
      : [...checkbox, name]);
  };

  return (
    <label
      data-testid={ `${index}-ingredient-step` }
      className={ `form-check-label ${toggleClasse && 'overText'} ` }
      key={ index }
      htmlFor={ index }
    >
      <input
        className="form-check-input"
        type="checkbox"
        name={ ingredient }
        id={ index }
        checked={ alreadyDone }
        onChange={ handleChange }
      />
      { `${ingredient} ${measure[index]
        ? ` - Measure ${measure[index]}` : ''}` }
    </label>
  );
}

CheckBox.propTypes = {
  index: PropTypes.any,
  ingredient: PropTypes.any,
  measure: PropTypes.any,
}.isRequired;

export default CheckBox;
