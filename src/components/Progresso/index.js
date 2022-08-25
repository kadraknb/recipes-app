import React, { useEffect, useState } from 'react';
import CardProgress from '../CardProgress';
import Footer from '../Footer';
import Header from '../Header';
// import { useParams } from 'react-router-dom';

import './Progress.css';
import mockProgressTest from '../../tests/mocks/mocktestProgress';

function RecipeInProgress() {
  const [recipe, setRecipe] = useState({});
  // const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const found = mockProgressTest.find((rec) => (rec.idDrink
      ? rec.idDrink === '52977'
      : rec.idMeal === '52977'));
    setRecipe(found);
    console.log(found);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container flex-column d-flex align-items-center gap ">
      <Header title="Progress" haveSearch />
      { recipe && <CardProgress recipe={ recipe } /> }
      <div className="heightProgress" />
      <Footer />
    </div>
  );
}

export default RecipeInProgress;
