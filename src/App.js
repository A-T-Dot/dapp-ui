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

import './App.css';

chain.connect()

chain.getBalance(
  '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  function (balance) {
    console.log(balance);
  }
);

// timeout for fix: @polkadot/wasm-crypto has not been initialized
setTimeout(async () => {
  const keys = chain.getKeysFromUri('//Alice')
  console.log(keys)

  // tcx信息
  chain.getTcxDetails(keys)

  // // 显示token余额
  // chain.getTokenBalance(keys)

  // 1.创建ge
  const geCreateRes = await chain.geCreate(keys)
  console.log("---geCreate return:", geCreateRes)

  // 2.创建node
  // 涉及invest / stake
  const nodeCreateRes = await chain.nodeCreate(keys, 'content_hash', 'node_type', '')
  console.log("---nodeCreate return:", nodeCreateRes)
  
  // 3.创建tcx
  const tcxCreateRes = await chain.tcxCreate(keys, 'ge_id', 'tcx_type')
  console.log("---tcxCreate return:", tcxCreateRes)
  
  // 4.propose  
  const proposeRes = await chain.tcxPropose(keys, '1', '2', 10000000000, 'action_id')
  console.log("---propose return:", proposeRes)

  // 5.challenge
  const challengeRes = await chain.tcxChallenge(keys, 'tcx_id', 'node_id', 10000000000)
  console.log("---challenge return:", challengeRes)

  // 6.resolve
  const resolveRes = await chain.tcxResolve(keys, 'tcx_id', 'node_id')
  console.log("---resolve return:", resolveRes)

  // 7.vote
  const voteRes = await chain.tcxVote(keys, 'challenge_id', 10000000000, false)
  console.log("---vote return:", voteRes)

  // 8.claim
  const claimRes = await chain.tcxClaim(keys, 'challenge_id')
  console.log("---claim return:", claimRes)

}, 2000)


function App () {
  const [wsData, setWsData] = useState({ data: '' });

  const handleData = (data) => {
    let result = JSON.parse(data);
    setWsData(result);
  }

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
      <div className="footer">WS Connect: {wsData.data || 'castor'}</div>
    </div>
  );
}

export default App;
