export const getRecipeApi = async ({ id, WHICH_PAGE = true }) => {
  const END_POINT = WHICH_PAGE ? (
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  ) : (
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const response = await fetch(END_POINT);
  const json = await response.json();
  // console.log(json);
  // console.log(END_POINT);
  return json;
};
// https://www.themealdb.com/api/json/v1/1/lookup.php?i={id-da-receita}
// https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={id-da-receita}

export const getRecomendationApi = async () => {
  const END_POINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(END_POINT);
  const json = await response.json();
  // console.log(json);
  // console.log(END_POINT);
  return json;
};
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=
// https://www.themealdb.com/api/json/v1/1/search.php?s=
// categorias: https://www.themealdb.com/api/json/v1/1/list.php?c=list
// nacionalidades: https://www.themealdb.com/api/json/v1/1/list.php?a=list
// ingredientes: https://www.themealdb.com/api/json/v1/1/list.php?i=list
