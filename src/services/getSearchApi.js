const getSearchApi = async ({ type, searchFor, search, pageDrinks }) => {
  const END_POINT = pageDrinks ? (
    `https://www.thecocktaildb.com/api/json/v1/1/${type}.php?${searchFor}=${search}`
  ) : (
    `https://www.themealdb.com/api/json/v1/1/${type}.php?${searchFor}=${search}`);

  const response = await fetch(END_POINT);
  const json = await response.json();
  return json;
};

export default getSearchApi;
// https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?i={ingrediente}
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s={nome}
// https://www.thecocktaildb.com/api/json/v1/1/search.php?f={primeira-letra}
// www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka
// www.thecocktaildb.com/api/json/v1/1/search.php?s=vodka
