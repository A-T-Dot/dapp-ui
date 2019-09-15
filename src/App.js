import React, { Fragment, useState } from 'react';
import Websocket from 'react-websocket';
import { Route, Switch } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { MyContent } from './components/MyContent';
import { Governance } from './components/Governance';
import { GovernanceDetail } from './components/Governance/detail';
import { TCXDetail } from './components/Governance/tcxDetail';
import { NodeExplorer } from './components/NodeExplorer';
import { Discover } from "./components/Discover";
import { Whiteboard } from "./components/Whiteboard";
import chain from "./api/chain";
import api from "./api";

import './App.css';

function App () {
  const [wsData, setWsData] = useState({ data: '' });

  const handleData = (data) => {
    let result = JSON.parse(data);
    setWsData(result);
  }

  const CASTOR_PROVIDER = 'ws://127.0.0.1:9944';
  // const CASTOR_PROVIDER = 'wss://polkadot:9944';
  chain.init(CASTOR_PROVIDER, run);
  function run (api) {
    console.log('CASTOR Start.', api);
    chain.getBalance(
      '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      function (balance) {
        console.log(balance);
      }
    );
  }

  api.get('/call').then(res => {
    console.log(res)
  })

  return (
    <div className="App">
      <Switch>
        <Route exact path="/whiteboard" component={Whiteboard} />
        <Fragment>
          <NavBar />
          <Route exact path="/content" component={MyContent} />
          <Route exact path="/governance" component={Governance} />
          <Route exact path="/ge/:geid" component={GovernanceDetail} />
          <Route exact path="/ge/:geid/tcx/:tcxid" component={TCXDetail} />
          <Route exact path="/node/:nodeid" component={NodeExplorer} />
          <Route exact path="/discover" component={Discover} />
        </Fragment>
      </Switch>
      <Websocket url='ws://localhost:7000/ws'
        onMessage={handleData} />
      WS Data: {wsData.data}
    </div>
  );
}

export default App;
