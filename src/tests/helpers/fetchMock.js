


const fetchMock = (quantidade = 0, qual = 'meals') => {
  const resApi = {
    meals: [
      {
        strMeal: "Callaloo Jamaican Style",
        idMeal: "52939",
        strMealThumb: "https://www.themealdb.com/images/media/meals/ussyxw1515364536.jpg",
      },
      {
        strMeal: "Chocolate Avocado Mousse",
        idMeal: "52853",
        strMealThumb: "https://www.themealdb.com/images/media/meals/uttuxy1511382180.jpg",
      },
      {
        strMeal: "Banana Pancakes",
        idMeal: "52855",
        strMealThumb: "https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg",
      },
    ],
    drinks: [
      {
        strDrink: "Vodka Fizz",
        idDrink: "16967",
        strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/xwxyux1441254243.jpg",
      },
      {
        strDrink: "Long vodka",
        idDrink: "13196",
        strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/9179i01503565212.jpg",
      },
    ]
}
  const Mock = {
    meals: quantidade === 0 ? false : resApi[qual].slice(0, quantidade)
  }
  global.fetch = () => {
    return Promise.resolve({
      json: () =>
        Promise.resolve(
          Mock
      ),
    });
  };
};
export default fetchMock
