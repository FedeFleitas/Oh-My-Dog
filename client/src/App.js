import React from 'react'
import { Route, Switch} from 'react-router-dom'
import './App.css';

import LandingPage from './components/LandingPage/LandingPage.js'
import CreateDog from './components/DogCreator/CreateDog'
import {Dogs} from './components/Home/Dogs.jsx'
import DogDetails from './components/Home/DogDetails'
import Nav from './components/NavBar/Nav.js'


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route path='/dogs' render={() => <Nav onSearch={"onSearch"} />} />
      <Route exact path="/dogs" component={Dogs} />

    <Switch>
      <Route exact path="/dogs/create" component={CreateDog} />
      <Route exact path="/dogs/:id" component={DogDetails} />
    </Switch>
    </div>
  );
}

export default App;
