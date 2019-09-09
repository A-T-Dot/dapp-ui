import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { MyContent } from './components/MyContent';
import { Governance } from './components/Governance';
import { Discover } from "./components/Discover";

import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/content" component={MyContent} />
        <Route exact path="/governance" component={Governance} />
        <Route exact path="/discover" component={Discover} />
      </Switch>
    </div>
  );
}

export default App;
