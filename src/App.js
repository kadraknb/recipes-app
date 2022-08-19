import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Login, foods, Profile, Drinks, DoneRecipes, FavoriteRecipes } from './pages';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/profile" component={ Profile } />

    </Switch>
  );
}

export default App;
