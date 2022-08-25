import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeInProgress from './components/Progresso';
import {
  Login,
  foods,
  Profile,
  Drinks,
  DoneRecipes,
  FavoriteRecipes,
  RecipeDetails,
} from './pages';


function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route
        exact
        path="/foods/:id"
        render={ (props) => <RecipeDetails { ...props } /> }
      />
      <Route exact path="/foods" component={ foods } />
      <Route
        path="/drinks/:id"
        render={ (props) => <RecipeDetails { ...props } /> }
      />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/test" component={ RecipeInProgress } />
      <Route exact path="/profile" component={ Profile } />
    </Switch>
  );
}

// <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
// const { match: { params: { id } } } = this.props;

export default App;
