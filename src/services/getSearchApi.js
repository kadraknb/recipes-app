const getSearchApi = async ({ type, searchFor, search, pageDrinks }) => {
  const LIMIT = 12;
  const END_POINT = pageDrinks ? (
    `https://www.thecocktaildb.com/api/json/v1/1/${type}.php?${searchFor}=${search}`
  ) : (
    `https://www.themealdb.com/api/json/v1/1/${type}.php?${searchFor}=${search}`);

  if (pageDrinks) {
    try {
      const response = await fetch(END_POINT);
      const { drinks } = await response.json();
      const resSlice = drinks.slice(0, LIMIT);
      return resSlice;
    } catch (error) {
      return 0;
    }
  }

  try {
    const response = await fetch(END_POINT);
    const { meals } = await response.json();
    const resSlice = meals.slice(0, LIMIT);
    return resSlice;
  } catch (error) {
    return 0;
  }
};

export default getSearchApi;
// https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?i={ingrediente}
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s={nome}
// https://www.thecocktaildb.com/api/json/v1/1/search.php?f={primeira-letra}
// www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka
// www.thecocktaildb.com/api/json/v1/1/search.php?s=vodka
