import React, { useContext, useState } from 'react';
import DetailFavoriteCard from '../../components/DetailFavoriteCard';
import Header from '../../components/Header';
import AppContext from '../../context/AppContext';

export default function FavoriteRecipes() {
  const [filter, setFilter] = useState('');
  const { favorites } = useContext(AppContext);

  const options = [
    { name: 'all', value: '' },
    { name: 'food', value: 'food' },
    { name: 'drink', value: 'drink' },
  ];

  const handleChange = ({ target: { value } }) => {
    setFilter(value);
  };

  const display = favorites.filter(({ type }) => type.includes(filter));

  return (
    <>
      <Header title="Favorite Recipes" />
      <main id="favoriterecipes-page">
        <form className="formContainer">
          {options.map(({ name, value }) => (
            <label
              key={ name }
              data-testid={ `filter-by-${name}-btn` }
              htmlFor={ `filter-by-${name}-btn` }
            >
              <input
                id={ `filter-by-${name}-btn` }
                type="radio"
                name="filter"
                checked={ filter === value }
                value={ value }
                onChange={ handleChange }
              />
              {name}
            </label>
          ))}
        </form>
        <section className="favoritesContainer">
          {display.map((obj, index) => (
            <DetailFavoriteCard
              { ...obj }
              index={ index }
              key={ index }
            />
          ))}
        </section>
      </main>
    </>
  );
}
