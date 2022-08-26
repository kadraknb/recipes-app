import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CardProgress from '../CardProgress';
import Footer from '../Footer';
import Header from '../Header';

import './Progress.css';
import fetchProgress from './fetchProgress';
// import mockProgressTest from '../../tests/mocks/mocktestProgress';

function RecipeInProgress() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState('');
  const history = useHistory();

  useEffect(() => {
    const getRecipe = async () => {
      const isFood = history.location.pathname.includes('foods');
      const found = await fetchProgress(id, isFood);
      setRecipe(found);
    };
    getRecipe();
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
