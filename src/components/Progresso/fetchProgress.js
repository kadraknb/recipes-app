const fetchProgress = async (id, pathname) => {
  if (pathname) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    const res = await fetch(url);
    const { meals } = await res.json();
    return meals[0];
  }
  const res = fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { drinks } = await res.then((data) => data.json());
  return drinks[0];
};

export default fetchProgress;
