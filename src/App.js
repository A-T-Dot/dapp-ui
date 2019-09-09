import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { T1 } from './components/T1';
import { T2 } from './components/T2';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/t1" component={T1} />
        <Route exact path="/t2" component={T2} />
      </Switch>
    </div>
  );
}

export default App;
