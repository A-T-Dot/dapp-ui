import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { MyContent } from './components/MyContent';
import { Governance } from './components/Governance';
import { GovernanceDetail } from './components/Governance/detail';
import { TCXDetail } from './components/Governance/tcxDetail';
import { NodeExplorer } from './components/NodeExplorer';
import { Discover } from "./components/Discover";
import { Whiteboard } from "./components/Whiteboard";

import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/content" component={MyContent} />
        <Route exact path="/governance" component={Governance} />
        <Route exact path="/ge/:geid" component={GovernanceDetail} />
        <Route exact path="/ge/:geid/tcx/:tcxid" component={TCXDetail} />
        <Route exact path="/node/:nodeid" component={NodeExplorer} />
        <Route exact path="/discover" component={Discover} />
        <Route exact path="/whiteboard" component={Whiteboard} />
      </Switch>
    </div>
  );
}

export default App;
