const URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const URL_MEALS_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const URL_DRINKS_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const MAX_RECIPES = 12;
export const fetchRecipes = async (pathname) => {
  if (pathname === '/foods') {
    const res = fetch(URL_MEALS);
    const { meals } = await res.then((data) => data.json());
    const onlyTwelve = meals.slice(0, MAX_RECIPES);
    return onlyTwelve;
  }
  const res = fetch(URL_DRINKS);
  const { drinks } = await res.then((data) => data.json());
  const onlyTwelve = drinks.slice(0, MAX_RECIPES);
  return onlyTwelve;
};

export const fetchCategories = async (pathname) => {
  const MAX_CATEGORIES = 5;
  if (pathname === '/foods') {
    const res = fetch(URL_MEALS_CATEGORIES);
    const { meals } = await res.then((data) => data.json());
    const onlyFive = meals.slice(0, MAX_CATEGORIES);
    return onlyFive;
  }
  const res = fetch(URL_DRINKS_CATEGORIES);
  const { drinks } = await res.then((data) => data.json());
  const onlyFive = drinks.slice(0, MAX_CATEGORIES);
  return onlyFive;
};

export const fetchRecipesByCategory = async (pathname, category) => {
  if (pathname === '/foods') {
    const res = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const { meals } = await res.then((data) => data.json());
    const onlyTwelve = meals.slice(0, MAX_RECIPES);

    return onlyTwelve;
  }
  const res = fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const { drinks } = await res.then((data) => data.json());
  const onlyTwelve = drinks.slice(0, MAX_RECIPES);

  return onlyTwelve;
};
