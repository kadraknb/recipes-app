import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <div className="meals">
      <Route exact path="/" component={ Login } />
    </div>
  );
}

export default App;
